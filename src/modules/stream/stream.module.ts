import { Module } from '@nestjs/common';
import { StreamGateway } from './stream.gateway';

@Module({
  providers: [StreamGateway],
})
export class StreamModule {}
