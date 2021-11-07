import { injectable, inject } from 'tsyringe';

import { IQuery } from '@shared/contracts/IQuery';

import { Appointments } from '../app/typeorm/entities/Appointments';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

@injectable()
class ListAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(query?: IQuery): Promise<[Appointments[], number]> {
    const users = await this.appointmentsRepository.find(query);

    return users;
  }
}

export { ListAppointmentService };
