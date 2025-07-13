import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
	@ApiProperty({
		example: 'igor@example.com',
		description: 'Email пользователя',
	})
	@IsEmail()
	email!: string

	@ApiProperty({ example: 'securePass123', description: 'Пароль пользователя' })
	@IsNotEmpty()
	password!: string
}
