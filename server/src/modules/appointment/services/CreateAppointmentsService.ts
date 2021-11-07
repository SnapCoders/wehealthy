// import path from 'path';
import { injectable, inject } from 'tsyringe';

// import { User } from '@modules/users/app/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/providers/MailProvider/models/IMailProvider';

import { Appointments } from '../app/typeorm/entities/Appointments';
import { ICreateAppointmentsRequest } from '../contracts/IAppointments';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

@injectable()
class CreateAppointmentsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    user_id,
    link,
    date,
    type,
    nutritionist_id,
  }: ICreateAppointmentsRequest): Promise<Appointments> {
    const findNutritionist = await this.usersRepository.findById(
      nutritionist_id,
    );

    if (!findNutritionist) {
      throw new AppError('This nutritionist does not exist!', 404);
    }

    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('This user does not exist!', 404);
    }

    const foundAppointment = await this.appointmentsRepository.find({
      where: {
        user_id,
        nutritionist_id,
        date,
      },
    });

    if (foundAppointment) {
      throw new AppError('This appointment is already booked!', 406);
    }

    const createAppointment = await this.appointmentsRepository.create({
      nutritionist_id,
      user_id,
      date,
      link,
      type,
    });

    // const file = path.resolve(__dirname, '..', 'views', 'welcome_new_user.hbs');

    // [findUser, findNutritionist].forEach(async (user: User) => {
    //   await this.mailProvider.sendMail({
    //     to: { name: user.name, email: user.email },
    //     subject: '[WeHealthy] Confirmação de agendamento por e-mail',
    //     templateData: { file, variables: { name: user.name } },
    //   });
    // });

    return createAppointment;
  }
}

export { CreateAppointmentsService };
