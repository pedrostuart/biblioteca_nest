import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // para definir regras dos class validator, 
//Swagger é uma dependencia para dcoumentação da API, para as pessoas que tenham acesso consiguam saber rotas, regras e etc...
import { SwaggerModule, DocumentBuilder/*Gerador de documento*/ } from '@nestjs/swagger';
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

  //criando o documento
  const config = new DocumentBuilder()
  .setTitle("Api Biblioteca") //Titulo do documento
  .setDescription("API para gerenciamento da biblioteca")// Descrição
  .setVersion('1.0')//Versão do documento
  .addBearerAuth()
  .build()//Comando para a construção do documento(vai lá criar) // build sempre tem que estar em ultimo da lista os outros tanto faz
  const documento = SwaggerModule.createDocument(app /*A nossa aplicação (app.module)*/, config/*A construção*/ /*Pegando nossa aplicação e aplicando a contrução do documento apartir dela*/)
  SwaggerModule.setup("api_biblioteca", app, documento)/*com o setup eu consigo meio que a rota pra conseguir acessar a documentação pela internet, definindo o caminho sendo "localhost:3000/api_biblioteca"*/
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);// tudo aqui no main tem que ser antes da porta
}
bootstrap();
