# AdminDash - User Management & Analytics Dashboard

A modern, responsive Admin Dashboard built with **React 19**, **TypeScript**, and **Tailwind CSS**. 

This project was developed as a Frontend Engineer Assessment Task. It features a clean architecture, reusable component library, deterministic mock data, and full dark mode support.

## 🚀 Features & Requirements Implemented

### 1. User List Module (`/users`)
*   **Data Grid**: Responsive table displaying user avatars, names, emails, roles, and status.
*   **Pagination**: Client-side pagination logic (7 items per page).
*   **Advanced Filtering**:
    *   **Search**: Real-time text search filtering by Name or Email.
    *   **Status Filter**: Dropdown to toggle between All, Active, and Inactive users.
*   **Sorting**:
    *   Sort by **Name** (Alphabetical).
    *   Sort by **Created Date** (Newest/Oldest).

### 2. User Details Module (`/users/:id`)
*   **Profile View**: Rich user card showing role, location, and metadata.
*   **Activity Timeline**: Visual history of the user's recent actions (mocked).
*   **Edit Functionality**: 
    *   Modal-based editing for Name and Status.
    *   **Optimistic UI/State**: Updates reflect immediately across the app (List view updates instantly).
    *   **Validation**: Prevents saving empty names.

### 3. Analytics Module (`/analytics`)
*   **Visualization**: Interactive charts using **Recharts**.
    *   **Line Chart**: User Signup Trends (Last 7 Days).
    *   **Pie Chart**: Active vs. Inactive User distribution.
*   **KPI Cards**: Summary metrics for Total Users and Active Ratio.

### 🌟 Bonus Features (Optional Requirements Met)
*   **✅ TypeScript**: Entire codebase typed with Interfaces for Users, ActivityLogs, and Component Props.
*   **✅ Dark Mode**: Fully implemented theme toggle (persisted in global state) using Tailwind's `dark:` classes.
*   **✅ Folder Architecture**: Professional structure separating `components/ui` (atoms), `features/pages`, `context`, and `hooks`.
*   **✅ Form Validation**: Input validation logic in the Edit User modal.
*   **✅ Responsive Design**: Mobile-first approach with a collapsible sidebar drawer for smaller screens.
*   **✅ Custom UI Library**: Built reusable `Card`, `Button`, `Badge`, and `Modal` components to ensure design consistency.

---

## 🛠 Tech Stack

*   **Framework**: React 19
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM (HashRouter)
*   **State Management**: React Context API + useReducer
*   **Charts**: Recharts
*   **Icons**: Custom SVG Components (No heavy icon libraries)

---

## 📦 Installation & Setup

This project assumes a standard Node.js environment.

### Prerequisites
*   Node.js (v16+)
*   npm or yarn

### Steps to Run

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shreyan11111-creator/admin_dash_frontend/
    cd admindash
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## 🏗 Architecture & Design Decisions

### State Management
I chose **React Context API** combined with `useReducer` instead of Redux.
*   *Reasoning*: For an app of this scope, Redux is boilerplate-heavy. Context provides sufficient global state access (User List, Theme) without the overhead, while `useReducer` keeps state logic testable and organized.

### CSS Strategy
I used **Tailwind CSS**.
*   *Reasoning*: It allows for rapid prototyping, guarantees consistency via utility classes, and makes implementing Dark Mode (`dark:`) extremely efficient.

### Performance
*   **`useMemo`**: Used in `UserList.tsx` to memoize filtering and sorting logic, preventing recalculations on every render unless dependencies change.
*   **SVG Icons**: Instead of importing a large library like FontAwesome, I created a lightweight `Icons.tsx` file to include only the SVGs needed, reducing bundle size.

### Component Structure
*   `components/ui/`: Contains "dumb" presentational components (`Button`, `Card`, `Badge`).
*   `components/Layout.tsx`: Handles the persistent Sidebar and Header shell.
*   `pages/`: Contains the specific view logic.
*   `context/`: Contains the global state provider.

---

## 📸 Mock Data
The application uses a deterministic data generator (`constants.ts`) to create a realistic list of 20 users and associated activity logs every time the app loads, ensuring a populated UI for testing.
