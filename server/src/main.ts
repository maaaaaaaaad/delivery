import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(process.env.NEST_SERVER_PORT)
}
bootstrap().then((r) => console.log('Start server!!!'))
