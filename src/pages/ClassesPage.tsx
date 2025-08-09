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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Clock,
  Users,
  BookOpen,
  Calendar,
  GraduationCap
} from 'lucide-react';

const mockClasses = [
  {
    id: 1,
    name: 'Grade 10A',
    section: 'A',
    grade: '10',
    teacher: 'Dr. Michael Johnson',
    subject: 'Mathematics',
    students: 32,
    capacity: 35,
    room: 'Room 101',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Grade 10B',
    section: 'B', 
    grade: '10',
    teacher: 'Prof. Sarah Williams',
    subject: 'English Literature',
    students: 28,
    capacity: 30,
    room: 'Room 102',
    schedule: 'Tue, Thu - 10:30 AM',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Grade 11A',
    section: 'A',
    grade: '11',
    teacher: 'Dr. Robert Chen',
    subject: 'Physics',
    students: 25,
    capacity: 30,
    room: 'Lab 201',
    schedule: 'Mon, Wed, Fri - 2:00 PM',
    status: 'Active'
  }
];

const mockTimetable = [
  {
    time: '9:00 AM',
    monday: 'Math - 10A',
    tuesday: 'English - 10B',
    wednesday: 'Math - 10A',
    thursday: 'Chemistry - 11A',
    friday: 'Physics - 11B'
  },
  {
    time: '10:30 AM',
    monday: 'Physics - 11A',
    tuesday: 'History - 10A',
    wednesday: 'Biology - 11B',
    thursday: 'English - 10B',
    friday: 'Math - 10A'
  },
  {
    time: '12:00 PM',
    monday: 'Break',
    tuesday: 'Break',
    wednesday: 'Break',
    thursday: 'Break',
    friday: 'Break'
  },
  {
    time: '2:00 PM',
    monday: 'Chemistry - 11A',
    tuesday: 'Math - 11B',
    wednesday: 'Physics - 11A',
    thursday: 'Biology - 10A',
    friday: 'English - 11A'
  }
];

const ClassesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredClasses = mockClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'secondary';
      case 'Suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getCapacityColor = (students: number, capacity: number) => {
    const percentage = (students / capacity) * 100;
    if (percentage >= 90) return 'text-destructive';
    if (percentage >= 80) return 'text-warning';
    return 'text-success';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Class Management</h1>
            <p className="text-muted-foreground">Manage classes, schedules, and timetables</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>
                    Create a new class section
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="grade">Grade</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="section">Section</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="teacher">Class Teacher</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="michael">Dr. Michael Johnson</SelectItem>
                        <SelectItem value="sarah">Prof. Sarah Williams</SelectItem>
                        <SelectItem value="robert">Dr. Robert Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="room">Room</Label>
                    <Input id="room" placeholder="e.g., Room 101" />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="30" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Add Class
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
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">Across all grades</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">8</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Class Size</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">28</div>
              <p className="text-xs text-muted-foreground">Students per class</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization</CardTitle>
              <GraduationCap className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">85%</div>
              <p className="text-xs text-muted-foreground">Room capacity</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Class List</CardTitle>
                <CardDescription>View and manage all class sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search classes by name, teacher, or subject..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Grades</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Enrollment</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClasses.map((cls) => (
                        <TableRow key={cls.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{cls.name}</div>
                              <div className="text-sm text-muted-foreground">{cls.subject}</div>
                            </div>
                          </TableCell>
                          <TableCell>{cls.teacher}</TableCell>
                          <TableCell>{cls.room}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${getCapacityColor(cls.students, cls.capacity)}`}>
                                {cls.students}/{cls.capacity}
                              </span>
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{cls.schedule}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(cls.status)}>
                              {cls.status}
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
                                <Clock className="h-4 w-4" />
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

          <TabsContent value="timetable">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Timetable</CardTitle>
                <CardDescription>View and manage class schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">Time</TableHead>
                        <TableHead>Monday</TableHead>
                        <TableHead>Tuesday</TableHead>
                        <TableHead>Wednesday</TableHead>
                        <TableHead>Thursday</TableHead>
                        <TableHead>Friday</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTimetable.map((slot, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{slot.time}</TableCell>
                          <TableCell>
                            <Badge variant={slot.monday === 'Break' ? 'secondary' : 'outline'}>
                              {slot.monday}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={slot.tuesday === 'Break' ? 'secondary' : 'outline'}>
                              {slot.tuesday}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={slot.wednesday === 'Break' ? 'secondary' : 'outline'}>
                              {slot.wednesday}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={slot.thursday === 'Break' ? 'secondary' : 'outline'}>
                              {slot.thursday}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={slot.friday === 'Break' ? 'secondary' : 'outline'}>
                              {slot.friday}
                            </Badge>
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

export default ClassesPage;