import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NewsDocument = News & Document

@Schema({ timestamps: true })
export class News {
	@Prop({ required: true })
	title!: string

	@Prop({
		type: [
			{
				type: { type: String, enum: ['text', 'image'], required: true },
				content: { type: String, required: true },
			},
		],
		required: true,
	})
	blocks!: { type: 'text' | 'image'; content: string }[]
}

export const NewsSchema = SchemaFactory.createForClass(News)
