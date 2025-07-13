import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ example: 'Игорь', description: 'Имя пользователя' })
	@IsNotEmpty()
	name!: string

	@ApiProperty({
		example: 'igor@example.com',
		description: 'Email пользователя',
	})
	@IsEmail()
	email!: string

	@ApiProperty({
		example: 'securePass123',
		description: 'Пароль (мин. 6 символов)',
	})
	@MinLength(6)
	password!: string

	@ApiProperty({
		example: 'admin',
		enum: ['admin', 'user'],
		description: 'Роль пользователя',
	})
	@IsEnum(['admin', 'user'])
	role!: 'admin' | 'user'
}
