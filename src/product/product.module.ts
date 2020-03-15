import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../models/product.schema';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports : [
        MongooseModule.forFeature([{name: "Product", schema: ProductSchema}]),
        SharedModule,
        AuthModule
    ],
    controllers :[ProductController],
    providers: [ProductService]
})
export class ProductModule {}
