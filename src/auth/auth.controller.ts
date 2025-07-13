import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({
		status: 201,
		description: 'Пользователь успешно зарегистрирован',
	})
	@Post('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Логин пользователя' })
	@ApiResponse({ status: 200, description: 'Успешная авторизация' })
	@Post('login')
	login(@Body() dto: LoginUserDto) {
		return this.authService.login(dto)
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Получить текущего пользователя' })
	@ApiResponse({ status: 200, description: 'Информация о пользователе' })
	@Get('me')
	getMe(@CurrentUser() user: { userId: string; role: string }) {
		return user
	}

	@ApiOperation({ summary: 'Обновить access и refresh токены' })
	@ApiResponse({ status: 200, description: 'Токены обновлены' })
	@Post('refresh')
	refresh(@Body() dto: RefreshTokenDto) {
		return this.authService.refreshTokens(dto.refreshToken)
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Выход пользователя (удаление refresh токена)' })
	@ApiResponse({ status: 200, description: 'Выход выполнен успешно' })
	@Post('logout')
	logout(@CurrentUser() user: { userId: string }) {
		return this.authService.logout(user.userId)
	}
}
