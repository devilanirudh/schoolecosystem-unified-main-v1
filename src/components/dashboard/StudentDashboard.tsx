import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  BookOpen, 
  Trophy, 
  Calendar,
  Video,
  FileText,
  Target,
  TrendingUp
} from 'lucide-react';

const mockStudentData = {
  nextClass: { subject: 'Physics', time: '2:00 PM', room: 'Lab 2' },
  assignmentsDue: 3,
  upcomingExams: 2,
  overallGrade: 85,
  attendance: 94
};

const mockAssignments = [
  { id: 1, subject: 'Mathematics', title: 'Calculus Problem Set', due: 'Today', status: 'pending' },
  { id: 2, subject: 'English', title: 'Essay on Shakespeare', due: 'Tomorrow', status: 'in-progress' },
  { id: 3, subject: 'Physics', title: 'Lab Report #3', due: 'Dec 15', status: 'not-started' },
];

const mockRecentGrades = [
  { subject: 'Mathematics', assignment: 'Quiz #5', grade: 92, date: 'Dec 8' },
  { subject: 'Physics', assignment: 'Lab Report #2', grade: 88, date: 'Dec 6' },
  { subject: 'English', assignment: 'Literature Analysis', grade: 95, date: 'Dec 4' },
  { subject: 'Chemistry', assignment: 'Midterm Exam', grade: 89, date: 'Dec 2' },
];

const mockUpcomingClasses = [
  { subject: 'Physics', time: '2:00 PM', room: 'Lab 2', type: 'lab' },
  { subject: 'English Literature', time: '3:30 PM', room: 'Room 15', type: 'lecture' },
  { subject: 'Mathematics', time: '4:45 PM', room: 'Online', type: 'live' },
];

export function StudentDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'in-progress': return 'default';
      case 'not-started': return 'secondary';
      default: return 'secondary';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-primary';
    if (grade >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello, Emma!</h1>
            <p className="text-white/90 text-lg">
              Your next class is {mockStudentData.nextClass.subject} at {mockStudentData.nextClass.time}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Next: {mockStudentData.nextClass.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{mockStudentData.assignmentsDue} assignments due</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block text-center">
            <div className="text-3xl font-bold">{mockStudentData.overallGrade}%</div>
            <div className="text-sm text-white/80">Overall Grade</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <Trophy className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockStudentData.overallGrade}%</div>
            <Progress value={mockStudentData.overallGrade} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockStudentData.attendance}%</div>
            <Progress value={mockStudentData.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockStudentData.assignmentsDue}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{mockStudentData.upcomingExams}</div>
            <p className="text-xs text-muted-foreground mt-1">Next 2 weeks</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Access your learning tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-glow">
              <Video className="h-6 w-6" />
              <span className="text-sm">Join Live Class</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">View Assignments</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Submit Work</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">View Grades</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUpcomingClasses.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{item.subject}</p>
                    <p className="text-xs text-muted-foreground">{item.time} • {item.room}</p>
                  </div>
                </div>
                <Badge variant={item.type === 'live' ? 'default' : 'secondary'}>
                  {item.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Grades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{grade.subject}</p>
                  <p className="text-xs text-muted-foreground">{grade.assignment}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>
                    {grade.grade}%
                  </div>
                  <p className="text-xs text-muted-foreground">{grade.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Assignments Due */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assignments Due
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">{assignment.subject}</p>
                    <p className="text-xs text-muted-foreground">{assignment.title}</p>
                  </div>
                  <Badge variant={getStatusColor(assignment.status)}>
                    {assignment.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Due: {assignment.due}</span>
                  <Button size="sm" variant="outline">
                    {assignment.status === 'not-started' ? 'Start' : 'Continue'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}