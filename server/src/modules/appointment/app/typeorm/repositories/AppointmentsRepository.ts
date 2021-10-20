import { getRepository, Repository, In } from 'typeorm';

import { ICreateAppointments } from '@modules/appointment/contracts/IAppointments';
import { IAppointmentRepository } from '@modules/Appointments/repositories/IAppointmentRepository';
import { IQuery } from '@shared/contracts/IQuery';

import { Appointments } from '../entities/Appointments';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointments>;

  private defaultRelations: string[] = [
    // 'costs',
    // 'Appointment_groups',
    // 'Appointment_groups.group',
  ];

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }

  public async create(data: ICreateAppointments): Promise<Appointments> {
    const appointments = this.ormRepository.create(data);

    await this.ormRepository.save(appointments);

    return appointments;
  }

  public async save(appointments: Appointments): Promise<Appointments> {
    await this.ormRepository.save(appointments);

    return appointments;
  }

  public async find(query?: IQuery): Promise<[Appointments[], number]> {
    const foundedAppointment = await this.ormRepository.findAndCount({
      where: query?.where,
      order: query?.order,
      relations: query?.relations || this.defaultRelations,
      skip: query?.pagination.skip,
      // skip: query?.pagination.take * (page - 1),
      take: query?.pagination.take,
    });

    return foundedAppointment;
  }

  public async findByUserId(id: string): Promise<Appointments> {
    const foundedAppointments = await this.ormRepository.findOne({
      user_id: id,
    });

    return foundedAppointments;
  }

  public async findById(id: string): Promise<Appointments> {
    const foundedAppointments = await this.ormRepository.findOne(id);

    return foundedAppointments;
  }

  public async findByUserIdandNutritionistId(
    user_id: string,
    nutritionist_id: string,
  ): Promise<Appointments> {
    const foundedAppointment = await this.ormRepository.findOne({
      nutritionist_id,
      user_id,
    });

    return foundedAppointment;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { AppointmentRepository };
