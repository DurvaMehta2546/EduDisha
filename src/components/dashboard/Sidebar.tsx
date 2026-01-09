import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Award, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Academics", path: "/academics" },
  { icon: Users, label: "Skill Exchange", path: "/skills" },
  { icon: Award, label: "Scholarships", path: "/scholarships" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient flex-shrink-0">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-bold">EduDisha</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground flex-shrink-0">
              <span className="text-sm font-semibold">RS</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.branch || 'Student'}
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              "mt-4 w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center px-0"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
