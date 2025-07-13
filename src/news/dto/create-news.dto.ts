import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsString,
	ValidateNested,
} from 'class-validator'

export class NewsBlockDto {
	@ApiProperty({ enum: ['text', 'image'], example: 'text' })
	@IsEnum(['text', 'image'])
	type!: 'text' | 'image'

	@ApiProperty({
		description: 'Содержимое текста или ссылка на изображение',
		example: 'https://example.com/image.jpg',
	})
	@IsString()
	@IsNotEmpty()
	content!: string
}

export class CreateNewsDto {
	@ApiProperty({ example: 'Открытие нового факультета' })
	@IsString()
	@IsNotEmpty()
	title!: string

	@ApiProperty({
		type: [NewsBlockDto],
		example: [
			{
				type: 'image',
				content: 'https://example.com/images/faculty.jpg',
			},
			{
				type: 'text',
				content:
					'Мы рады сообщить об открытии нового факультета информационных технологий.',
			},
		],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => NewsBlockDto)
	blocks!: NewsBlockDto[]
}
