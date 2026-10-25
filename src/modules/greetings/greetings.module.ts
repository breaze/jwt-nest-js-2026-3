import { Module } from '@nestjs/common';
import { GreetServiceService } from './greet-service.service.js';
import { GreetingsController } from './greetings.controller.js';
import {GREET_SERVICE} from './tokens.js'

@Module({
  providers: [
    {
      provide: GREET_SERVICE,
      useClass: GreetServiceService
    },
  ],
  controllers: [GreetingsController]
})
export class GreetingsModule {}
