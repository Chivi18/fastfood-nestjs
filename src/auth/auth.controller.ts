import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { ResgisterUserDto } from './dto/resgister-user-dto';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService
    ){}

    @Post('resgister')
     resgister(@Body() resgisterUserDto:ResgisterUserDto):Promise<User>{
        console.log('resgister api');
        return this.authService.resgister(resgisterUserDto);
    }

    @Post('login')
    @ApiResponse({status:201,description:"login successfully"})
    @ApiResponse({status:401,description:"login fail"})
    @UsePipes(ValidationPipe)
    login(@Body()loginUserDto:LoginUserDto):Promise<any>{
        console.log("login api");
        return this.authService.login(loginUserDto);
    }

    @Post("refresh-token")
    refreshToken(@Body(){refresh_token}):Promise<any>{
        console.log("refresh_token");
        console.log({refresh_token});

        return this.authService.refreshtoken(refresh_token)
    }
}
