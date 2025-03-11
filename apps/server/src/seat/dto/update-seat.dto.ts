import { PartialType } from "@nestjs/mapped-types";
import { CreateSeatDto } from "./create-seat.dto";

export class UpdateSeatDto extends PartialType(CreateSeatDto) {}
