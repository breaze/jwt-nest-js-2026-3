import { Body, Controller, Get, Inject, Param, Post, Query, Res } from '@nestjs/common';
import { GreetGroupInDto } from './dto/greet-group-in-dto.js';
import type { GreetServiceInterface } from './greet-service-interface.js';
import { GREET_SERVICE } from './tokens.js';
import { GreetPersonInDto } from './dto/greet-person-in-dto.js';

@Controller('greetings')
export class GreetingsController {
    constructor(
        @Inject(GREET_SERVICE)
        private readonly greetService: GreetServiceInterface,
    ){}
    @Get('')
    greetByNameQuery(@Query('name') name: string) {
        let greetingPersonInDTO: GreetPersonInDto = {
            name: name
        }
        return this.greetService.greetPerson(greetingPersonInDTO);
    }

    @Get(':name')
    greetByNamePath(@Param('name') name: string) {
        let greetingPersonInDTO: GreetPersonInDto = {
            name: name
        }
        return this.greetService.greetPerson(greetingPersonInDTO);
    }

    @Post('')
    //greetWholeGroup(@Body() dto: GreetGroupInDto, @Res() res: Response) {
    greetWholeGroup(@Body() dto: GreetGroupInDto) {
        //return res.status(HttpStatus.OK).json(this.greetService.greetGroup(dto));
        return this.greetService.greetGroup(dto);
    }
}
