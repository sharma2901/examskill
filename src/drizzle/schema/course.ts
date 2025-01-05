import { pgTable, serial, text, pgEnum, index } from 'drizzle-orm/pg-core';
import { timestamps } from '../column.helpers';

export const descriptionTypesEnum = pgEnum('descriptionType', [
  'para',
  'video',
]);
export const course = pgTable(
  'course',
  {
    id: serial().primaryKey(),
    title: text().notNull(),
    description: text().notNull(),
    descriptionType: descriptionTypesEnum().default('para'),
    ...timestamps,
  },
  (table) => {
    return {
      titleIdx: index('title_idx').on(table.title),
    };
  },
);
