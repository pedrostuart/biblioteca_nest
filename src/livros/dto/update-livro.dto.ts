import { IsBoolean, isBoolean, IsInt, IsOptional, IsNotEmpty, isString, IsString, Max, min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";//diferente do create aqui tem quer ser "ApiPropertyOptional", porque é opicional, o * vermleho mostrado na documentação mostra quando é obrigatorio ou não


//no update utilizamos o IsOptional ao inves do isNotEmpty pois nao é obrigatorio a pessoa atualizar aquele campo

//A "?" depois das variaveis significa que é um campo que pode ser enviado informações ou não
export class UpdateLivroDto{
    @IsString() @IsOptional()// preenche se quiser
    @ApiPropertyOptional({
        example: 'Dom Casmurro 2',
        description: 'Novo titulo do livro'
    })
    titulo?: string;

    @IsString()
    @IsOptional()

    @ApiPropertyOptional({
        example: 'Machados de Assis 2',
        description: 'Novo nome do Autor do livro'
    })

    autor?: string;

    @IsInt()/*caso eu não pudesse alterar o ano na minha regra de negocio, ru não colocario o ano no update-livro*/ @IsOptional() @Max(2100, {message: "O ano deve ser menor ou igual a 2100"})

    @ApiPropertyOptional({
        example: 1800, //numero sem 
        description: 'Novo ano da publicação do livro'
    })
    ano?: number;

    @IsBoolean() @IsOptional()
    @ApiPropertyOptional({
        example: false,
        description: 'Se o livro esta diponivel sim ou não(boolean)'
    })
    disponivel?: boolean;
}