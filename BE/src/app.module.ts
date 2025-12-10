import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configurationConfig from './configs/configuration.config';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RoleModule } from './role/role.module';
import { AdminModule } from './admin/admin.module';
import { dataSourceOptions } from 'db/data-source';
import { OtpModule } from './otp/otp.module';
import { AddressModule } from './address/address.module';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationConfig],
    }),
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    MailModule,
    CategoryModule,
    ProductModule,
    CloudinaryModule,
    RoleModule,
    AdminModule,
    OtpModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
