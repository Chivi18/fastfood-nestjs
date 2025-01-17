import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { updatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Post) private postRepository:Repository<Post>
    ){}

    async create(userId:number,createPostDto:CreatePostDto):Promise<Post>{
        const user=await this.userRepository.findOneBy({id:userId});
        try {
            const res = await this.postRepository.save({
                ...createPostDto,user
            })

            return await this.postRepository.findOneBy({id:res.id});
        } catch (error) {
            throw new HttpException("can not create post ",HttpStatus.BAD_REQUEST)
        }
    }

    async findAll(query:FilterPostDto):Promise<any>{
        const items_per_page=Number(query.items_per_page)||10
        const page=Number(query.page)||1
        const search=query.search|| "";
        const skip=(page-1)*items_per_page;
        const [res,total]=await this.postRepository.findAndCount({
            where:[
                {title:Like("%"+search+"%")},
                {description:Like("%"+search+"%")}
            ],
            order:{created_at:"DESC"},
            take:items_per_page,
            skip:skip,
            relations:{
                user:true
            },
            select:{
                user:{
                    id:true,
                    first_Name:true,
                    last_Name:true,
                    email:true,
                    avatar:true
                }
            }
        })

        const lastPage =Math.ceil(total/items_per_page);
        const nextPage=page+1>lastPage?null:page+1;
        const prevPage=page-1<1?null:page-1;
        return {
            data:res,
            total,
            currenPage:page,
            nextPage,
            prevPage,
            lastPage
        }
    }

    async findDetail(id:number):Promise<Post>{
        return await this.postRepository.findOne({
            where:{id},
            relations:["user"],
            select:{
                user:{
                    id:true,
                    first_Name:true,
                    last_Name:true,
                    email:true,
                    avatar:true,
                }
            }
        })
    }

    async update(id:number,updatePostDto:updatePostDto):Promise<UpdateResult>{
        return this.postRepository.update(id,updatePostDto)
    }

    async delete(id:number):Promise<DeleteResult>{
        return this.postRepository.delete(id);
    }
}
