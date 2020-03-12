import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class SellerGuard implements CanActivate{

    constructor(){}


    canActivate(context: ExecutionContext){

        const req  = context.switchToHttp().getRequest();
        
        const user = req.user;

        if(user && user.seller) {
            return true;
        }

        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        
    }
}