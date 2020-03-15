import { Controller, Get, Post, Delete, Param, Body, UseGuards, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, updateProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '../guards/seller.guard';
import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { Product } from '../types/product';

@Controller('product')
export class ProductController {
    constructor(private productService : ProductService){}

    @Get()
    async listAll(){
        return this.productService.listAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(@Body() product: CreateProductDTO, @User() user: UserDocument){
        return this.productService.create(product,user);
    }

    @Get('/mine')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async listMine(@User() user: UserDocument): Promise<Product[]> {
      const { id } = user;
      return await this.productService.findByOwner(id);
    }
  
    @Get('/seller/:id')
    async listBySeller(@Param('id') id: string): Promise<Product[]> {
      return await this.productService.findByOwner(id);
    }

    @Get('id')
    async getById(@Param('id') id:string){
        return this.productService.findOne(id);
    }

    @Put('id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async update(
        @Param('id') id:string, 
        @Body() product: updateProductDTO,
        @User() user: UserDocument
        
    ){

        const {id: userId} = user;
        return this.productService.update(id,product,userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(@Param('id') id:string,@User() user: UserDocument){
        const {id: userId} = user;
        return this.productService.delete(id,userId);
    }
}
