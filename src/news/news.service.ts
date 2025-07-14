import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateNewsDto } from './dto/create-news.dto'
import { News, NewsDocument } from './schemas/news.schema'

@Injectable()
export class NewsService {
	constructor(
		@InjectModel(News.name)
		private readonly newsModel: Model<NewsDocument>
	) {}

	async create(dto: CreateNewsDto): Promise<News> {
		return this.newsModel.create(dto)
	}

	async update(id: string, dto: Partial<News>): Promise<News> {
		const news = await this.newsModel.findByIdAndUpdate(id, dto, { new: true })

		if (!news) {
			throw new NotFoundException('Новость не найдена')
		}

		return news
	}

	async delete(id: string): Promise<{ message: string }> {
		const result = await this.newsModel.findByIdAndDelete(id)
		if (!result) throw new NotFoundException('Новость не найдена')
		return { message: 'Новость удалена' }
	}

	async findAll(): Promise<News[]> {
		return this.newsModel.find().sort({ createdAt: -1 }).exec()
	}

	async findById(id: string): Promise<News> {
		const news = await this.newsModel.findById(id)
		if (!news) throw new NotFoundException('Новость не найдена')
		return news
	}
}
