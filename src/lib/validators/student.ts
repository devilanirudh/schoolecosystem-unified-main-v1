import { z } from 'zod';

export const studentSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  rollNo: z.string().min(1, { message: "Roll number is required." }),
  class: z.string().min(1, { message: "Class is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  status: z.enum(['Active', 'Inactive', 'Suspended']),
  admissionDate: z.string().min(1, { message: "Admission date is required." }),
  fees: z.enum(['Paid', 'Pending', 'Overdue']),
});

export type StudentFormValues = z.infer<typeof studentSchema>;