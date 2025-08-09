import { z } from 'zod';

export const assignmentFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  class: z.string().min(1, { message: "Class is required." }),
  dueDate: z.string().min(1, { message: "Due date is required." }),
  points: z.coerce.number().min(1, { message: "Points must be at least 1." }),
  instructions: z.string().optional(),
});

export type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

export const assignmentSchema = assignmentFormSchema.extend({
  id: z.number(),
  status: z.enum(['Active', 'Draft', 'Overdue', 'Completed']),
  submissions: z.number(),
  totalStudents: z.number(),
});

export type Assignment = z.infer<typeof assignmentSchema>;