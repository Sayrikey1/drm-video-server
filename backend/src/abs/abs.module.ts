import { Module } from '@nestjs/common';
import { AbsController } from './abs.controller';
import { AbsGenerationService } from './abs-generation.service';
import { AbsVideoDistributionService } from './abs-distribution.service';

@Module({
  controllers: [AbsController],
  providers: [AbsGenerationService, AbsVideoDistributionService],
})
export class AbsModule {}
