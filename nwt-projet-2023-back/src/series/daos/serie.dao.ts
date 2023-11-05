import { Model } from "mongoose";
import { Serie } from "../schemas/serie.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Observable, from, map } from "rxjs";

export class SerieDao {
    constructor(@InjectModel(Serie.name) private readonly _serieModel: Model<Serie>) {}

    find(): Observable<Serie[]> {
        return from(this._serieModel.find({}))
            .pipe(map((people) => [].concat(people)))
    }

    findOneById(id: string): Observable<Serie> {
        return from(this._serieModel.findById(id))
    }
}
