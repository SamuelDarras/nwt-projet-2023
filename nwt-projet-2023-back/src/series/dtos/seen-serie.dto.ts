import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";

export class SeenSerieDto {
    @ApiProperty({
        name: 'seen',
        description: 'Wether the has been seen or not'
    })
    @IsBoolean()
    @Type(() => Boolean)
    seen: boolean
}
