import { IsBoolean, isBoolean, IsInt, IsOptional, IsNotEmpty, isString, IsString, Max, min } from "class-validator";
//no update utilizamos o IsOptional ao inves do isNotEmpty pois nao é obrigatorio a pessoa atualizar aquele campo

//A "?" depois das variaveis significa que é um campo que pode ser enviado informações ou não
export class updateLivroDto{
    @IsString()
    @IsOptional()// preenche se quiser
    titulo?: string;

    @IsString()
    @IsOptional()
    autor?: string;

    @IsInt()//caso eu não pudesse alterar o ano na minha regra de negocio, ru não colocario o ano no update-livro
    @IsOptional()
    @Max(2100, {message: "O ano deve ser menor ou igual a 2100"})
    ano?: number;

    @IsBoolean()
    @IsOptional()
    disponivel?: boolean;
}