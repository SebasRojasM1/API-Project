import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './libs/common/filters/exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('FROL - API')
    .setDescription(`FROL is an API designed to optimize the service booking process, improving efficiency and accessibility for both providers and customers.
    Purpose:
    Facilitate real-time management and organization of service bookings, allowing for more effective scheduling and greater customer satisfaction.
    
    Target Users:
    Small and medium-sized service providers and their customers.
    
    Main Features:
    - User authentication and authorization.
    - User management: Creation, retrieval, update, and deletion.
    - Company management: Creation, retrieval, update, and deletion of companies offering their services.
    `)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(`The FROL project is working. http://localhost:3000`);
  console.log(`===================================================`);
  console.log(`Access Frol's Swagger here: http://localhost:3000/api`)
  
}
bootstrap();

