import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Appointments } from '../app/typeorm/entities/Appointments';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

@injectable()
class UpdateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id, ...rest }): Promise<Appointments> {
    const foundAppointment = await this.appointmentsRepository.findById(id);

    if (!foundAppointment) {
      throw new AppError('Appointment not found!', 404);
    }

    await this.appointmentsRepository.save({ ...foundAppointment, ...rest });

    const updatedUser = await this.appointmentsRepository.findById(id);

    return updatedUser;
  }
}

export { UpdateAppointmentService };
