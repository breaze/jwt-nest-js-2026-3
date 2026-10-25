import { Injectable } from '@nestjs/common';
import { GreetServiceInterface } from './greet-service-interface.js';
import { GreetGroupInDto } from './dto/greet-group-in-dto.js';
import { GreetGroupOutDto } from './dto/greet-group-out-dto.js';
import { GreetPersonInDto } from './dto/greet-person-in-dto.js';
import { GreetPersonOutDto } from './dto/greet-person-out-dto.js';

@Injectable()
export class GreetServiceService implements GreetServiceInterface{
    greetPerson(greetPersonInDTO: GreetPersonInDto): GreetPersonOutDto {
        if(greetPersonInDTO == null && greetPersonInDTO == undefined){
            return {greeting: '', successful: false}
        }
        return {
                greeting: `Hello ${greetPersonInDTO.name}`,
                successful: true
        }
    }
    greetGroup(greetGroupInDTO: GreetGroupInDto): GreetGroupOutDto {
        if(greetGroupInDTO == null && greetGroupInDTO == undefined){
            return {greeting: '', successful: false}
        }
        let greeting: string = 'Hello';
        greetGroupInDTO.people.forEach(person => {
            greeting += `, ${person}`;
        });
        return {
            greeting: greeting,
            successful: true
        }
    }
}
