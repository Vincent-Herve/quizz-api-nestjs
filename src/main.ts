import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Quizz API')
    .setDescription('Quizz API Explorer')
    .setVersion('1.0')
    .addTag('quizz')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  /* else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  } */

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
