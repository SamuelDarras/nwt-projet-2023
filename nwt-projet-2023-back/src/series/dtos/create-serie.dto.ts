import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator"

export class CreateSerieDto {
    @ApiProperty({
        name: 'title',
        description: 'The title of the serie',
        example: 'Breaking Bad'
    })
    @IsString()
    @IsNotEmpty()
    @Length(0, 32)
    title: string

    @ApiProperty({
        name: 'description',
        description: 'The description of the serie',
        example: "Walter « Walt » White est professeur de chimie dans une école secondaire. Il vit à Albuquerque, au Nouveau-Mexique, avec son fils handicapé moteur et son épouse enceinte. Le lendemain de son cinquantième anniversaire, on lui diagnostique un cancer du poumon en phase terminale avec une espérance de vie estimée à deux ans. Tout s'effondre pour lui. Il décide alors de mettre en place un laboratoire et un trafic de méthamphétamine pour assurer un avenir financier confortable à sa famille après sa mort, en s'associant à Jesse Pinkman, un de ses anciens élèves devenu petit trafiquant."
    })
    @IsString()
    @IsNotEmpty()
    @Length(0, 1024)
    description: string

    @ApiProperty({
        name: 'releaseDate',
        description: "The date of the release of the serie"
    })
    @Type(() => Date)
    releaseDate: Date

    @ApiProperty({
        name: 'seasonsCount',
        description: 'The number of seasons in this serie'
    })
    @IsNumber()
    @Type(() => Number)
    seasonsCount: number
}
