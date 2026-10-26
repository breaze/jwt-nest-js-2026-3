import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PEOPLE_SERVICE } from './tokens.js';
import type { PeopleServiceInterface } from './people-service-interface.js';
import { CreatePersonInDto } from './dto/create-person-in-dto.js';
import { UpdatePersonInDto } from './dto/update-person-in-dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { RoleName } from '../auth/enums/role-name.enum.js';

@Controller('people')
export class PeopleController {
    constructor(
    @Inject(PEOPLE_SERVICE)
    private readonly peopleService: PeopleServiceInterface,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard, new RolesGuard(RoleName.ADMIN))
  createPerson(@Body() dto: CreatePersonInDto) {
    return this.peopleService.createPerson(dto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard, new RolesGuard(RoleName.USER, RoleName.ADMIN)) 
  getPeople() {
    return this.peopleService.getPeople();
  }

  @Get(':id')
  getPerson(@Param('id') id: number) {
    return this.peopleService.getPerson(id);
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async updatePerson(@Param('id') id: number, @Body() dto: UpdatePersonInDto): Promise<void> {
    await this.peopleService.updatePerson(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, new RolesGuard(RoleName.ADMIN)) 
  async deletePerson(@Param('id') id: number): Promise<void> {
    await this.peopleService.deletePerson(id);
  }
}
