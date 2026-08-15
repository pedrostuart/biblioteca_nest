import { IsBoolean, isBoolean, IsInt, IsNotEmpty, isString, IsString, Max, min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";//com ele eu consigo definir um exemplo do que deve ser inserido em cada DTO e uma descrição que explica 
export class CreateLivroDto{
    @IsString() @IsNotEmpty()// não pode ser vazio

    @ApiProperty({
        example: 'Dom Casmurro',
        description: 'Titulo do livro'
    })
    titulo: string;

    @IsString() @IsNotEmpty()

    @ApiProperty({
        example: 'Machados de Assis',
        description: 'Nome do Autor do livro'
    })
    autor: string;

    @IsNotEmpty() @IsInt() @Max(2100, {message: "O ano deve ser menor ou igual a 2100"})
    @ApiProperty({
        example: 1800, //numero sem 
        description: 'Ano da publicação do livro'
    })
    ano: number;

    @IsNotEmpty() @IsBoolean() 
    @ApiProperty({
        example: true,
        description: 'Se o livro esta diponivel sim ou não(boolean)'
    })
    disponivel: boolean;
}