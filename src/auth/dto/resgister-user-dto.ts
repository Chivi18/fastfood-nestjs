import { ApiProperty } from "@nestjs/swagger";

export class ResgisterUserDto{
    @ApiProperty()
    first_name:string;

    @ApiProperty()
    last_name:string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;

    @ApiProperty()
    status:number;
}