import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';

const entities = [];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [...entities],
      synchronize: Boolean(process.env.DB_SYNC || false), 
      logging: Boolean(process.env.DB_LOGGING || false)
    }),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class AppModule {}
