import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { RegisterModule } from './register/register.module'
import { UsersModule } from './users/users.module'
import { ForgotPasswordModule } from './forgot-password/forgot-password.module'
import { ChangePasswordModule } from './change-password/change-password.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { UtilsModule } from './shared/utils/utils.module'
import { Users } from './users/entities/users.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev', '.env.stage', '.env.prod'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('THROTTLE_TTL'),
        limit: config.get<number>('THROTTLE_LIMIT'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE_USER'),
        synchronize: true,
        entities: [Users],
        migrations: ['dist/migrations/**/*.js'],
        subscribers: ['dist/subscriber/**/*.js'],
        cli: {
          migrationsDir: config.get<string>('TYPEORM_MIGRATIONS_DIR'),
          subscribersDir: config.get<string>('TYPEORM_SUBSCRIBERS_DIR'),
        },
      }),
    }),
    LoginModule,
    RegisterModule,
    UsersModule,
    ForgotPasswordModule,
    ChangePasswordModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
