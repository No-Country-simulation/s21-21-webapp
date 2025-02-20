import { PartialType } from "@nestjs/mapped-types";
import { CreateHallDto } from "./create-hall.dto";
export class UpdateHallDto extends PartialType(CreateHallDto) {}
