import { ApiProperty } from "@nestjs/swagger"
import { Exclude, Expose, Type } from "class-transformer"

@Exclude()
export class SerieEntity {
    @ApiProperty({
        name: "id",
        description: "Unique identifier in the database"
    })
    @Type(() => Number)
    @Expose()
    id: number

    @ApiProperty({
        name: "title",
        description: "The title of the serie"
    })
    @Type(() => String)
    @Expose()
    title: string

    @ApiProperty({
        name: "description",
        description: "The description of the serie"
    })
    @Type(() => String)
    @Expose()
    description: string

    @ApiProperty({
        name: "cover",
        description: "The name of the file of the serie's cover"
    })
    @Type(() => String)
    @Expose()
    cover: string

    constructor(partial: Partial<SerieEntity>) {
        this.id = partial.id
        this.title = partial.title
        this.description = partial.description
        this.cover = partial.cover
    }
}
