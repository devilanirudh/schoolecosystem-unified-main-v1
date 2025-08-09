import { z } from 'zod';

// This is the schema for the form itself
export const studentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  rollNo: z.string().min(1, { message: "Roll number is required." }),
  class: z.string().min(1, { message: "Class is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  status: z.enum(['Active', 'Inactive', 'Suspended']),
  admissionDate: z.string().min(1, { message: "Admission date is required." }),
  fees: z.enum(['Paid', 'Pending', 'Overdue']),
  parentName: z.string().min(2, { message: "Parent's name is required." }),
  parentPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address is required." }),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;

// This is the schema for the full student object, including server-generated fields
export const studentSchema = studentFormSchema.extend({
  id: z.number(),
  attendance: z.number(),
});

export type Student = z.infer<typeof studentSchema>;