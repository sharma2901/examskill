import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { users } from '../drizzle/schema';
import { DRIZZLE } from '../drizzle/drizzle.module';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async findAll() {
    return await this.db.select().from(users);
  }
  async create(newUser) {
    console.log('newUser at service', newUser);
    return this.db.insert(users).values(newUser);
  }
}
