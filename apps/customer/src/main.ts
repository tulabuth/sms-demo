import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';
import { SentryLogger } from '@app/common/sentry/sentry.logger';
import { ValidationPipe } from '@nestjs/common';
import { singleMessageClassValidator } from '@app/common/core/errors/error';
import { SentryInterceptor } from '@app/common/sentry/sentry.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule,{
    logger: new SentryLogger(),
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: singleMessageClassValidator,
    })
  );
  app.useGlobalInterceptors(new SentryInterceptor());
  const config = new DocumentBuilder()
  .setTitle('Customer API')
  .setDescription('The SMS1CLICK API description')
  .setVersion('1.0')
  .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'Token'})
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document,{
    swaggerOptions: {
      operationsSorter: 'alpha'
    }
  })
  await app.startAllMicroservices();
  await app.listen(3004);
}
bootstrap();
