import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  AlertTriangle,
  Activity
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      subtitle={`Welcome back, ${user?.name}! Here's your platform overview.`}
    >
      {/* Admin Badge */}
      <div className="mb-6">
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
          <Shield className="h-3 w-3 mr-1" />
          Administrator Access
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Users"
          value={1247}
          subtitle="Active Students"
          icon={<Users className="h-5 w-5" />}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Scholarships"
          value={20}
          subtitle="Active Programs"
          icon={<Award className="h-5 w-5" />}
          variant="secondary"
        />
        <StatsCard
          title="Study Materials"
          value={342}
          subtitle="Uploaded This Month"
          icon={<BookOpen className="h-5 w-5" />}
          variant="accent"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Platform Health"
          value="99.9%"
          subtitle="Uptime"
          icon={<Activity className="h-5 w-5" />}
          variant="primary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  action: "New user registration",
                  user: "Aryan Patel",
                  time: "2 minutes ago",
                  type: "user"
                },
                {
                  action: "Scholarship application submitted",
                  user: "Priya Sharma",
                  time: "15 minutes ago",
                  type: "scholarship"
                },
                {
                  action: "Study material uploaded",
                  user: "Raj Kumar",
                  time: "1 hour ago",
                  type: "content"
                },
                {
                  action: "Skill exchange session completed",
                  user: "Neha Singh",
                  time: "2 hours ago",
                  type: "session"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {activity.type === 'user' && <UserCheck className="h-4 w-4 text-primary" />}
                    {activity.type === 'scholarship' && <Award className="h-4 w-4 text-accent" />}
                    {activity.type === 'content' && <BookOpen className="h-4 w-4 text-secondary" />}
                    {activity.type === 'session' && <Users className="h-4 w-4 text-success" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* User Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-foreground">
                User Management
              </h3>
              <Button variant="outline" size="sm">
                View All Users
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">New Registrations</span>
                </div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">This week</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="font-medium">Active Users</span>
                </div>
                <p className="text-2xl font-bold text-foreground">892</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Users className="h-4 w-4" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Award className="h-4 w-4" />
                Add Scholarship
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <BookOpen className="h-4 w-4" />
                Content Moderation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Settings className="h-4 w-4" />
                System Settings
              </Button>
            </div>
          </Card>

          {/* System Alerts */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              System Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Server Maintenance</p>
                  <p className="text-xs text-muted-foreground">Scheduled for tonight at 2 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/30">
                <Activity className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">All Systems Operational</p>
                  <p className="text-xs text-muted-foreground">No issues detected</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Platform Stats */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Platform Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="text-sm font-medium">2.4 GB / 10 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">API Calls Today</span>
                <span className="text-sm font-medium">12,847</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '64%' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;