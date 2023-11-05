import { ApiProperty } from "@nestjs/swagger"
import { Exclude, Expose, Type } from "class-transformer"

@Exclude()
export class SerieEntity {
    @ApiProperty({
        name: "id",
        description: "Unique identifier in the database",
    })
    @Expose()
    @Type(() => String)
    id: string

    @ApiProperty({
        name: "title",
        description: "The title of the serie",
    })
    @Expose()
    @Type(() => String)
    title: string

    @ApiProperty({
        name: "description",
        description: "The description of the serie",
    })
    @Expose()
    @Type(() => String)
    description: string

    @ApiProperty({
        name: "cover",
        description: "The path to the cover of the serie",
    })
    @Expose()
    @Type(() => String)
    cover: string

    constructor(partial: Partial<SerieEntity>) {
        this.id = partial.id
        this.title = partial.title
        this.description = partial.description
    }
}
