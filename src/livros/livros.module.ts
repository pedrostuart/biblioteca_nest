import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { DatabaseModule } from 'src/database/database.module'; //acessando o banco de dados pelo database modeule
import { AuthModule } from 'src/auth/auth.module';
@Module({
  //importamos o database module porque o livrosService precisará acessar o banco
  imports:[DatabaseModule, AuthModule],
  providers: [LivrosService],
  controllers: [LivrosController]
})
export class LivrosModule {}
