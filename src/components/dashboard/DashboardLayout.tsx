import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AdminDashboard } from './AdminDashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentDashboard } from './StudentDashboard';
import { ParentDashboard } from './ParentDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export function DashboardLayout() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  const renderDashboard = () => {
    if (currentView !== 'dashboard') {
      return (
        <Card className="h-full flex items-center justify-center">
          <CardContent className="text-center space-y-4">
            <Construction className="h-16 w-16 text-muted-foreground mx-auto" />
            <CardHeader>
              <CardTitle className="text-2xl">Coming Soon</CardTitle>
            </CardHeader>
            <p className="text-muted-foreground">
              This section is under development and will be available soon.
            </p>
          </CardContent>
        </Card>
      );
    }

    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  );
}