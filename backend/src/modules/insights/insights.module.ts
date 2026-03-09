import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Module({ providers: [InsightsService] })
export class InsightsModule {}
