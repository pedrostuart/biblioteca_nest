import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';
import { AutoresService } from './autores.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AutoresController],
  providers: [AutoresService],
  imports: [DatabaseModule]
})
export class AutoresModule {}
