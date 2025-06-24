import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      transform: true, // ✅ Tự ép kiểu từ string → boolean/number nếu có thể
      whitelist: true, // ✅ Loại bỏ field không khai báo trong DTO
      forbidNonWhitelisted: true // ❌ Báo lỗi nếu có field thừa
    }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
