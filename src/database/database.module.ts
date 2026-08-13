import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],// serviço que esta sendo consumido
  exports: [DatabaseService],// consigo acessar por qualquer outro modulo (tipo o app), estou exportanto para o app.module conseguir ver

})
export class DatabaseModule {}
