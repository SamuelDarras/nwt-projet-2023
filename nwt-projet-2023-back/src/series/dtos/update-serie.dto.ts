import { IsNotEmpty, IsString, Length } from "class-validator"

export class UpdateSerieDto {
    @IsString()
    @IsNotEmpty()
    @Length(0, 32)
    title: string

    @IsString()
    @IsNotEmpty()
    @Length(0, 256)
    description: string
}
