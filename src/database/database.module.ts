import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]// consigo acessar por qualquer outro modulo (tipo o app)
})
export class DatabaseModule {}
