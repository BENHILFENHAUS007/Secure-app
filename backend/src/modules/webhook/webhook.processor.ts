import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { parseWhatsAppMessage } from '../../parser/message-parser';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
@Processor('whatsapp-inbound')
export class WebhookProcessor extends WorkerHost {
  private readonly logger = new Logger(WebhookProcessor.name);

  constructor(private readonly transactionsService: TransactionsService) {
    super();
  }

  async process(job: Job<{ userId: string; text: string; source: 'whatsapp' }>): Promise<void> {
    const parsed = parseWhatsAppMessage(job.data.text);

    if (!parsed) {
      this.logger.warn(`Failed parsing message for user=${job.data.userId}`);
      return;
    }

    await this.transactionsService.create({
      userId: job.data.userId,
      source: job.data.source,
      ...parsed,
    });

    this.logger.log(`Transaction persisted for user=${job.data.userId}`);
  }
}
