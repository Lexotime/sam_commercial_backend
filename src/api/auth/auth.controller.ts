import { Body, Controller,  HttpException,  HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(private authservice :AuthService){}
    @Post()
    async signin(@Body() dto:signinDto,@Res() res){
        const user= await this.authservice.signin(dto)
        if(!user)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return res.status(HttpStatus.OK).json({
            user
        })
    }
}
