import {Post, Body, Controller, Req, UseInterceptors, UseGuards, UploadedFile, BadRequestException, Injectable, Get, Query, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { updatePostDto } from './dto/update-post.dto';
import { Post as postEntity } from './entities/post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private postService:PostService){}

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('thumbnail',
    {storage:storageConfig("post"),
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
    create(@Req()req:any,@Body()createPostDto:CreatePostDto,@UploadedFile()file:Express.Multer.File){
        console.log(req["user_data"]);
        console.log(createPostDto);
        console.log(file);
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException("file is required")
        }
        return this.postService.create(req["user_data"].id,{...createPostDto,thumbnail:file.destination+"/"+file.filename})
    }



    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query:FilterPostDto):Promise<any>{
        return this.postService.findAll(query)
    }



    @UseGuards(AuthGuard)
    @Get(":id")
    findDetail(@Param("id")id:string):Promise<postEntity>{
        return this.postService.findDetail(Number(id))
    }


    @UseGuards(AuthGuard)
    @Put(":id")
    @UseInterceptors(FileInterceptor('thumbnail',
    {storage:storageConfig("post"),
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
    update(@Param('id')id:string,@Req() req :any,@Body()updatePostDto:updatePostDto,@UploadedFile()file:Express.Multer.File){
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }

        if(file){
            updatePostDto.thumbnail=file.destination+"/"+file.filename;

        }
        return this.postService.update(Number(id),updatePostDto)


    }



    @UseGuards(AuthGuard)
    @Delete(":id")
    delete(@Param("id")id:string){
        return this.postService.delete(Number(id))
    }



}
