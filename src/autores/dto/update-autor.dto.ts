import { IsString, IsNumber, IsOptional, IsPositive } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class updateAutorDto{
    @IsString() @IsOptional() 
    @ApiPropertyOptional({
            example: 'Pedro',
            description: 'Nome do autor do livro'
        })
    nome?: string;
    @IsString() @IsOptional() 
    @ApiPropertyOptional({
        example: 'Brasileiro',
        description: 'Nacionalidade do autor do livro'
    })
    nacionalidade?: string;
    @IsNumber() @IsPositive() @IsOptional()
    @ApiPropertyOptional({
        example: 2008,
        description: 'ano de nascimento do autor do livro'
    })
    ano_nascimento?: number;
}