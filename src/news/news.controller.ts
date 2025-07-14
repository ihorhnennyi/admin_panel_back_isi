import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { NewsService } from './news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Создание новости (только для админа)' })
	@ApiResponse({ status: 201, description: 'Новость успешно создана' })
	@ApiResponse({ status: 403, description: 'Нет прав на создание новости' })
	create(@Body() dto: CreateNewsDto) {}

	@Put(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Обновить новость по ID (только admin)' })
	@ApiResponse({ status: 200, description: 'Новость успешно обновлена' })
	@ApiResponse({ status: 403, description: 'Нет доступа' })
	@ApiResponse({ status: 400, description: 'Некорректные данные' })
	update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
		return this.newsService.update(id, dto)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Удаление новости по ID (только для админа)' })
	@ApiResponse({ status: 200, description: 'Новость успешно удалена' })
	@ApiResponse({ status: 403, description: 'Нет прав на удаление' })
	delete(@Param('id') id: string) {
		return this.newsService.delete(id)
	}

	@Get()
	@ApiOperation({ summary: 'Получение списка всех новостей' })
	@ApiResponse({ status: 200, description: 'Список всех новостей' })
	findAll() {
		return this.newsService.findAll()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Получение новости по ID' })
	@ApiResponse({ status: 200, description: 'Информация по новости' })
	@ApiResponse({ status: 404, description: 'Новость не найдена' })
	findById(@Param('id') id: string) {
		return this.newsService.findById(id)
	}
}
