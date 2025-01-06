import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { users } from '../drizzle/schema';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async findAll() {
    return await this.db.select().from(users);
  }

  async create(newUser) {
    return await this.db.insert(users).values(newUser);
  }

  async update(id: string, newUser) {
    return await this.db
      .update(users)
      .set({ ...newUser, updated_at: sql`NOW()` })
      .where(eq(users.id, id));
  }
}
