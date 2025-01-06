import { pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../column.helpers';
export const users = pgTable(
  'users',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    phone: text().notNull().unique(),
    ...timestamps,
  },
  (table) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(table.email),
      phoneIdx: uniqueIndex('phone_idx').on(table.phone),
    };
  },
);
