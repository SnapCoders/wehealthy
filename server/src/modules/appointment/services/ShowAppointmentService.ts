import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Appointments } from '../app/typeorm/entities/Appointments';
import { IShowAppointments } from '../contracts/IAppointments';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

@injectable()
class ShowAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id }: IShowAppointments): Promise<Appointments> {
    const user = await this.appointmentsRepository.findById(id);

    if (!user) {
      throw new AppError('Appointment not found!', 404);
    }

    return user;
  }
}

export { ShowAppointmentService };
