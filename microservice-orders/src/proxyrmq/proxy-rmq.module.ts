import { Module } from '@nestjs/common';
import { ClientProxyRMQ } from './client-proxy-rmq';

@Module({
  providers: [ClientProxyRMQ],
  exports: [ClientProxyRMQ],
})
export class ProxyRMQModule {}
