import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { DatabaseModule } from 'src/database/database.module'; //acessando o banco de dados pelo database modeule

@Module({
  //importamos o database module porque o livrosService precisará acessar o banco
  imports:[DatabaseModule],
  providers: [LivrosService],
  controllers: [LivrosController]
})
export class LivrosModule {}
