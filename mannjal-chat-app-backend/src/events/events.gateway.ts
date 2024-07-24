import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../message.schema';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer() io: Server;

  constructor(
    @InjectModel('messages') private readonly messageModel: Model<Message>,
  ) {}

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client id: ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);

    const newMessage = new this.messageModel({
      clientId: data.clientId,
      text: data.text,
      replyTo: data.replyTo,
      timestamp: new Date(),
    });
    await newMessage.save();

    this.io.emit('message', data); // Broadcast the message to all clients
  }
}
