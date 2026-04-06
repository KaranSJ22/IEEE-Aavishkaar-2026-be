import { Router } from 'express';
import { pingRoute } from './ping';
import { sampleRoute } from './sample';
import { eventRoute } from './events';
import { registrationRoute } from './registrations';

const router = Router();

router.use(pingRoute);
router.use(sampleRoute);
router.use('/events', eventRoute);
router.use('/registrations', registrationRoute);


export default router;
