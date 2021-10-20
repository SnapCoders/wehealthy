import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Appointments } from '../app/typeorm/entities/Appointments';
import { IDeleteAppointments } from '../contracts/IAppointments';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id }: IDeleteAppointments): Promise<Appointments> {
    const foundedUserAppointment = await this.appointmentRepository.findById(
      id,
    );

    if (!foundedUserAppointment) {
      throw new AppError('Appointment not found!', 404);
    }

    await this.appointmentRepository.delete(id);

    return foundedUserAppointment;
  }
}

export { DeleteAppointmentService };
