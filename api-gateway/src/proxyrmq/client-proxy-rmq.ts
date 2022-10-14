import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ClientProxy,
    ClientProxyFactory,
    Transport
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyRMQ {
    private user = this.configService.get<string>('RMQ_USER');
    private password = this.configService.get<string>('RMQ_PASSWORD');
    private url = this.configService.get<string>('RMQ_URL');

    constructor(private configService: ConfigService) {}

    getClientProxyProductsInstance(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${this.user}:${this.password}@${this.url}`],
                queue: 'products'
            }
        });
    }
}
