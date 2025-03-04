import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post("google-login")
  async googleLogin(@Body("token") token: string) {
    try {
      const result = await this.authService.googleLogin(token);
      return {
        message: "Google login successful",
        user: result.user,
        access_token: result.access_token,
      };
    } catch (error) {
      throw new Error(`Google login failed: ${error.message}`);
    }
  }

  // OAuth flow route
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // This route initiates the Google OAuth flow
    // The actual logic is handled by the Google strategy
  }

  // OAuth callback route
  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const { user, access_token } =
        await this.authService.handleGoogleCallback(req);

      // Create the redirect URL with token for the frontend
      const redirectUrl = `${process.env.FRONTEND_URL}/google-callback?token=${access_token}`;

      return res.redirect(redirectUrl);
    } catch (error) {
      console.error("Google callback error:", error);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Unauthorized",
        error: error.message,
      });
    }
  }
}
