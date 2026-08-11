import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // para definir regras dos class validator, 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//ATIVADA A VALIDAÇÃO DOS DTOs EM TODA A APLICAÇÃO, a partir de agora todos os dto's já são regras se eu criar um novo dto ele já vai esta sendo considerado uma regra se seguir
  app.useGlobalPipes(
    new ValidationPipe({
      //caso voce preencha alguma area/input que nao esta nas regras ele da erro
      whitelist: true,
      // Retorna o erro quando uma propriedade desconhecida é enviada
      forbidNonWhitelisted: true,
      // Tenta transformar os valores recebidos
      //para os esperados pela aplicação
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);// tudo aqui no main tem que ser antes da porta
}
bootstrap();
