import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ResgisterUserDto } from './dto/resgister-user-dto';
import * as bcrypt from "bcrypt"; 
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor (@InjectRepository(User) private userRepository:Repository<User>, 
    private jwtservice:JwtService,
    private configservice:ConfigService, 
    ){}

    async resgister(resgisterUserDto:ResgisterUserDto):Promise<User>{
        const hashPassword=await this.hashPassword(resgisterUserDto.password);

        return await this.userRepository.save({...resgisterUserDto,refresh_token:"refresh_token",password:hashPassword});
    }

    async login(loginUserDto:LoginUserDto):Promise<any>{
        const user=await this.userRepository.findOne(
            {where:{email:loginUserDto.email}}
        )
        if(!user){
            throw new HttpException("email is not exist",HttpStatus.UNAUTHORIZED)
        }
        const checkPassword=bcrypt.compareSync(loginUserDto.password,user.password)
        if(!checkPassword){
            throw new HttpException("password is not conrrect",HttpStatus.UNAUTHORIZED)
        }

        const payload={id:user.id,email:user.email};
        return this.generatetoke(payload);
    }
    
    async refreshtoken(refresh_token:string):Promise<any>{
        try {
            
            const verify =await this.jwtservice.verifyAsync(refresh_token,{
                secret:this.configservice.get<string>("SECRET")
            })
            
            const checkExistToken =await this.userRepository.findOneBy({email:verify.email,refresh_token})
            
            if(checkExistToken){
                return this.generatetoke({id:verify.id,email:verify.email})
            }else{
                throw new HttpException("refresh token is not avalid",HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
                
                throw new HttpException("refresh token is not avalid",HttpStatus.BAD_REQUEST)

        }
    }

    private async generatetoke(payload:{id:number,email:string}){
        const access_token =await this.jwtservice.signAsync(payload)
        const refresh_token=await this.jwtservice.signAsync(payload,{
            secret:this.configservice.get<string>("SECRET"),
            expiresIn:this.configservice.get<string>("EXP_IN_REFRESH_TOKEN")  
        })
        await this.userRepository.update({email:payload.email},{refresh_token:refresh_token})
        return{access_token,refresh_token}
    }

    private async hashPassword(password:string ):Promise<string>{
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        const hash=await bcrypt.hash(password,salt)
        return hash
    }

}
