import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LivrosModule } from './livros/livros.module';
import { AutoresModule } from './autores/autores.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      //para que as variaveis presententes no .env consiga ser visto por toda aplicação
      isGlobal: true
    }),
    DatabaseModule,
    LivrosModule,
    AutoresModule,
    AuthModule
  ]
})
export class AppModule {}

//sempre que eu conectar com o banco eu preciso só do module e do service