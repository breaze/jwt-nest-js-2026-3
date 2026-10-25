import { GreetGroupInDto } from "./dto/greet-group-in-dto.js";
import { GreetGroupOutDto } from "./dto/greet-group-out-dto.js";
import { GreetPersonInDto } from "./dto/greet-person-in-dto.js";
import { GreetPersonOutDto } from "./dto/greet-person-out-dto.js";

export interface GreetServiceInterface {
    greetPerson(greetPersonInDTO: GreetPersonInDto): GreetPersonOutDto
    greetGroup(greetGroupInDTO: GreetGroupInDto): GreetGroupOutDto
}
