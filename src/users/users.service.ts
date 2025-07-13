import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from '../auth/dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>
	) {}

	async create(dto: CreateUserDto): Promise<UserDocument> {
		return this.userModel.create(dto)
	}

	async findByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email }).exec()
	}

	async findById(id: string): Promise<UserDocument | null> {
		return this.userModel.findById(id).exec() as Promise<UserDocument | null>
	}

	async updateRefreshToken(userId: string, refreshToken: string) {
		return this.userModel.findByIdAndUpdate(userId, { refreshToken })
	}

	async clearRefreshToken(userId: string) {
		return this.userModel.findByIdAndUpdate(userId, { refreshToken: null })
	}
}
