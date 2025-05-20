import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import PageContainer from './PageContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

function App() {
  return (
    <Router>
      <div className="d-flex">
        <SideBar user={user} />
        <main className="flex-grow-1 bg-light min-vh-100">
          <Routes>
            <Route path="/" element={<PageContainer title="Dashboard" description="Welcome to your dashboard" />} />
            <Route path="/team" element={<PageContainer title="Team" description="Manage your team members" />} />
            <Route path="/calendar" element={<PageContainer title="Calendar" description="View and manage your schedule" />} />
            <Route path="/messages" element={<PageContainer title="Messages" description="Your communication center" />} />
            <Route path="/settings" element={<PageContainer title="Settings" description="Configure your preferences" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;