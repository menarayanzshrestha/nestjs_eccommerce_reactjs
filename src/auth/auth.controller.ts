import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { loginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService){}

    @Post('login')
    async login(@Body() userDTO : loginDTO) {
        return await this.userService.findByLogin(userDTO);
    }

    @Post('register')
    async register(@Body() userDTO : RegisterDTO) {
    
        return await this.userService.create(userDTO);
    }
}
