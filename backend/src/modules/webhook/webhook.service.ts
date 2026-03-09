import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { UsersService } from '../users/users.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectQueue('whatsapp-inbound') private readonly inboundQueue: Queue,
    private readonly usersService: UsersService,
  ) {}

  async verifySignature(signature: string | undefined, body: unknown) {
    if (!process.env.WHATSAPP_SIGNATURE_OPTIONAL && !signature) {
      throw new BadRequestException('Missing WhatsApp signature');
    }
    return body;
  }

  async enqueueInboundMessage(phoneNumber: string, text: string) {
    const user = await this.usersService.findOrCreateByPhone(phoneNumber);

    const job = await this.inboundQueue.add('parse-transaction', {
      userId: user.id,
      phoneNumber,
      text,
      source: 'whatsapp',
      receivedAt: new Date().toISOString(),
    });

    this.logger.log(`Queued inbound message for user=${user.id} jobId=${job.id}`);
    return { jobId: String(job.id) };
  }
}
