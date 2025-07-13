import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('Institute Admin API')
		.setDescription('Документация для админки института')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/docs', app, document)

	const port = process.env.PORT || 5000
	await app.listen(port)

	console.log(`🚀 Server running on: http://localhost:${port}`)
	console.log(`📘 Swagger docs: http://localhost:${port}/api/docs`)
}
bootstrap()
