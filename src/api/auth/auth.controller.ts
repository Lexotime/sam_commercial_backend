import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice :AuthService){}
    @Post()
    async signin(@Body() dto:signinDto){
        return await this.authservice.signin(dto)
    }
}
