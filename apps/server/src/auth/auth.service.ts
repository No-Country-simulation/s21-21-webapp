import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {
    // Initialize the Google OAuth client
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }

  async register(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "User", // Provide default value to avoid undefined
        role: Role.USER,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      // Don't include Role as it doesn't exist in UserInclude type
    });

    if (user && (await bcrypt.compare(password, user.password || ""))) {
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Use lowercase 'role' instead of 'Role'
        },
        access_token: this.jwtService.sign({ email, sub: user.id }),
      };
    }
    throw new Error("Invalid credentials");
  }

  async validateOAuthLogin(user) {
    let userInDb = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userInDb) {
      // Create user if doesn't exist
      userInDb = await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.firstName || "User", // Provide default value
          role: Role.USER,
        },
      });
    }

    // Generate and return JWT
    const payload = { email: user.email, sub: userInDb.id };
    return {
      user: {
        id: userInDb.id,
        email: userInDb.email,
        name: userInDb.name,
        role: userInDb.role, // Use lowercase 'role'
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new Error("Invalid Google token");
      }

      const email = payload.email;
      const name = payload.name || "Google User"; // Ensure name has a fallback value

      // Find user or create if doesn't exist
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: email,
            name: name,
            role: Role.USER,
          },
        });
      }

      const jwtToken = this.jwtService.sign({
        email: user.email,
        sub: user.id,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Use lowercase 'role'
        },
        access_token: jwtToken,
      };
    } catch (error) {
      console.error("Google authentication error:", error);
      throw new Error("Failed to authenticate with Google");
    }
  }

  // Method to handle OAuth callback
  async handleGoogleCallback(req) {
    if (!req.user) {
      throw new Error("No user from Google");
    }

    return req.user; // Return user from OAuth strategy
  }
}
