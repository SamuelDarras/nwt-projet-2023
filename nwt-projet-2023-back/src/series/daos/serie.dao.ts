import { Model } from "mongoose";
import { Serie } from "../schemas/serie.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Observable, from, map } from "rxjs";
import { CreateSerieDto } from "../dtos/create-serie.dto";
import { UpdateSerieDto } from "../dtos/update-serie.dto";

export class SerieDao {
    constructor(@InjectModel(Serie.name) private readonly _serieModel: Model<Serie>) {}

    find(): Observable<Serie[]> {
        return from(this._serieModel.find({}))
            .pipe(map((people) => [].concat(people)))
    }

    findOneById(id: string): Observable<Serie> {
        return from(this._serieModel.findById(id))
    }

    save(serie: CreateSerieDto): Observable<Serie> {
        return from(new this._serieModel(serie).save());
    }

    update(id: string, serie: UpdateSerieDto): Observable<Serie | void> {
        return from(this._serieModel.findByIdAndUpdate(id, serie, { new: true, runValidators: true, }));
    }

    remove(id: string): Observable<Serie | void> {
       return from(this._serieModel.findByIdAndRemove(id));
    }

    updateCover(id: string, filePath: string): Observable<Serie | void> {
        return from(this._serieModel.findByIdAndUpdate(id, { cover: filePath }, { new: true, runValidators: true, }));
    }
}
