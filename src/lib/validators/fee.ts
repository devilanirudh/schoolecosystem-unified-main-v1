import { z } from 'zod';

export const feeStructureFormSchema = z.object({
  class: z.string().min(1, { message: "Class/Grade is required." }),
  tuitionFee: z.coerce.number().min(0, { message: "Tuition fee is required." }),
  admissionFee: z.coerce.number().min(0, { message: "Admission fee is required." }),
  examFee: z.coerce.number().min(0, { message: "Exam fee is required." }),
  libraryFee: z.coerce.number().min(0, { message: "Library fee is required." }),
  labFee: z.coerce.number().min(0, { message: "Lab fee is required." }),
});

export type FeeStructureFormValues = z.infer<typeof feeStructureFormSchema>;

export const feeStructureSchema = feeStructureFormSchema.extend({
  id: z.number(),
  totalFee: z.number(),
});

export type FeeStructure = z.infer<typeof feeStructureSchema>;

export const recordPaymentFormSchema = z.object({
  studentId: z.string().min(1, { message: "Please select a student." }),
  amount: z.coerce.number().min(1, { message: "Amount must be greater than 0." }),
  paymentMethod: z.string().min(1, { message: "Payment method is required." }),
  transactionId: z.string().optional(),
  paidDate: z.string().min(1, { message: "Payment date is required." }),
});

export type RecordPaymentFormValues = z.infer<typeof recordPaymentFormSchema>;

export const paymentSchema = z.object({
  id: z.number(),
  studentName: z.string(),
  rollNo: z.string(),
  class: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  paidDate: z.string().nullable(),
  status: z.enum(['Paid', 'Pending', 'Overdue']),
  paymentMethod: z.string().nullable(),
  transactionId: z.string().nullable(),
});

export type Payment = z.infer<typeof paymentSchema>;