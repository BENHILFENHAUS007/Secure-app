import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

type User = { id: string; phoneNumber: string; name?: string };

@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>();

  async findOrCreateByPhone(phoneNumber: string): Promise<User> {
    if (this.users.has(phoneNumber)) {
      return this.users.get(phoneNumber)!;
    }

    const user: User = { id: randomUUID(), phoneNumber };
    this.users.set(phoneNumber, user);
    return user;
  }
}
