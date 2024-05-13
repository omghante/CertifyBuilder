import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardProfile from './components/dashprofile';
import DashboardNewCertificate from './components/dashnewcertificate'; 
import DashboardSidebar from './components/dashsidebar';
import DashboardSetting from './components/dashsetting';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Define nested routes for Dashboard */}
          <Route path="/dashboard/" element={<DashboardSidebar />}>
            <Route path="new" element={<DashboardNewCertificate />} /> 
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="settings" element={<DashboardSetting />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
