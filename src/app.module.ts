import { Module } from '@nestjs/common';
import { PeopleModule } from './modules/people/people.module.js';
import { PurchasesModule } from './modules/purchases/purchases.module.js';
import { AccountModule } from './modules/account/account.module.js';
import { MysqlModule } from './shared/infrastructure/mysql/mysql.module.js';
import { GreetingsModule } from './modules/greetings/greetings.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [PeopleModule, PurchasesModule, AccountModule, MysqlModule, GreetingsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
