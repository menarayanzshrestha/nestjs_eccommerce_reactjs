import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../types/product';
import { Model } from 'mongoose';
import { CreateProductDTO, updateProductDTO } from './product.dto';
import { User } from '../types/user';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>){}
  
    async listAll(): Promise<Product[]>{
        return await this.productModel.find().populate('owner');
    }

    async findByOwner(userId:string){
        return this.productModel.find({owner : userId}).populate('owner')
    }

    async findOne(id: string) :Promise<Product>{
        return await this.productModel.findById(id).populate('owner');
    }

    async create(productDto : CreateProductDTO, user : User): Promise<Product> {
        const product = await this.productModel.create({
            ...productDto,
            owner : user
        });

        await product.save();

        return product.populate('owner');
    }

    async update(id: string, productDto: updateProductDTO,userId : string) : Promise<Product>{
        const product = await this.productModel.findById(id);

        if(product.owner.toString() !== userId){
            throw new HttpException('You donot own this product', HttpStatus.UNAUTHORIZED);
        }

        await product.update(productDto);

        return product.populate('owner');
    }

    async delete(id: string, userId:string) : Promise<Product>{
        const product = await this.productModel.findById(id);

        if(product.owner.toString() !== userId){
            throw new HttpException('You donot own this product', HttpStatus.UNAUTHORIZED);
        }

        await product.remove();

        return product.populate('owner');
    }
}
