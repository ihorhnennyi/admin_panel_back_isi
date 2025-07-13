import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	name!: string

	@Prop({ required: true, unique: true })
	email!: string

	@Prop({ required: true })
	password!: string

	@Prop({ enum: ['admin', 'user'], default: 'user' })
	role!: 'admin' | 'user'

	@Prop({ default: null })
	refreshToken?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
