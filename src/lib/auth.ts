export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Mock authentication - in a real app, this would connect to your backend
export class AuthService {
  private currentUser: User | null = null;

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock users for demonstration
        const mockUsers: Record<string, User> = {
          'admin@school.edu': {
            id: '1',
            name: 'Sarah Johnson',
            email: 'admin@school.edu',
            role: 'admin'
          },
          'teacher@school.edu': {
            id: '2',
            name: 'Michael Chen',
            email: 'teacher@school.edu',
            role: 'teacher'
          },
          'student@school.edu': {
            id: '3',
            name: 'Emma Wilson',
            email: 'student@school.edu',
            role: 'student'
          },
          'parent@school.edu': {
            id: '4',
            name: 'David Brown',
            email: 'parent@school.edu',
            role: 'parent'
          }
        };

        const user = mockUsers[email];
        if (user && password === 'demo123') {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = new AuthService();