import { z } from 'zod';

export const examFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  class: z.string().min(1, { message: "Class is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  totalMarks: z.coerce.number().min(1, { message: "Total marks must be at least 1." }),
});

export type ExamFormValues = z.infer<typeof examFormSchema>;

export const examSchema = examFormSchema.extend({
  id: z.number(),
  status: z.enum(['Scheduled', 'Ongoing', 'Completed', 'Cancelled']),
});

export type Exam = z.infer<typeof examSchema>;