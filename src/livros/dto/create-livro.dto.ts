import { IsBoolean, isBoolean, IsInt, isNotEmpty, IsNotEmpty, isString, IsString, Max, min } from "class-validator";

export class CreateLivroDto{
    @IsString()
    @IsNotEmpty()// não pode ser vazio
    titulo: string;
    @IsString()
    @IsNotEmpty()
    autor: string;
    @IsInt()
    @Max(2100, {message: "O ano deve ser menor ou igual a 2100"})
    ano: number;
    @IsBoolean()
    disponivel: boolean;
}