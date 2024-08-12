import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn }from "typeorm"
@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    description:string;
    @Column()
    thumbnail:string;
    @Column()
    status:number;
    @CreateDateColumn()
    created_at:Date;
    @CreateDateColumn()
    updated_at:Date
    @ManyToOne(()=>User,(user)=>user.posts)
    user:User
}