import { z } from 'zod';

export const teacherFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  empId: z.string().min(1, { message: "Employee ID is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  qualification: z.string().min(2, { message: "Qualification is required." }),
  experience: z.string().min(1, { message: "Experience is required." }),
  joinDate: z.string().min(1, { message: "Joining date is required." }),
});

export type TeacherFormValues = z.infer<typeof teacherFormSchema>;

export const teacherSchema = teacherFormSchema.extend({
  id: z.number(),
  classes: z.array(z.string()),
  status: z.enum(['Active', 'On Leave', 'Inactive']),
  salary: z.string(),
});

export type Teacher = z.infer<typeof teacherSchema>;