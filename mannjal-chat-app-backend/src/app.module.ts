import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './events/events.gateway';
import { MessageSchema } from './message.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chat-app'),
    MongooseModule.forFeature([{ name: 'messages', schema: MessageSchema }]),
  ],
  providers: [EventsGateway],
})
export class AppModule {}
