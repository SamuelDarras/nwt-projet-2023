import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"


export type SerieDocument = Serie & Document

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false,
})
export class Serie {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    })
    _id: any

    @Prop({
        type: String,
        required: true,
        minlength: 0,
        trim: true,
    })
    title: string

    @Prop({
        type: String,
        required: true,
        minlength: 0,
        trim: true,
    })
    description: string

    @Prop({
        type: String,
        minlength: 0,
        trim: true,
    })
    cover: string

    @Prop({
        type: Date,
        required: true,
    })
    releaseDate: Date

    @Prop({
        type: Number,
        required: true,
    })
    seasonsCount: number

    @Prop({
        type: Boolean,
        required: true
    })
    seen: boolean
}

export const SerieSchema = SchemaFactory.createForClass(Serie)
