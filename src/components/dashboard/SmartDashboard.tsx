import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";

const SmartDashboard = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <Dashboard />;
};

export default SmartDashboard;