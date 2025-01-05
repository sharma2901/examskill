import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const database_url = configService.get<string>('DATABASE_URL');
        const pool = new Pool({ connectionString: database_url, ssl: true });
        // noinspection BadExpressionStatementJS
        drizzle(pool, { schema, casing: 'snake_case' }) as NodePgDatabase<
          typeof schema
        >;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
