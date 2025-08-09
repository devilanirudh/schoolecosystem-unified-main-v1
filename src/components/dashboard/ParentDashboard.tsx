import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Bell,
  MessageSquare,
  FileText,
  Clock
} from 'lucide-react';

const mockParentData = {
  children: [
    { 
      id: 1, 
      name: 'Emma Wilson', 
      grade: 'Grade 10', 
      overallGrade: 85, 
      attendance: 94,
      nextClass: 'Physics at 2:00 PM'
    }
  ],
  outstandingFees: 2500,
  upcomingEvents: 3,
  unreadMessages: 5
};

const mockRecentActivities = [
  { id: 1, type: 'grade', message: 'Mathematics Quiz #5 - 92%', time: '2 hours ago', student: 'Emma Wilson' },
  { id: 2, type: 'attendance', message: 'Present in all classes today', time: '4 hours ago', student: 'Emma Wilson' },
  { id: 3, type: 'assignment', message: 'Submitted Physics Lab Report', time: '1 day ago', student: 'Emma Wilson' },
  { id: 4, type: 'announcement', message: 'Parent-Teacher Conference scheduled', time: '2 days ago', student: 'Emma Wilson' },
];

const mockUpcomingEvents = [
  { id: 1, title: 'Parent-Teacher Conference', date: 'Dec 15, 3:00 PM', type: 'meeting' },
  { id: 2, title: 'Science Fair', date: 'Dec 18, 10:00 AM', type: 'event' },
  { id: 3, title: 'Winter Break Begins', date: 'Dec 20', type: 'holiday' },
];

const mockFeeDetails = [
  { description: 'Tuition Fee - December', amount: 1500, due: 'Dec 15', status: 'pending' },
  { description: 'Library Fee', amount: 200, due: 'Dec 10', status: 'overdue' },
  { description: 'Transportation Fee', amount: 800, due: 'Dec 20', status: 'pending' },
];

export function ParentDashboard() {
  const child = mockParentData.children[0]; // For demo, showing first child

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'destructive';
      case 'pending': return 'warning';
      case 'paid': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, David!</h1>
            <p className="text-white/90 text-lg">
              Here's how {child.name} is doing today.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{child.grade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Next: {child.nextClass}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{child.overallGrade}%</div>
              <div className="text-sm text-white/80">Overall Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{child.attendance}%</div>
              <div className="text-sm text-white/80">Attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Child Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {child.name} - Academic Overview
          </CardTitle>
          <CardDescription>{child.grade} • Student Performance Metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Grade</span>
                <span className="text-sm text-success font-semibold">{child.overallGrade}%</span>
              </div>
              <Progress value={child.overallGrade} className="h-2" />
              <p className="text-xs text-muted-foreground">Excellent performance</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Attendance</span>
                <span className="text-sm text-primary font-semibold">{child.attendance}%</span>
              </div>
              <Progress value={child.attendance} className="h-2" />
              <p className="text-xs text-muted-foreground">Above average</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Assignment Completion</span>
                <span className="text-sm text-accent font-semibold">89%</span>
              </div>
              <Progress value={89} className="h-2" />
              <p className="text-xs text-muted-foreground">On track</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${mockParentData.outstandingFees}</div>
            <p className="text-xs text-muted-foreground mt-1">Due this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockParentData.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{mockParentData.unreadMessages}</div>
            <p className="text-xs text-muted-foreground mt-1">From teachers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grade Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+5%</div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently used parent tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-glow">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Pay Fees</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Message Teacher</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Meeting</span>
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

        {/* Fee Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Fee Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockFeeDetails.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{fee.description}</p>
                  <p className="text-xs text-muted-foreground">Due: {fee.due}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${fee.amount}</div>
                  <Badge variant={getStatusColor(fee.status)}>
                    {fee.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockUpcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant={event.type === 'meeting' ? 'default' : 'secondary'}>
                    {event.type}
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}