import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'

class NewsBlockDto {
	@IsString()
	type!: 'text' | 'image'

	@IsString()
	content!: string
}

export class UpdateNewsDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => NewsBlockDto)
	blocks?: NewsBlockDto[]
}
