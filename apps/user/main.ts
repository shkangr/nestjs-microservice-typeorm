import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { configureSwaggerDocs } from './helpers/configure-swagger-docs.helper'
import { json, urlencoded } from 'express'
// import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //     transport: Transport.NATS,
  //     options: {
  //         servers: ['nats://localhost:4222'],
  //     },
  // });
  const configService = app.get<ConfigService>(ConfigService)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  configureSwaggerDocs(app, configService)

  app.enableCors({
    origin: configService.get<string>('ENDPOINT_CORS'),
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  })
  const port = configService.get<number>('NODE_API_PORT') || 3000
  await app.listen(port)
  Logger.log(`Url for OpenApi is listening port: ${process.env.NODE_API_PORT}, env: ${process.env.NODE_ENV}`)
}
bootstrap()
