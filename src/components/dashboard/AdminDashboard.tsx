import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Video,
  UserPlus,
  BookOpen,
  Bell,
  BarChart3
} from 'lucide-react';

const mockStats = {
  totalStudents: 1248,
  totalTeachers: 89,
  totalParents: 956,
  totalPayments: 125400,
  activeClasses: 12,
  liveClassesToday: 8,
  activeLeads: 34,
  pendingExams: 5
};

const mockRecentActivities = [
  { id: 1, type: 'admission', message: 'New student admission: Emma Johnson', time: '2 hours ago' },
  { id: 2, type: 'payment', message: 'Fee payment received from David Chen', time: '4 hours ago' },
  { id: 3, type: 'class', message: 'Live class started: Mathematics Grade 10', time: '6 hours ago' },
  { id: 4, type: 'lead', message: 'New inquiry from Sarah Williams', time: '8 hours ago' },
];

const mockUpcomingEvents = [
  { id: 1, title: 'Parent-Teacher Conference', date: 'Today, 3:00 PM', type: 'meeting' },
  { id: 2, title: 'Science Fair Preparation', date: 'Tomorrow, 10:00 AM', type: 'event' },
  { id: 3, title: 'Board Meeting', date: 'Dec 15, 2:00 PM', type: 'meeting' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-hero text-white rounded-2xl p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
            <p className="text-white/90 text-lg">
              Here's what's happening at your school today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockStats.liveClassesToday}</div>
              <div className="text-sm text-white/80">Live Classes Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockStats.activeLeads}</div>
              <div className="text-sm text-white/80">Active Leads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{mockStats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active faculty members</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${mockStats.totalPayments.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <Video className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockStats.activeClasses}</div>
            <p className="text-xs text-muted-foreground mt-1">Live sessions today</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2 bg-gradient-primary hover:shadow-glow">
              <UserPlus className="h-6 w-6" />
              <span className="text-sm">Add Student</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-sm">Add Teacher</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Class</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUpcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <Badge variant={event.type === 'meeting' ? 'default' : 'secondary'}>
                  {event.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}