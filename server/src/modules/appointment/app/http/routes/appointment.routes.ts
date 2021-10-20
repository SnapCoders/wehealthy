import { Router } from 'express';

import { AppointmentsController } from '../controllers/AppointmentController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.get('/', appointmentsController.index);
appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/:id', appointmentsController.show);
appointmentsRouter.put('/:id', appointmentsController.update);
appointmentsRouter.delete('/:id', appointmentsController.delete);

export { appointmentsRouter };
