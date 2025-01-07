import { pgTable, text, pgEnum, index, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../column.helpers';

export const descriptionTypesEnum = pgEnum('description-type', [
  'para',
  'video',
  'image',
]);
export const course = pgTable(
  'course',
  {
    id: uuid().defaultRandom().primaryKey(),
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
