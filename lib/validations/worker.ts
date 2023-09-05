import * as z from 'zod';

export const WorkerValidation = z.object({
    _id: z.any(),
    orgId: z.string(),
    firstname: z.string().min(1, { message: 'Minimum 1 characters'}).max(30),
    lastname: z.string().min(1).max(30),
    mondaystart: z.any(),
    mondayend: z.any(),

})