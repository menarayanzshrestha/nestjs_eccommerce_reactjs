import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  const options = new DocumentBuilder()
		.setTitle('Nest React Ecommerce')
		.setBasePath('v1')
		.setDescription(
			'The LMS API description built using swagger OpenApi. You can find out more about Swagger at http://swagger.io',
		)
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  Logger.log(`Server running on http://localhost:${process.env.PORT}`, 'Bootstrap');

}
bootstrap();
