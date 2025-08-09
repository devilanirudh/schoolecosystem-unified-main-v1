import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Download,
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';

const mockAssignments = [
  {
    id: 1,
    title: 'Algebra Problem Set 1',
    subject: 'Mathematics',
    class: 'Grade 10A',
    teacher: 'Dr. Michael Johnson',
    dueDate: '2024-12-15',
    status: 'Active',
    submissions: 28,
    totalStudents: 32,
    type: 'Homework',
    points: 20
  },
  {
    id: 2,
    title: 'Shakespeare Essay',
    subject: 'English',
    class: 'Grade 11B', 
    teacher: 'Prof. Sarah Williams',
    dueDate: '2024-12-18',
    status: 'Active',
    submissions: 22,
    totalStudents: 28,
    type: 'Assignment',
    points: 50
  },
  {
    id: 3,
    title: 'Physics Lab Report #3',
    subject: 'Physics',
    class: 'Grade 12A',
    teacher: 'Dr. Robert Chen',
    dueDate: '2024-12-12',
    status: 'Overdue',
    submissions: 18,
    totalStudents: 25,
    type: 'Lab Report',
    points: 30
  }
];

const mockSubmissions = [
  {
    id: 1,
    studentName: 'Emma Johnson',
    assignment: 'Algebra Problem Set 1',
    submittedAt: '2024-12-10 14:30',
    status: 'Submitted',
    grade: null,
    attachments: ['solution.pdf']
  },
  {
    id: 2,
    studentName: 'Michael Chen',
    assignment: 'Algebra Problem Set 1',
    submittedAt: '2024-12-11 09:15',
    status: 'Submitted',
    grade: 18,
    attachments: ['homework_1.pdf', 'calculations.jpg']
  },
  {
    id: 3,
    studentName: 'Sarah Williams',
    assignment: 'Shakespeare Essay',
    submittedAt: '2024-12-09 16:45',
    status: 'Graded',
    grade: 45,
    attachments: ['essay.docx']
  }
];

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAssignments = mockAssignments.filter(assignment => 
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      case 'Overdue': return 'destructive';
      case 'Completed': return 'success';
      default: return 'secondary';
    }
  };

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'default';
      case 'Graded': return 'success';
      case 'Late': return 'warning';
      case 'Missing': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSubmissionProgress = (submissions: number, total: number) => {
    return Math.round((submissions / total) * 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assignment Management</h1>
            <p className="text-muted-foreground">Create, distribute, and grade assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Set up a new assignment for your students
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input id="title" placeholder="Enter assignment title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="class">Class</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grade-10a">Grade 10A</SelectItem>
                          <SelectItem value="grade-10b">Grade 10B</SelectItem>
                          <SelectItem value="grade-11a">Grade 11A</SelectItem>
                          <SelectItem value="grade-11b">Grade 11B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Assignment instructions and requirements" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="points">Points</Label>
                      <Input id="points" type="number" placeholder="20" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type">Assignment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homework">Homework</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="lab-report">Lab Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Save Draft
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Publish Assignment
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">45</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">12</div>
              <p className="text-xs text-muted-foreground">Currently open</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">28</div>
              <p className="text-xs text-muted-foreground">Submissions to grade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Submission Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">86%</div>
              <p className="text-xs text-muted-foreground">On time submissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="assignments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments">
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
                      <SelectItem value="">All Subjects</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
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
                        <TableHead>Points</TableHead>
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
                              <div className="text-sm text-muted-foreground">
                                {assignment.subject} • {assignment.type}
                              </div>
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
                          <TableCell className="font-medium">{assignment.points}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(assignment.status)}>
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
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
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>Review and grade student work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Submitted At</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.studentName}</TableCell>
                          <TableCell>{submission.assignment}</TableCell>
                          <TableCell>{submission.submittedAt}</TableCell>
                          <TableCell>
                            {submission.grade ? (
                              <span className="font-medium">{submission.grade}/20</span>
                            ) : (
                              <span className="text-muted-foreground">Not graded</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getSubmissionStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AssignmentsPage;