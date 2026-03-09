import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookProcessor } from './webhook.processor';
import { UsersService } from '../users/users.service';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'whatsapp-inbound' })],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookProcessor, UsersService, TransactionsService],
})
export class WebhookModule {}
