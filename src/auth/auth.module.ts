import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt'; //JWT = segurança entre rotas, autorização de um usuario, permite fazer a criação do token
import { ConfigService } from '@nestjs/config';// lê o .env precisamos para ver o JWT_SCRET
import { sign } from 'crypto';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  imports: [DatabaseModule,
    //AQUI é a permissão pra gera o token
    JwtModule.registerAsync({// registerAsync uma função do JwtModule, ele deixa que eu pegue todas as informações que vão ser consedidas na hora que aplicação rodar, ou seja, quando eu faço um login ele pega as irnformações pra criar token. Ele vai executar essa funão inteira quando eu fazer o login, registerAsync é algo pronto ou seja que ele entende quando é um login

      inject: [ConfigService],// para acessar o .env, injetando uma dependencia (tipo o constructor)
      useFactory: (configService : ConfigService) =>({//Use factory gera o token, ele pega todos os dados para gera o token, o usefacotry só diparado depois de pegar o JWT_SECRET aqui a baixo com o secret
        secret: configService.get<string>('JWT_SCRET'),
        signOptions:{//Por questao de segunça nao da pra o token ficar valido pra sempre, depois de
          expiresIn: '1h'
        }
      })
    })
  ],
  exports: [JwtModule, AuthGuard]/*exportandi o "AuthGuard" para conseguir exportar nossas regras*/ 
})
export class AuthModule {}
