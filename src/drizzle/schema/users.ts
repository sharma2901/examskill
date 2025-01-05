import { pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { timestamps } from '../column.helpers';
export const users = pgTable(
  'users',
  {
    id: serial().primaryKey(),
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
