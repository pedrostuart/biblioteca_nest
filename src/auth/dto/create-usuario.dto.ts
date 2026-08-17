import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Pedro",
        description: "Nome do usuario"
    })
    nome: string;
    @IsNotEmpty()
    @IsEmail()// usado pra quando for email, pega na regra que tem que ser um email
    @ApiProperty({
        example: "pedro@gmail.com",
        description: "Email do usuario"
    })
    email: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "senha123",
        description:"Senha do usuario"
    })
    senha: string;
}
