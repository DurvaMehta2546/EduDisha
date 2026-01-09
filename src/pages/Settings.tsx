import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  LogOut,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Manage your account preferences and notifications"
    >
      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Profile Settings</h3>
              <p className="text-sm text-muted-foreground">Update your personal information</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-gradient text-primary-foreground text-2xl font-bold">
              RS
            </div>
            <div>
              <Button variant="outline" size="sm">Change Photo</Button>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Raj Sharma" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="raj.sharma@gmail.com" disabled className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Input id="branch" defaultValue="Computer Engineering" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Input id="semester" defaultValue="5" className="mt-1.5" />
            </div>
          </div>

          <Button className="mt-6">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Notification Settings */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Email Notifications", description: "Receive email updates for important events", defaultChecked: true },
              { label: "Session Reminders", description: "Get notified before skill exchange sessions", defaultChecked: true },
              { label: "Scholarship Alerts", description: "Alerts for new scholarships and deadlines", defaultChecked: true },
              { label: "Exam Reminders", description: "Reminders for upcoming examinations", defaultChecked: true },
              { label: "Marketing Emails", description: "Updates about new features and tips", defaultChecked: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked={item.defaultChecked} />
              </div>
            ))}
          </div>
        </div>

        {/* Connected Services */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Connected Services</h3>
              <p className="text-sm text-muted-foreground">Manage your connected Google services</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Google Account", status: "Connected", connected: true },
              { label: "Google Drive", status: "Connected - Notes Storage", connected: true },
              { label: "Google Calendar", status: "Connected - Reminders", connected: true },
            ].map((service) => (
              <div key={service.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{service.label}</p>
                  <p className="text-sm text-success">{service.status}</p>
                </div>
                <Button variant="outline" size="sm">
                  {service.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <h3 className="font-display font-semibold text-destructive mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
