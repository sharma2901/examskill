import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { users } from '../drizzle/schema';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { eq, sql, ne } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async findAll() {
    return this.db.select().from(users).where(ne(users.deleted, true));
  }

  async findById(id: string) {
    const usersArr = await this.db.select().from(users).where(eq(users.id, id));
    return usersArr[0];
  }

  async create(newUser) {
    return this.db.insert(users).values(newUser).returning();
  }

  async update(id: string, newUser) {
    return this.db
      .update(users)
      .set({ ...newUser, updated_at: sql`NOW()` })
      .where(eq(users.id, id))
      .returning();
  }

  async delete(id: string) {
    return (
      this.db
        .update(users)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .set({ deleted: true, updated_at: sql`NOW()` })
        .where(eq(users.id, id))
      // .returning({ deleted: true, id })
    );
  }
}
