import { PartialType } from "@nestjs/mapped-types";
import { CreateScreeningDto } from "./create-screening.dto";
export class UpdateScreeningDto extends PartialType(CreateScreeningDto) {}
