import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configurationConfig from './configs/configuration.config';
import { User } from './user/user.entity';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { AdminModule } from './admin/admin.module';
import { dataSourceOptions } from 'db/data-source';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
