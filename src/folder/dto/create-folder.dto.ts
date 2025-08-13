import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFolderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    parentId?: number
}
