//Vamos fazer a proteção da rota
//Preciso exigir que quem vai acesar essa rota seja autorizada, ser autorizada pelo token
//Vamos bloquear a rota de uma pessoa se ela não tiver o token (se ela nao tiver feito o login)

import { CanActivate/*recursos pra dizer se a requisição pode continar sendo executada ou não*/, ExecutionContext/**/, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { triggerAsyncId } from "async_hooks";
import { Observable } from "rxjs";

//Essa classe irá determinar se uma requisição pode continuar ou não
@Injectable() //pra conseguir injetar essa função em outros locais
export class AuthGuard implements CanActivate{
    constructor (private readonly jwtService:JwtService){}
    async canActivate/*recebe dois tipo de resposta (true ou false)(requisição executada ou não)*/(context: ExecutionContext/*Indentifica qual tipo de requisição dentro do protocolo http, ele é como se fosse uma biblioteca(tem varios recursos)*/ ): Promise<boolean>/*Tem que prometer pro sitema que eu vou ter a resposta do boolean (a gente promete com o Promisse)*/{
        //Recupera a requisição HTTP que está tentando acessar a rota (enviada pelo usuario)
        const request = context.switchToHttp().getRequest()//Pega o tipo de requisição (GET, PUT, POST, DELETE)

        //Recupera o conteudo do cabeçalho do Authorization
        const authorization = request.headers.authorization//ele vai pegar essa requisição request e vai ver se ter o authorization(token) dentro do header da requisição, se tiver guarda dentro do const authorization

        if(!authorization){
            throw new UnauthorizedException('Token não informado')
        }

        const[tipo, token] = authorization.split(' ')//separando o conteudo de authorization em tipo(Bearer) e token, Bearer é um tipo, não é algo que armazena Bearer

        //Verificamos se o token esta informado no formato correto
        if(tipo!=="Bearer" || !token){
            throw new UnauthorizedException('Token inválido')
        }

        try{
            //Aqio validamos a assinatira e a validade do token
            const payload = await this.jwtService.verifyAsync(token)//payload = dados dentro do token, estou verificando o dados dentro do token, id, email e validade(tempo de 1h)

            //E salvamos as informações do usuario na requisição
            request.usuario = payload //botamos dentro da requisição do usuario o dados fornecido permitindo acessar a rota
        }catch{
            //Caso não seja valido ou não estaja dentro do prazo, exibimos uma mensagem "erro"
            throw new UnauthorizedException('Token invalido ou expirado')
        }
        //Se tudo estiver certo, permitimos que a requisição continue
        return true//retornarmos true porque prometemos com o Promisse lá em cima iremos retornar
    }

}