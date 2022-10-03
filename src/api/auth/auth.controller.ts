import { Body, Controller,  HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice :AuthService){}
    @Post()
    async signin(@Body() dto:signinDto,@Res() res){
        const user= await this.authservice.signin(dto)
        return res.status(HttpStatus.OK).json({
            user
        })
    }
}
