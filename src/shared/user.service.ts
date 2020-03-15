import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, loginDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    sanitizeUser(user : any){

        console.log(user,"here for sanitaization")
        console.log(user.depopulate('password'),"after");
        
        return user.depopulate('password');
    }

    async create(userDTO: RegisterDTO) {
        const { username } = userDTO;
        const user = await this.userModel.findOne({username});

        if(user) {
            return new HttpException('User already exist', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDTO);

        await createdUser.save();

        return this.sanitizeUser(createdUser);

    }

    async findByLogin(userDTO: loginDTO) {
        const { username, password } = userDTO;
        const user = await this.userModel.findOne({username});

        if(!user){
            return new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
        }

        if(await bcrypt.compare(password, user.password)){
            
            return this.sanitizeUser(user);
        }else {
            return new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
        }

    }

    // async findAll() {
    //     return this.userModel.find();
    // }

    async findByPayload(payload: any) {
        const {username} = payload;
        return await this.userModel.findOne({username});
    }
}
