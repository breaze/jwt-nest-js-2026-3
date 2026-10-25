import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleServiceInterface } from './people-service-interface.js';
import { CreatePersonInDto } from './dto/create-person-in-dto.js';
import { CreatePersonOutDto } from './dto/create-person-out-dto.js';
import { GetPeopleOutDto } from './dto/get-people-out-dto.js';
import { GetPersonOutDto } from './dto/get-person-out-dto.js';
import { UpdatePersonInDto } from './dto/update-person-in-dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './people.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService implements PeopleServiceInterface {

    constructor(
        @InjectRepository(People)
        private readonly peopleRepository: Repository<People>,
    ){}

    async createPerson(createPersonInDTO: CreatePersonInDto): Promise<CreatePersonOutDto> {
        const person = this.peopleRepository.create(createPersonInDTO);
        const createdPerson = await this.peopleRepository.save(person);
        const outDTO: CreatePersonOutDto = {
            personId: createdPerson.personId,
            name: createdPerson.name
        }
        return outDTO;
    }
    
    async getPerson(personId: number): Promise<GetPersonOutDto> {
        const person = await this.peopleRepository.findOneBy({ personId });
        if (!person) {
            throw new NotFoundException(`Person with id ${personId} not found`);
        }
        const outDTO: GetPersonOutDto = {
            personId: person.personId,
            name: person.name
        }
        return outDTO;
    }
    async getPeople(): Promise<GetPeopleOutDto> {
        const people = await this.peopleRepository.find();

        const mappedPeople: GetPersonOutDto[] = [];
        for (const person of people) {
            mappedPeople.push({
                personId: person.personId,
                name: person.name,
            });
        }
        return { people: mappedPeople };
    }
    async updatePerson(personId: number, updatePersonInDTO: UpdatePersonInDto): Promise<boolean> {
        const result = await this.peopleRepository.update(
            { personId },
            { name: updatePersonInDTO.name }
        );
        if ((result.affected ?? 0) === 0) {
            throw new NotFoundException(`Person with id ${personId} not found`);
        }
        return true;
    }
    async deletePerson(personId: number): Promise<boolean> {
        const result = await this.peopleRepository.delete({ personId });
        if ((result.affected ?? 0) === 0) {
            throw new NotFoundException(`Person with id ${personId} not found`);
        }
        return true;
    }
}