import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { jwtConfig } from './jwt.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  providers: [
    {
      provide: 'JWT_CONFIG',
      useValue: jwtConfig,
    },
  ],
  exports: ['JWT_CONFIG'],
})
export class ConfigModule {}
