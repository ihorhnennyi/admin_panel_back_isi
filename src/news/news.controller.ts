import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateNewsDto } from './dto/create-news.dto'
import { NewsService } from './news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Post()
	@ApiOperation({ summary: 'Создание новости' })
	@ApiResponse({ status: 201, description: 'Новость создана' })
	create(@Body() dto: CreateNewsDto) {
		return this.newsService.create(dto)
	}

	@Get()
	@ApiOperation({ summary: 'Список всех новостей' })
	findAll() {
		return this.newsService.findAll()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Получить новость по ID' })
	findById(@Param('id') id: string) {
		return this.newsService.findById(id)
	}
}
