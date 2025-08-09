import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StudentForm } from '@/components/students/StudentForm';
import { Student, StudentFormValues } from '@/lib/validators/student';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Download,
  Upload,
  UserPlus,
  Phone
} from 'lucide-react';

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.j@email.com',
    rollNo: 'ST001',
    class: 'Grade 10A',
    phone: '+1234567890',
    status: 'Active',
    admissionDate: '2024-01-15',
    attendance: 94,
    fees: 'Paid',
    parentName: 'John Johnson',
    parentPhone: '+1112223333',
    address: '123 Maple Street, Springfield'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    rollNo: 'ST002',
    class: 'Grade 10B',
    phone: '+1234567891',
    status: 'Active',
    admissionDate: '2024-01-20',
    attendance: 88,
    fees: 'Pending',
    parentName: 'Wei Chen',
    parentPhone: '+14445556666',
    address: '456 Oak Avenue, Springfield'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    rollNo: 'ST003',
    class: 'Grade 11A',
    phone: '+1234567892',
    status: 'Active',
    admissionDate: '2024-02-01',
    attendance: 96,
    fees: 'Paid',
    parentName: 'David Williams',
    parentPhone: '+17778889999',
    address: '789 Pine Lane, Springfield'
  }
];

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
  const [deletingStudent, setDeletingStudent] = useState<Student | undefined>(undefined);
  const { toast } = useToast();

  const filteredStudents = students.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedClass === 'all' || student.class === selectedClass)
  );

  const handleFormSubmit = (data: StudentFormValues) => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...editingStudent, ...data } : s));
      toast({ title: "Student Updated", description: `${data.name}'s record has been updated.` });
    } else {
      const newStudent: Student = { ...data, id: Date.now(), attendance: 100 };
      setStudents([...students, newStudent]);
      toast({ title: "Student Added", description: `${data.name} has been added to the system.` });
    }
    setIsFormOpen(false);
    setEditingStudent(undefined);
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (student: Student) => {
    setDeletingStudent(student);
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      setStudents(students.filter(s => s.id !== deletingStudent.id));
      toast({ title: "Student Deleted", description: `${deletingStudent.name}'s record has been removed.`, variant: 'destructive' });
      setDeletingStudent(undefined);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'secondary';
      case 'Suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getFeesColor = (fees: string) => {
    switch (fees) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Manage student records, enrollment, and academic information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => { setEditingStudent(undefined); setIsFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UserPlus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{students.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>View and manage all student records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Grade 9A">Grade 9A</SelectItem>
                <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                <SelectItem value="Grade 10B">Grade 10B</SelectItem>
                <SelectItem value="Grade 11A">Grade 11A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Parent Contact</TableHead>
                  <TableHead>Fees Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.rollNo}</div>
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.parentName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {student.parentPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getFeesColor(student.fees)}>
                        {student.fees}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => alert('View profile for ' + student.name)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => openDeleteDialog(student)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            <DialogDescription>
              {editingStudent ? 'Update the student\'s information.' : 'Enter student information to create a new profile.'}
            </DialogDescription>
          </DialogHeader>
          <StudentForm 
            onSubmit={handleFormSubmit} 
            defaultValues={editingStudent}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingStudent} onOpenChange={() => setDeletingStudent(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the record for {deletingStudent?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingStudent(undefined)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentsPage;