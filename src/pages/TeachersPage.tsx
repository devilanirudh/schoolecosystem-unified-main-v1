import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeacherForm } from '@/components/teachers/TeacherForm';
import { Teacher, TeacherFormValues } from '@/lib/validators/teacher';
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
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  UserCheck,
  DollarSign
} from 'lucide-react';

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: 'Dr. Michael Johnson',
    email: 'michael.j@school.edu',
    empId: 'T001',
    subject: 'Mathematics',
    phone: '+1234567890',
    qualification: 'Ph.D Mathematics',
    experience: '15 years',
    classes: ['Grade 10A', 'Grade 11B'],
    status: 'Active',
    joinDate: '2020-08-15',
    salary: '5200'
  },
  {
    id: 2,
    name: 'Prof. Sarah Williams',
    email: 'sarah.w@school.edu',
    empId: 'T002',
    subject: 'English Literature',
    phone: '+1234567891',
    qualification: 'M.A. English',
    experience: '12 years',
    classes: ['Grade 9A', 'Grade 10B'],
    status: 'Active',
    joinDate: '2021-01-10',
    salary: '4800'
  },
  {
    id: 3,
    name: 'Dr. Robert Chen',
    email: 'robert.c@school.edu',
    empId: 'T003',
    subject: 'Physics',
    phone: '+1234567892',
    qualification: 'Ph.D Physics',
    experience: '18 years',
    classes: ['Grade 11A', 'Grade 12A'],
    status: 'Active',
    joinDate: '2019-03-20',
    salary: '5500'
  }
];

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>(undefined);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | undefined>(undefined);
  const { toast } = useToast();

  const filteredTeachers = teachers.filter(teacher => 
    (teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSubject === 'all' || teacher.subject === selectedSubject)
  );

  const handleFormSubmit = (data: TeacherFormValues) => {
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...data } : t));
      toast({ title: "Teacher Updated", description: `${data.name}'s record has been updated.` });
    } else {
      const newTeacher: Teacher = {
        ...data,
        id: Date.now(),
        classes: ['Grade 10A'],
        status: 'Active',
      };
      setTeachers([...teachers, newTeacher]);
      toast({ title: "Teacher Added", description: `${data.name} has been added to the system.` });
    }
    setIsFormOpen(false);
    setEditingTeacher(undefined);
  };

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setDeletingTeacher(teacher);
  };

  const handleDeleteConfirm = () => {
    if (deletingTeacher) {
      setTeachers(teachers.filter(t => t.id !== deletingTeacher.id));
      toast({ title: "Teacher Deleted", description: `${deletingTeacher.name}'s record has been removed.`, variant: 'destructive' });
      setDeletingTeacher(undefined);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'On Leave': return 'warning';
      case 'Inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Management</h1>
          <p className="text-muted-foreground">Manage faculty information, schedules, and performance</p>
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
          <Button onClick={() => { setEditingTeacher(undefined); setIsFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{teachers.filter(t => t.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">{teachers.filter(t => t.status !== 'Active').length} on leave/inactive</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">15</div>
            <p className="text-xs text-muted-foreground">Years</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <BookOpen className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">45</div>
            <p className="text-xs text-muted-foreground">Scheduled sessions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher List</CardTitle>
          <CardDescription>View and manage all faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teachers by name, ID, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English Literature">English Literature</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="History">History</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {teacher.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{teacher.salary}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.classes.map((cls, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(teacher.status)}>
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => alert('View profile for ' + teacher.name)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(teacher)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => openDeleteDialog(teacher)}>
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
            <DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
            <DialogDescription>
              {editingTeacher ? 'Update the teacher\'s information.' : 'Enter teacher information to create a new profile.'}
            </DialogDescription>
          </DialogHeader>
          <TeacherForm 
            onSubmit={handleFormSubmit} 
            defaultValues={editingTeacher}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingTeacher} onOpenChange={() => setDeletingTeacher(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the record for {deletingTeacher?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingTeacher(undefined)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeachersPage;