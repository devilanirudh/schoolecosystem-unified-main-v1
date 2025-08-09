# AI Development Rules for EduConnect

This document provides guidelines for the AI developer to ensure consistency, maintainability, and adherence to the project's architecture.

## Tech Stack

This project is a modern web application built with the following technologies:

*   **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for a fast development experience.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for a comprehensive, accessible, and customizable component library.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework.
*   **Routing**: [React Router](https://reactrouter.com/) for client-side routing.
*   **State Management**: A combination of [TanStack Query (React Query)](https://tanstack.com/query/latest) for server state and React Context API for global UI state.
*   **Forms**: [React Hook Form](https://react-hook-form.com/) for performant and flexible form handling, paired with [Zod](https://zod.dev/) for schema validation.
*   **Icons**: [Lucide React](https://lucide.dev/) for a consistent and clean set of icons.
*   **Charts**: [Recharts](https://recharts.org/) for data visualization.

## Library Usage and Coding Conventions

### 1. Component Development

*   **Primary Library**: **ALWAYS** use components from `shadcn/ui` located in `@/components/ui`.
*   **Custom Components**: If a required component is not available in `shadcn/ui`, create a new reusable component in `src/components/`. These new components should be styled with Tailwind CSS and follow the existing project's coding style.
*   **Component Structure**: Keep components small and focused. Create new files for new components. Do not add multiple components to a single file.

### 2. Styling

*   **Primary Method**: **ALWAYS** use Tailwind CSS utility classes for styling.
*   **CSS Files**: Avoid writing custom CSS in `.css` files. The `src/index.css` file is reserved for defining base styles, Tailwind layers, and CSS variables for the design system.
*   **Responsiveness**: All components and layouts **MUST** be responsive and work well on all screen sizes, from mobile to desktop.

### 3. State Management

*   **Server State**: For any data fetching, caching, or synchronization with a server, **ALWAYS** use `@tanstack/react-query`.
*   **Global UI State**: For cross-component state that is not server data (e.g., authentication status, theme), use the React Context API. See `src/contexts/AuthContext.tsx` for an example.
*   **Local State**: For state that is confined to a single component, use the `useState` or `useReducer` hooks.

### 4. Routing

*   **Library**: **ALWAYS** use `react-router-dom` for navigation.
*   **Route Definitions**: All application routes are defined in `src/App.tsx`. When adding a new page, add its route to this file.

### 5. Forms

*   **Library**: **ALWAYS** use `react-hook-form` for building forms.
*   **Validation**: **ALWAYS** use `zod` to define validation schemas for forms. Integrate it with `react-hook-form` using `@hookform/resolvers/zod`.

### 6. Icons

*   **Library**: **ALWAYS** use icons from the `lucide-react` package to ensure visual consistency.

### 7. Charts and Data Visualization

*   **Library**: **ALWAYS** use `recharts` for creating charts and graphs.

### 8. File and Directory Structure

Adhere to the existing file structure:

*   `src/pages/`: For top-level page components, each corresponding to a route.
*   `src/components/`: For reusable components.
    *   `src/components/layout/`: For layout components like `Header` and `Sidebar`.
    *   `src/components/dashboard/`: For components specific to the dashboard views.
    *   `src/components/ui/`: For base UI components from `shadcn/ui`. **DO NOT MODIFY THESE.**
*   `src/contexts/`: For React Context providers.
*   `src/hooks/`: For custom React hooks.
*   `src/lib/`: For utility functions, type definitions, and helper modules (e.g., `utils.ts`, `auth.ts`).