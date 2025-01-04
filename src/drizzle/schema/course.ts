import { pgTable, serial, timestamp, text } from 'drizzle-orm/pg-core';

export const course = pgTable('course', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
