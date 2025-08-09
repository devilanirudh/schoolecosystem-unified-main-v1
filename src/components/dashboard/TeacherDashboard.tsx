import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  BookOpen, 
  Users, 
  Calendar,
  Video,
  FileText,
  Bell,
  CheckCircle
} from 'lucide-react';

const mockTeacherData = {
  todaysClasses: 4,
  assignmentsToGrade: 12,
  totalStudents: 156,
  upcomingLiveClasses: 2
};

const mockTodaySchedule = [
  { id: 1, subject: 'Mathematics', class: 'Grade 10A', time: '9:00 AM - 10:00 AM', status: 'completed' },
  { id: 2, subject: 'Mathematics', class: 'Grade 10B', time: '10:15 AM - 11:15 AM', status: 'completed' },
  { id: 3, subject: 'Advanced Math', class: 'Grade 12', time: '2:00 PM - 3:00 PM', status: 'upcoming' },
  { id: 4, subject: 'Mathematics', class: 'Grade 9A', time: '3:30 PM - 4:30 PM', status: 'upcoming' },
];

const mockAssignments = [
  { id: 1, title: 'Algebra Practice Set 1', class: 'Grade 10A', submissions: 28, total: 32, due: 'Today' },
  { id: 2, title: 'Geometry Problems', class: 'Grade 10B', submissions: 25, total: 30, due: 'Yesterday' },
  { id: 3, title: 'Calculus Worksheet', class: 'Grade 12', submissions: 18, total: 22, due: '2 days ago' },
];

export function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-accent text-white rounded-2xl p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good morning, Michael!</h1>
            <p className="text-white/90 text-lg">
              You have {mockTodaySchedule.filter(c => c.status === 'upcoming').length} classes remaining today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockTeacherData.assignmentsToGrade}</div>
              <div className="text-sm text-white/80">To Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockTeacherData.upcomingLiveClasses}</div>
              <div className="text-sm text-white/80">Live Classes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockTeacherData.todaysClasses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockTodaySchedule.filter(c => c.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments to Grade</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockTeacherData.assignmentsToGrade}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending submissions</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{mockTeacherData.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Classes</CardTitle>
            <Video className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockTeacherData.upcomingLiveClasses}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled today</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Commonly used teaching tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2 bg-gradient-accent hover:shadow-glow">
              <Video className="h-6 w-6" />
              <span className="text-sm">Start Live Class</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Create Assignment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Grade Papers</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="h-6 w-6" />
              <span className="text-sm">Send Announcement</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTodaySchedule.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{item.subject} - {item.class}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <Badge variant={item.status === 'completed' ? 'secondary' : 'default'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assignments to Grade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Assignments to Grade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAssignments.map((assignment) => (
              <div key={assignment.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.class}</p>
                  </div>
                  <Badge variant={assignment.due === 'Today' ? 'destructive' : 'secondary'}>
                    Due {assignment.due}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {assignment.submissions}/{assignment.total} submitted
                  </span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}