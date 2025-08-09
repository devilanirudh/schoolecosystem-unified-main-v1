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
  Trophy,
  Clock,
  Users,
  FileText,
  Calendar,
  BarChart3
} from 'lucide-react';

const mockExams = [
  {
    id: 1,
    title: 'Mathematics Midterm',
    subject: 'Mathematics',
    class: 'Grade 10A',
    date: '2024-12-20',
    time: '09:00 AM',
    duration: '2 hours',
    totalMarks: 100,
    status: 'Scheduled',
    examType: 'Midterm',
    students: 32,
    completed: 0
  },
  {
    id: 2,
    title: 'English Literature Final',
    subject: 'English',
    class: 'Grade 11B',
    date: '2024-12-18',
    time: '02:00 PM',
    duration: '3 hours',
    totalMarks: 100,
    status: 'Ongoing',
    examType: 'Final',
    students: 28,
    completed: 15
  },
  {
    id: 3,
    title: 'Physics Quiz',
    subject: 'Physics',
    class: 'Grade 12A',
    date: '2024-12-10',
    time: '11:00 AM',
    duration: '1 hour',
    totalMarks: 50,
    status: 'Completed',
    examType: 'Quiz',
    students: 25,
    completed: 25
  }
];

const mockResults = [
  {
    id: 1,
    studentName: 'Emma Johnson',
    rollNo: 'ST001',
    exam: 'Physics Quiz',
    marksObtained: 45,
    totalMarks: 50,
    percentage: 90,
    grade: 'A+',
    status: 'Pass'
  },
  {
    id: 2,
    studentName: 'Michael Chen',
    rollNo: 'ST002',
    exam: 'Physics Quiz',
    marksObtained: 38,
    totalMarks: 50,
    percentage: 76,
    grade: 'B+',
    status: 'Pass'
  },
  {
    id: 3,
    studentName: 'Sarah Williams',
    rollNo: 'ST003',
    exam: 'Physics Quiz',
    marksObtained: 42,
    totalMarks: 50,
    percentage: 84,
    grade: 'A',
    status: 'Pass'
  }
];

const ExamsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredExams = mockExams.filter(exam => 
    (exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.class.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSubject === 'all' || exam.subject.toLowerCase() === selectedSubject.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'default';
      case 'Ongoing': return 'warning';
      case 'Completed': return 'success';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A': return 'text-success';
      case 'B+':
      case 'B': return 'text-primary';
      case 'C+':
      case 'C': return 'text-warning';
      default: return 'text-destructive';
    }
  };

  const getCompletionProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Exam Management</h1>
            <p className="text-muted-foreground">Schedule exams, manage results, and track performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Exam
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Schedule New Exam</DialogTitle>
                  <DialogDescription>
                    Set up a new examination for your students
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Exam Title</Label>
                    <Input id="title" placeholder="Enter exam title" />
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Exam Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Start Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <Input id="duration" type="number" placeholder="2" />
                    </div>
                    <div>
                      <Label htmlFor="totalMarks">Total Marks</Label>
                      <Input id="totalMarks" type="number" placeholder="100" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="examType">Exam Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="midterm">Midterm</SelectItem>
                        <SelectItem value="final">Final Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Special instructions for the exam" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Save Draft
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Schedule Exam
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
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">28</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">5</div>
              <p className="text-xs text-muted-foreground">Next 2 weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">82%</div>
              <p className="text-xs text-muted-foreground">Class average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Results Pending</CardTitle>
              <FileText className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">To be published</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="exams" className="space-y-6">
          <TabsList>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>Exam Schedule</CardTitle>
                <CardDescription>View and manage all scheduled exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search exams by title, subject, or class..."
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
                        <TableHead>Exam</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{exam.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {exam.subject} • {exam.examType} • {exam.totalMarks} marks
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{exam.class}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <div>
                                <div className="text-sm font-medium">{exam.date}</div>
                                <div className="text-xs text-muted-foreground">{exam.time}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{exam.duration}</TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="text-sm font-medium">
                                {exam.completed}/{exam.students} completed
                              </div>
                              <Progress 
                                value={getCompletionProgress(exam.completed, exam.students)} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(exam.status)}>
                              {exam.status}
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
                                <Users className="h-4 w-4" />
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

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Exam Results</CardTitle>
                <CardDescription>View and manage student exam results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{result.studentName}</div>
                              <div className="text-sm text-muted-foreground">{result.rollNo}</div>
                            </div>
                          </TableCell>
                          <TableCell>{result.exam}</TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {result.marksObtained}/{result.totalMarks}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.percentage}%</span>
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${result.percentage}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`font-bold ${getGradeColor(result.grade)}`}>
                              {result.grade}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={result.status === 'Pass' ? 'success' : 'destructive'}>
                              {result.status}
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

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Class performance statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Score</span>
                      <span className="font-bold">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pass Rate</span>
                      <span className="font-bold">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">A Grade Students</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Grade breakdown for recent exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">A+ (90-100%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-success h-2 rounded-full w-8" />
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">A (80-89%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-12" />
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">B (70-79%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-warning h-2 rounded-full w-10" />
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">C (60-69%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full w-4" />
                        </div>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Below C (&lt;60%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-destructive h-2 rounded-full w-1" />
                        </div>
                        <span className="text-sm font-medium">2%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ExamsPage;