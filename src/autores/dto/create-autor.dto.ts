import { IsString, IsNumber, IsNotEmpty, IsPositive } from "class-validator";

export class CreateAutorDto{
    @IsString() @IsNotEmpty() nome: string;
    @IsString() @IsNotEmpty() nacionalidade: string;
    @IsNumber() @IsPositive() ano_nascimento: number;
}