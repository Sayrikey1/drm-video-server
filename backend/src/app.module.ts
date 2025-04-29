import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbsModule } from './abs/abs.module';

@Module({
  imports: [AbsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
