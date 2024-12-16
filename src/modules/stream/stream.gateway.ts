/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class StreamGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any): void {
    console.log('🚀 Received offer');
    // Broadcast the offer to all viewers
    this.server.emit('offer', data);
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: any): void {
    // Send the answer back to the streamer
    console.log('🚀 Received answer');
    this.server.emit('answer', data);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: any): void {
    // Relay ICE candidates between streamer and viewers
    console.log('🚀 Received ice-candidate');
    this.server.emit('ice-candidate', data);
  }
}
