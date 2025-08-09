import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExamForm } from '@/components/exams/ExamForm';
import { Exam, ExamFormValues } from '@/lib/validators/exam';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Trophy,
  Clock,
  FileText,
  Calendar
} from 'lucide-react';

const initialExams: Exam[] = [
  {
    id: 1,
    title: 'Mathematics Midterm',
    subject: 'Mathematics',
    class: 'Grade 10A',
    date: '2024-12-20',
    time: '09:00',
    duration: '2 hours',
    totalMarks: 100,
    status: 'Scheduled',
  },
  {
    id: 2,
    title: 'English Literature Final',
    subject: 'English Literature',
    class: 'Grade 11B',
    date: '2024-12-18',
    time: '14:00',
    duration: '3 hours',
    totalMarks: 100,
    status: 'Completed',
  },
];

const ExamsPage = () => {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | undefined>(undefined);
  const [deletingExam, setDeletingExam] = useState<Exam | undefined>(undefined);
  const { toast } = useToast();

  const handleFormSubmit = (data: ExamFormValues) => {
    if (editingExam) {
      setExams(exams.map(e => e.id === editingExam.id ? { ...editingExam, ...data } : e));
      toast({ title: "Exam Updated", description: `The exam "${data.title}" has been updated.` });
    } else {
      const newExam: Exam = { ...data, id: Date.now(), status: 'Scheduled' };
      setExams([...exams, newExam]);
      toast({ title: "Exam Scheduled", description: `The exam "${data.title}" has been scheduled.` });
    }
    setIsFormOpen(false);
    setEditingExam(undefined);
  };

  const openEditDialog = (exam: Exam) => {
    setEditingExam(exam);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (exam: Exam) => {
    setDeletingExam(exam);
  };

  const handleDeleteConfirm = () => {
    if (deletingExam) {
      setExams(exams.filter(e => e.id !== deletingExam.id));
      toast({ title: "Exam Deleted", description: `The exam "${deletingExam.title}" has been removed.`, variant: 'destructive' });
      setDeletingExam(undefined);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'default';
      case 'Ongoing': return 'warning';
      case 'Completed': return 'success';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exam Management</h1>
          <p className="text-muted-foreground">Schedule exams, manage results, and track performance</p>
        </div>
        <Button onClick={() => { setEditingExam(undefined); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Exam
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{exams.filter(e => e.status === 'Scheduled').length}</div>
            <p className="text-xs text-muted-foreground">In the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Results Pending</CardTitle>
            <FileText className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Exams to be graded</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Schedule</CardTitle>
          <CardDescription>View and manage all scheduled exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{exam.title}</div>
                        <div className="text-sm text-muted-foreground">{exam.subject} • {exam.totalMarks} marks</div>
                      </div>
                    </TableCell>
                    <TableCell>{exam.class}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {exam.date} at {exam.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(exam.status)}>{exam.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(exam)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => openDeleteDialog(exam)}><Trash2 className="h-4 w-4" /></Button>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingExam ? 'Edit Exam' : 'Schedule New Exam'}</DialogTitle>
            <DialogDescription>
              {editingExam ? 'Update the exam details.' : 'Set up a new examination for your students.'}
            </DialogDescription>
          </DialogHeader>
          <ExamForm 
            onSubmit={handleFormSubmit} 
            defaultValues={editingExam}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingExam} onOpenChange={() => setDeletingExam(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the exam "{deletingExam?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingExam(undefined)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamsPage;