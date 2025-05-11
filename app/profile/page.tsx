"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AppLayout } from "@/components/app-layout"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, User, Settings, Shield, Key, Upload } from "lucide-react"

// Mock user data
const mockUser = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=128&width=128",
  role: "Project Manager",
  department: "Engineering",
  location: "San Francisco, CA",
  timezone: "Pacific Time (PT)",
  bio: "Experienced project manager with a background in software development. Passionate about building great products and leading high-performing teams.",
  skills: ["Project Management", "Agile", "Scrum", "Team Leadership", "Software Development"],
  joined: "2023-05-15",
}

// Mock activity data
const mockActivity = [
  {
    id: "a1",
    action: "Created issue",
    target: "Implement responsive design for homepage",
    project: "Website Redesign",
    date: "2025-03-10T14:30:00Z",
  },
  {
    id: "a2",
    action: "Commented on",
    target: "Fix navigation menu on mobile",
    project: "Website Redesign",
    date: "2025-03-09T11:45:00Z",
  },
  {
    id: "a3",
    action: "Updated status of",
    target: "Set up project repository",
    project: "Website Redesign",
    date: "2025-03-08T16:20:00Z",
  },
  {
    id: "a4",
    action: "Created project",
    target: "Mobile App Development",
    project: "Mobile App Development",
    date: "2025-03-05T09:15:00Z",
  },
  {
    id: "a5",
    action: "Assigned",
    target: "Implement user authentication",
    project: "Mobile App Development",
    date: "2025-03-05T10:30:00Z",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileForm, setProfileForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    department: mockUser.department,
    location: mockUser.location,
    timezone: mockUser.timezone,
    bio: mockUser.bio,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button>Save Changes</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{mockUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                </div>
                <Badge>{mockUser.role}</Badge>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Avatar
                </Button>
              </div>

              <Separator className="my-6" />

              <nav className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "account" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "security" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
              </nav>

              <Separator className="my-6" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span>{new Date(mockUser.joined).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span>{mockUser.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span>{mockUser.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" value={profileForm.email} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={profileForm.department}>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={profileForm.timezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pacific Time (PT)">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Mountain Time (MT)">Mountain Time (MT)</SelectItem>
                          <SelectItem value="Central Time (CT)">Central Time (CT)</SelectItem>
                          <SelectItem value="Eastern Time (ET)">Eastern Time (ET)</SelectItem>
                          <SelectItem value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} rows={4} />
                  </div>

                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="h-6">
                        Add Skill
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="flex items-center gap-2">
                      <Badge>Premium</Badge>
                      <span className="text-sm text-muted-foreground">
                        Your account is active until December 31, 2025
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Language</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                      </div>
                      <Select defaultValue="system">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Default Dashboard</Label>
                        <p className="text-sm text-muted-foreground">Set your default landing page</p>
                      </div>
                      <Select defaultValue="dashboard">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dashboard">Dashboard</SelectItem>
                          <SelectItem value="projects">Projects</SelectItem>
                          <SelectItem value="tasks">Tasks</SelectItem>
                          <SelectItem value="calendar">Calendar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Danger Zone</h3>
                    <div className="rounded-md border border-destructive/50 p-4">
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" size="sm" className="mt-4">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Task Assignments</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when you are assigned to a task
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Task Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when tasks you're involved with are updated
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when someone comments on your tasks
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Project Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about updates to projects you're a member of
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Task Assignments</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when you are assigned to a task
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Task Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when tasks you're involved with are updated
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when someone comments on your tasks
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Due Date Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about upcoming due dates
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Enable Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <Button variant="outline" disabled>
                        <Key className="mr-2 h-4 w-4" />
                        Set Up Two-Factor Authentication
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions</h3>
                    <div className="space-y-3">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Current Session</h4>
                            <p className="text-sm text-muted-foreground">
                              San Francisco, CA • Chrome on Windows • Active now
                            </p>
                          </div>
                          <Badge>Current</Badge>
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Previous Session</h4>
                            <p className="text-sm text-muted-foreground">
                              San Francisco, CA • Safari on macOS • 2 days ago
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Log Out All Other Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                      <Avatar className="mt-0.5 h-8 w-8">
                        <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                        <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="font-medium text-primary">{activity.target}</span> in{" "}
                          <span className="text-muted-foreground">{activity.project}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
