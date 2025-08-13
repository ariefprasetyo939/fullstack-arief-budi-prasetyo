import { PartialType } from '@nestjs/swagger';
import { CreateFolderDto } from './create-folder.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    parentId?: number
}
