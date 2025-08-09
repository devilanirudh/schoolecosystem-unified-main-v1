import { z } from 'zod';

export const classFormSchema = z.object({
  name: z.string().min(3, { message: "Class name must be at least 3 characters." }),
  grade: z.string().min(1, { message: "Grade is required." }),
  section: z.string().min(1, { message: "Section is required." }),
  teacher: z.string().min(2, { message: "Teacher name is required." }),
  subject: z.string().min(2, { message: "Subject is required." }),
  room: z.string().min(1, { message: "Room is required." }),
  capacity: z.coerce.number().min(1, { message: "Capacity must be at least 1." }),
});

export type ClassFormValues = z.infer<typeof classFormSchema>;

export const classSchema = classFormSchema.extend({
  id: z.number(),
  students: z.number(),
  schedule: z.string(),
  status: z.enum(['Active', 'Inactive']),
});

export type Class = z.infer<typeof classSchema>;