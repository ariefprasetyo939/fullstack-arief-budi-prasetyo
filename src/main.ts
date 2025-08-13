import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');

  //prismaORM
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Fullstack Test Infokes Indonesia Backend')
    .setDescription('Fullstack Test Infokes Indonesia Backend')
    .setVersion('1.0')
    .addTag('Fullstack Test Infokes Indonesia Backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open-api', app, document);

  //CORS
  const cors = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credential: true,
    allowedHeaders: 'Content-Type, Authorization',    
  }
  app.enableCors(cors);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
