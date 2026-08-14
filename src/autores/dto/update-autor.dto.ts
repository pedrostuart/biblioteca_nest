import { IsString, IsNumber, IsOptional, IsPositive } from "class-validator";

export class updateAutorDto{
    @IsString() @IsOptional() nome?: string;
    @IsString() @IsOptional() nacionalidade?: string;
    @IsNumber() @IsPositive() @IsOptional()  ano_nascimento?: number;
}