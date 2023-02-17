import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { configureSwaggerDocs } from '../libs/configure-swagger-docs.helper'
import { json, urlencoded } from 'express'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  })

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
  const port = configService.get<number>('NODE_API_PORT_PLACE') || 3001

  console.log('port', port)

  await app.startAllMicroservices()

  await app.listen(port)
  Logger.log(`Url for OpenApi is listening port: ${port}, env: ${process.env.NODE_ENV}`)
}
bootstrap()
