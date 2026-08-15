import { IsString, IsNumber, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAutorDto{
    @IsString() @IsNotEmpty() 
    @ApiProperty({
        example: 'Pedro',
        description: 'Nome do autor do livro'
    })
    nome: string;
    
    @IsString() @IsNotEmpty() 
    @ApiProperty({
        example: 'Brasileiro',
        description: 'Nacionalidade do autor do livro'
    })
    nacionalidade: string;
    @IsNumber() @IsPositive() @IsNotEmpty() 
    @ApiProperty({
        example: 2008,
        description: 'ano de nascimento do autor do livro'
    })
    ano_nascimento: number;
}