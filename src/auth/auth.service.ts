import { Injectable, UnauthorizedException/*Pra quando o login não for autorizado(tipo o NotFoundException, so muda o sentido)*/ } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bycript from "bcrypt"//npm install bcrypt -D @types/bcrypt para instalar o bycript, bycript usado para rest de senha
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RowDataPacket } from 'mysql2';
import { traceProcessWarnings } from 'node:process';
@Injectable()
export class AuthService {
    constructor (private readonly databaseService: DatabaseService, private readonly jwtService: JwtService/*vai trazer outros recurso pra fazer essta autorização no login*/ ){}
    
    async cadastrar(createUsuarioDto: CreateUsuarioDto){
        const {nome, email, senha} = createUsuarioDto
        //aqui estamos gerado o Hash de senha
        //O numero 10 representa o numero de caminhos aos quais o hash usa para construir a senha
        const senhaHash = await bycript.hash(senha, 10)//transformando a senha enviada em um rest, 10 é a quantidade de vezes que vai embaralhar o rest de senha gerado

        //Salvamos hash gerado no banco de dados
        //Não salvamos a senha original enviada pelo usuario
        
        await this.databaseService.query(
            `INSERT INTO usuario (nome, email, senha) VALUES(?,?,?)`,[nome, email, senhaHash]//A gente armazena no banco a senha do hash
        )
        return{
            mensagem: 'usuario cadastrado com sucesso'
        }
    }
    
    async login(loginDto: LoginDto){
        //Realiza a consulta do banco de dados buscando todos os usuarios com email fornecido
        const resultado = await this.databaseService.query('SELECT * FROM usuario WHERE email = ?', [loginDto.email]) as RowDataPacket[]
        if(resultado.length === 0){
            throw new UnauthorizedException('Email ou senha invalidos') //Caso nao ache nenhum usuario com esse email
        }
        // Armazena o usuario encontrado dentro da constante 'usuario'
        const usuario = resultado[0]

        //aGORA VAMOS USAR O bycript.compare PARA TESTAR SE A SENHA INFORMADA PELO USUARIO PARA REALOZAR O LOGIN, É A MESMA SENHA USADA PARA O CADASTRO DELE
        const senhaValida = await bycript.compare( // vai comparar os valores abaixo e retornar true ou false
            loginDto.senha,//Senha utilizada pra fazer o login
            usuario.senha//como conseguimos encontrar o usuario pelo email agora estamos pegando a senha desse usuario, com o bycript ele descriptografa a senha, transformando na senha normal do usuario quando cadastrou para conseguirmos fazer a comparação
        )
        if(!senhaValida){
            throw new UnauthorizedException('Email ou senha invalidos')
        }

        const payload ={/*informações dentro do token, para o token conseguir reconhecer o usuario durante 1 hora (passaremos o id e o email) ,necessita ter essas duas informações pois o codigo do token gerado precisa dessas informações*/
            sub: usuario.id, //sub -> subject -> sujeito
            email:usuario.email
        }

        const token = await this.jwtService.signAsync(payload)// signAsync gera o token(esse token é um codigo) com as informações do payload, o signAsync traz o JwtModule. Pronto agora com esse token podemos acessar durante 1h todas as rotas com meu login salvo, já que o payload vai reconhecer durante 1h meu id e senha sem precisar da senha
        return{
            mensagem: 'Login realizado com sucesso',
            token
        }
    }
}