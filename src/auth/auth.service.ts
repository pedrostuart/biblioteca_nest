import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bycript from "bcrypt"//npm install bcrypt -D @types/bcrypt para instalar o bycript, bycript usado para rest de senha
@Injectable()
export class AuthService {
    constructor (private readonly databaseService: DatabaseService){}
    
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
}
