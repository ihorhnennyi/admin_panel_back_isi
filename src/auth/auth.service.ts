import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserDocument } from '../users/schemas/user.schema'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async register(dto: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(dto.password, 10)

		const user = await this.usersService.create({
			...dto,
			password: hashedPassword,
		})

		return this.generateTokens(user)
	}

	async login(dto: LoginUserDto) {
		const user = await this.usersService.findByEmail(dto.email)

		if (!user || !(await bcrypt.compare(dto.password, user.password))) {
			throw new UnauthorizedException('Неверный email или пароль')
		}

		return this.generateTokens(user)
	}

	private async generateTokens(user: UserDocument) {
		const payload = {
			sub: user._id!.toString(),
			role: user.role,
		}

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
		})

		return { accessToken, refreshToken }
	}
}
