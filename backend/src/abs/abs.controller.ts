import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AbsGenerationService } from './abs-generation.service';
import { AbsContentPathParams, GenerateAbsContentInput } from './abs.model';
import { AbsVideoDistributionService } from './abs-distribution.service';
import { Response } from 'express';

@Controller('abs')
export class AbsController {
  constructor(
    private readonly absGenerationService: AbsGenerationService,
    private readonly absDistributionService: AbsVideoDistributionService,
  ) {}

  @Post('/generate')
  async generateAbsDataForFile(@Body() data: GenerateAbsContentInput) {
    await this.absGenerationService.generateAbsContent(data);
  }

  @Get(':s3Key/access')
  async getFileAccess(
    @Param() params: AbsContentPathParams,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { s3Key } = params;

    const result = await this.absDistributionService.getSignedCookiesForFile(
      s3Key,
    );

    // set cookies on response
    Object.keys(result.cookies).forEach((key) => {
      const curr = result.cookies[key];
      response.cookie(key, curr.value, curr.options);
    });

    return result;
  }
}
