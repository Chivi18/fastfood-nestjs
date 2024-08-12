import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";

export class FilterUserDto{
    @ApiProperty({ required: false })
    page:String;
    
    @ApiProperty({ required: false })
    items_per_page:String;
    
    @ApiProperty({ required: false })
    search:string
}