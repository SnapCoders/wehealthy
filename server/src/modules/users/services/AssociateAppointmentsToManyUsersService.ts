import { injectable, inject } from 'tsyringe';

import { Appointments } from '@modules/appointment/app/typeorm/entities/Appointments';
import { IAppointmentsRepository } from '@modules/appointment/repositories/IAppointmentsRepository';
import { AppError } from '@shared/errors/AppError';

import { IAssociateAppointmentsToManyUsers } from '../contracts/IUserAppointmentsDTO';
import { IUsersAppointmentsRepository } from '../repositories/IUsersAppointmentsRepository';

@injectable()
class AssociateAppointmentsToManyUsersService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersAppointmentsRepository')
    private usersAppointmentsRepository: IUsersAppointmentsRepository,
  ) {}

  public async execute({
    appointment_id,
    users_ids,
  }: IAssociateAppointmentsToManyUsers): Promise<Appointments> {
    const foundedAppointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!foundedAppointment) {
      throw new AppError('Appointment not found!', 404);
    }

    const associationsPromise = users_ids.map(user_id => {
      return this.usersAppointmentsRepository.create({
        user_id,
        appointment_id,
      });
    });

    await Promise.all(associationsPromise);

    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    return appointment;
  }
}

export { AssociateAppointmentsToManyUsersService };
