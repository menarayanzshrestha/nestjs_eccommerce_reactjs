import { Document } from 'mongoose';
import { User } from './user';
import { Product } from './product';

interface ProductOrder {
    product : Product,
    quantity: Number 
}

export interface Order extends Document{
    owner : User,
    totalPrice: string,
    product : ProductOrder[],
    created : Date
}