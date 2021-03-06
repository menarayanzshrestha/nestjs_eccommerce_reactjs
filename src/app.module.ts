import { Module } from '@nestjs/common';
import {  MongooseModule } from '@nestjs/mongoose'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ 
    MongooseModule.forRoot(`${process.env.MONGO_URL}`), 
    SharedModule, 
    AuthModule,
    ProductModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
