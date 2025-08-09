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

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'teacher', 'student', 'parent'] },
  { id: 'students', label: 'Students', icon: Users, roles: ['admin', 'teacher'] },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap, roles: ['admin'] },
  { id: 'classes', label: 'Classes & Timetable', icon: Calendar, roles: ['admin', 'teacher', 'student'] },
  { id: 'assignments', label: 'Assignments', icon: BookOpen, roles: ['admin', 'teacher', 'student'] },
  { id: 'exams', label: 'Exams & Results', icon: FileText, roles: ['admin', 'teacher', 'student', 'parent'] },
  { id: 'fees', label: 'Fees & Payments', icon: DollarSign, roles: ['admin', 'parent'] },
  { id: 'live-classes', label: 'Live Classes', icon: Video, roles: ['admin', 'teacher', 'student'] },
  { id: 'library', label: 'Library', icon: Library, roles: ['admin', 'teacher', 'student'] },
  { id: 'transport', label: 'Transport', icon: Bus, roles: ['admin', 'student', 'parent'] },
  { id: 'hostel', label: 'Hostel', icon: Building, roles: ['admin', 'student', 'parent'] },
  { id: 'events', label: 'Events & Activities', icon: CalendarIcon, roles: ['admin', 'teacher', 'student', 'parent'] },
  { id: 'cms', label: 'Content Management', icon: Globe, roles: ['admin'] },
  { id: 'crm', label: 'CRM & Leads', icon: UserCheck, roles: ['admin'] },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart, roles: ['admin', 'teacher'] },
  { id: 'communication', label: 'Communication', icon: MessageSquare, roles: ['admin', 'teacher', 'student', 'parent'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          const isActive = currentView === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10",
                isActive && "bg-gradient-primary text-primary-foreground shadow-glow",
                isCollapsed && "px-2"
              )}
              onClick={() => onViewChange(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}