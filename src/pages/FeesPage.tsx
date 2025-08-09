import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecordPaymentForm } from '@/components/fees/RecordPaymentForm';
import { Payment, RecordPaymentFormValues, FeeStructure } from '@/lib/validators/fee';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Filter,
  Download,
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Send
} from 'lucide-react';

const initialPayments: Payment[] = [
  {
    id: 1,
    studentName: 'Emma Johnson',
    rollNo: 'ST001',
    class: 'Grade 10A',
    amount: 1310,
    dueDate: '2024-12-15',
    paidDate: '2024-12-12',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN123456789'
  },
  {
    id: 2,
    studentName: 'Michael Chen',
    rollNo: 'ST002',
    class: 'Grade 10B',
    amount: 1310,
    dueDate: '2024-12-15',
    paidDate: null,
    status: 'Pending',
    paymentMethod: null,
    transactionId: null
  },
  {
    id: 3,
    studentName: 'Sarah Williams',
    rollNo: 'ST003',
    class: 'Grade 11A',
    amount: 1510,
    dueDate: '2024-11-15',
    paidDate: null,
    status: 'Overdue',
    paymentMethod: null,
    transactionId: null
  }
];

const initialFeeStructures: FeeStructure[] = [
  { id: 1, class: 'Grade 9', tuitionFee: 800, admissionFee: 200, examFee: 50, libraryFee: 30, labFee: 100, totalFee: 1180 },
  { id: 2, class: 'Grade 10', tuitionFee: 900, admissionFee: 200, examFee: 60, libraryFee: 30, labFee: 120, totalFee: 1310 },
  { id: 3, class: 'Grade 11', tuitionFee: 1000, admissionFee: 250, examFee: 70, libraryFee: 40, labFee: 150, totalFee: 1510 },
];

const FeesPage = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(initialFeeStructures);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const filteredPayments = payments.filter(payment => 
    (payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.rollNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === 'all' || payment.status.toLowerCase() === selectedStatus)
  );

  const handlePaymentSubmit = (data: RecordPaymentFormValues) => {
    toast({ title: "Payment Recorded", description: `Payment of $${data.amount} has been recorded.` });
    setIsFormOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending' || p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = totalCollected + totalPending > 0 ? Math.round((totalCollected / (totalCollected + totalPending)) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground">Manage fee structure, payments, and financial records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Send className="h-4 w-4 mr-2" />Send Reminders</Button>
          <Button onClick={() => setIsFormOpen(true)}><Plus className="h-4 w-4 mr-2" />Record Payment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding dues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{collectionRate}%</div>
            <p className="text-xs text-muted-foreground">On-time payments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
              <CardDescription>Track fee payments and outstanding dues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search by student name or roll no..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.studentName}</div>
                            <div className="text-sm text-muted-foreground">{payment.rollNo}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${payment.amount}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell><Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Configure fee structure for different classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Tuition</TableHead>
                      <TableHead>Admission</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Library</TableHead>
                      <TableHead>Lab</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeStructures.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.class}</TableCell>
                        <TableCell>${fee.tuitionFee}</TableCell>
                        <TableCell>${fee.admissionFee}</TableCell>
                        <TableCell>${fee.examFee}</TableCell>
                        <TableCell>${fee.libraryFee}</TableCell>
                        <TableCell>${fee.labFee}</TableCell>
                        <TableCell className="font-bold">${fee.totalFee}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
            <DialogDescription>Enter the details of the payment received.</DialogDescription>
          </DialogHeader>
          <RecordPaymentForm onSubmit={handlePaymentSubmit} onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeesPage;