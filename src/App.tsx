import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RootLayout from './layouts/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './admin/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import LearnMore from './pages/LearnMore';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';


// User Protected Pages
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ServiceDetail from './pages/ServiceDetail';

// Admin Pages
import AdminAuthPage from './admin/login';
import AdminServicesPage from './admin/dashboard';
import AddEditServicePage from './admin/add-editService';
import ClientPage from './admin/client';
import Settings from './admin/settings';
import Plan from './admin/plan';
import EditPlanPage from './admin/edit-plan';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>  
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Auth />} />
          <Route path="learn-more" element={<LearnMore />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="refund" element={<Refund />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Authenticated User Routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="services/:platform"
            element={
              <ProtectedRoute>
                <ServiceDetail />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="admin">
            {/* Admin Login */}
            <Route path="login" element={<AdminAuthPage />} />

            {/* Protected Admin Dashboard */}
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<AdminServicesPage />} />
              <Route path = "add-editService" element={<AddEditServicePage />}/>
              <Route path='client' element={<ClientPage />} />
              <Route path='settings' element={<Settings />} />
              <Route path='plan' element={<Plan />} />
              <Route path="edit-plan/:planId" element={<EditPlanPage />} />

            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
