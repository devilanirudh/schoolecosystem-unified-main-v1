import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  FileText, 
  DollarSign,
  Video,
  Library,
  Bus,
  Building,
  Calendar as CalendarIcon,
  Globe,
  UserCheck,
  BarChart,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { UserRole } from '@/lib/auth';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'teacher', 'student', 'parent'], path: '/' },
  { id: 'students', label: 'Students', icon: Users, roles: ['admin', 'teacher'], path: '/students' },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap, roles: ['admin'], path: '/teachers' },
  { id: 'classes', label: 'Classes & Timetable', icon: Calendar, roles: ['admin', 'teacher', 'student'], path: '/classes' },
  { id: 'assignments', label: 'Assignments', icon: BookOpen, roles: ['admin', 'teacher', 'student'], path: '/assignments' },
  { id: 'exams', label: 'Exams & Results', icon: FileText, roles: ['admin', 'teacher', 'student', 'parent'], path: '/exams' },
  { id: 'fees', label: 'Fees & Payments', icon: DollarSign, roles: ['admin', 'parent'], path: '/fees' },
  { id: 'live-classes', label: 'Live Classes', icon: Video, roles: ['admin', 'teacher', 'student'], path: '/live-classes' },
  { id: 'library', label: 'Library', icon: Library, roles: ['admin', 'teacher', 'student'], path: '/library' },
  { id: 'transport', label: 'Transport', icon: Bus, roles: ['admin', 'student', 'parent'], path: '/transport' },
  { id: 'hostel', label: 'Hostel', icon: Building, roles: ['admin', 'student', 'parent'], path: '/hostel' },
  { id: 'events', label: 'Events & Activities', icon: CalendarIcon, roles: ['admin', 'teacher', 'student', 'parent'], path: '/events' },
  { id: 'cms', label: 'Content Management', icon: Globe, roles: ['admin'], path: '/cms' },
  { id: 'crm', label: 'CRM & Leads', icon: UserCheck, roles: ['admin'], path: '/crm' },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart, roles: ['admin', 'teacher'], path: '/reports' },
  { id: 'communication', label: 'Communication', icon: MessageSquare, roles: ['admin', 'teacher', 'student', 'parent'], path: '/communication' },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'], path: '/settings' },
];

export function Sidebar() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role as UserRole)
  );

  return (
    <div className={cn(
      "h-full bg-card border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Collapse toggle */}
      <div className="flex justify-end p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? 
            <ChevronRight className="h-4 w-4" /> : 
            <ChevronLeft className="h-4 w-4" />
          }
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10",
                isActive && "bg-gradient-primary text-primary-foreground shadow-glow",
                isCollapsed && "px-2"
              )}
              asChild
            >
              <Link to={item.path} title={isCollapsed ? item.label : undefined}>
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}