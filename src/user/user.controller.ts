import { Body, Controller, Get, Param, Post, Put,Delete, UseGuards, Query, UploadedFile, Req, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import {  UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags("User")
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query:FilterUserDto):Promise<any>{
        // return this.userService.findAll();
        // console.log("hello");
        return this.userService.findAll(query)
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id:string):Promise<User>{
        return this.userService.findOne(Number(id))
    }

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body()createUserDto:CreateUserDto):Promise<User>{
        return this.userService.create(createUserDto)
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    updateUser(@Param("id")id:string,@Body()updateUserDto:UpdateUserDto){
        return this.userService.update(Number(id),updateUserDto)
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(Number(id)) 
    }


    @Post("upload-avatar")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("avatar",{
        storage:storageConfig('avatar'),
        fileFilter:(req,file,cd)=>{
            const ext =extname(file.originalname)
            const allowedxtArr=[".jpg",".png",".jpeg"]
            if(!allowedxtArr.includes(ext)){
                req.fileValidationError=`wrong extension type. accepted file ext are ${allowedxtArr.toString()}`,cd(null,false)
            }else{
                const fileSize=parseInt(req.headers['content-length'])
                if(fileSize>1024*1024*5){
                    req.fileValidationError="file size is to large. accepted file size is less than 5 mb",cd(null,false)
                }else{
                    cd(null,true)
                }
            }
        }
    }))
    uploadAvatar(@Req() req:any, @UploadedFile() file:Express.Multer.File){
        console.log("upload avatar");
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException("file is required")
        }
        return this.userService.updateAvatar(req.user_data.id,file.destination+"/"+file.filename)
    }
}
