export class SerieEntity {
    id: number
    title: string
    description: string

    constructor(partial: Partial<SerieEntity>) {
        Object.assign(this, partial)
    }
}
