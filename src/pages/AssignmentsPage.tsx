import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AssignmentForm } from '@/components/assignments/AssignmentForm';
import { Assignment, AssignmentFormValues } from '@/lib/validators/assignment';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Algebra Problem Set 1',
    subject: 'Mathematics',
    class: 'Grade 10A',
    dueDate: '2024-12-15',
    status: 'Active',
    submissions: 28,
    totalStudents: 32,
    points: 20,
    instructions: 'Complete all problems from chapter 5.'
  },
  {
    id: 2,
    title: 'Shakespeare Essay',
    subject: 'English Literature',
    class: 'Grade 11B', 
    dueDate: '2024-12-18',
    status: 'Active',
    submissions: 22,
    totalStudents: 28,
    points: 50,
    instructions: 'Write a 500-word essay on Hamlet.'
  },
  {
    id: 3,
    title: 'Physics Lab Report #3',
    subject: 'Physics',
    class: 'Grade 12A',
    dueDate: '2024-12-12',
    status: 'Overdue',
    submissions: 18,
    totalStudents: 25,
    points: 30,
    instructions: 'Submit the lab report on motion.'
  }
];

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>(undefined);
  const [deletingAssignment, setDeletingAssignment] = useState<Assignment | undefined>(undefined);
  const { toast } = useToast();

  const filteredAssignments = assignments.filter(assignment => 
    (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.class.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSubject === 'all' || assignment.subject === selectedSubject)
  );

  const handleFormSubmit = (data: AssignmentFormValues) => {
    if (editingAssignment) {
      setAssignments(assignments.map(a => a.id === editingAssignment.id ? { ...editingAssignment, ...data } : a));
      toast({ title: "Assignment Updated", description: `The assignment "${data.title}" has been updated.` });
    } else {
      const newAssignment: Assignment = {
        ...data,
        id: Date.now(),
        status: 'Active',
        submissions: 0,
        totalStudents: 30, // Default value
      };
      setAssignments([...assignments, newAssignment]);
      toast({ title: "Assignment Created", description: `The assignment "${data.title}" has been created.` });
    }
    setIsFormOpen(false);
    setEditingAssignment(undefined);
  };

  const openEditDialog = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (assignment: Assignment) => {
    setDeletingAssignment(assignment);
  };

  const handleDeleteConfirm = () => {
    if (deletingAssignment) {
      setAssignments(assignments.filter(a => a.id !== deletingAssignment.id));
      toast({ title: "Assignment Deleted", description: `The assignment "${deletingAssignment.title}" has been removed.`, variant: 'destructive' });
      setDeletingAssignment(undefined);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      case 'Overdue': return 'destructive';
      case 'Completed': return 'success';
      default: return 'secondary';
    }
  };

  const getSubmissionProgress = (submissions: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((submissions / total) * 100);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assignment Management</h1>
          <p className="text-muted-foreground">Create, distribute, and grade assignments</p>
        </div>
        <Button onClick={() => { setEditingAssignment(undefined); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{assignments.filter(a => a.status === 'Active' || a.status === 'Overdue').length}</div>
            <p className="text-xs text-muted-foreground">Currently open for submission</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">28</div>
            <p className="text-xs text-muted-foreground">Submissions to be graded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Submission Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">86%</div>
            <p className="text-xs text-muted-foreground">On-time submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment List</CardTitle>
          <CardDescription>View and manage all assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assignments by title, subject, or class..."
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
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-muted-foreground">{assignment.subject} • {assignment.points} pts</div>
                      </div>
                    </TableCell>
                    <TableCell>{assignment.class}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {assignment.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          {assignment.submissions}/{assignment.totalStudents}
                        </div>
                        <Progress 
                          value={getSubmissionProgress(assignment.submissions, assignment.totalStudents)} 
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => alert('View submissions for ' + assignment.title)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(assignment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => openDeleteDialog(assignment)}>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}</DialogTitle>
            <DialogDescription>
              {editingAssignment ? 'Update the assignment details.' : 'Set up a new assignment for your students.'}
            </DialogDescription>
          </DialogHeader>
          <AssignmentForm 
            onSubmit={handleFormSubmit} 
            defaultValues={editingAssignment}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingAssignment} onOpenChange={() => setDeletingAssignment(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the assignment "{deletingAssignment?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingAssignment(undefined)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssignmentsPage;