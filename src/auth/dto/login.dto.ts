//para o login do usuario precisamos de outro dto, diferente do da criação
import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class LoginDto{
    //como é o login nao precisamos do nome, pois iremos logar so com nome e senha
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'usuario@gmail.com',
        description: 'Email cadastrado do usuario'
    })
    email: string;
    @IsString()
    @IsNotEmpty({message: 'Senha é obrigatoria'})// exibe uma mensagem caso nao esteja seguindo a regra
    @ApiProperty({
        example: 'senha123',
        description: 'Senha cadastrado do usuario'
    })
    senha: string
}