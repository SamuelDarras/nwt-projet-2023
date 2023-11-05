import { Exclude } from "class-transformer"

@Exclude()
export class SerieEntity {
    id: number
    title: string
    description: string

    constructor(partial: Partial<SerieEntity>) {
        this.id = partial.id
        this.title = partial.title
        this.description = partial.description
    }
}
