"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AppLayout } from "@/components/app-layout"
import { RecentActivity } from "@/components/recent-activity"
import { BarChart3, CheckCircle2, Clock, Users, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    progress: 65,
    issues: { total: 24, completed: 15 },
  },
  {
    id: "2",
    name: "Mobile App Development",
    progress: 30,
    issues: { total: 42, completed: 12 },
  },
  {
    id: "3",
    name: "CRM Integration",
    progress: 10,
    issues: { total: 15, completed: 2 },
  },
]

const mockAssignedTasks = [
  {
    id: "101",
    summary: "Implement responsive design for homepage",
    project: "Website Redesign",
    priority: "Medium",
    dueDate: "2025-03-15",
  },
  {
    id: "104",
    summary: "Implement user authentication",
    project: "Mobile App Development",
    priority: "High",
    dueDate: "2025-03-20",
  },
  {
    id: "106",
    summary: "Optimize image loading",
    project: "Website Redesign",
    priority: "Medium",
    dueDate: "2025-03-18",
  },
]

export default function DashboardPage() {
  // Calculate summary statistics
  const totalTasks = mockAssignedTasks.length
  const totalProjects = mockProjects.length
  const completedTasks = mockProjects.reduce((acc, project) => acc + project.issues.completed, 0)
  const totalIssues = mockProjects.reduce((acc, project) => acc + project.issues.total, 0)
  const completionRate = Math.round((completedTasks / totalIssues) * 100) || 0

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your work.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} completed, {totalIssues - completedTasks} remaining
              </p>
              <Progress className="mt-3" value={completionRate} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">Across {totalProjects} teams</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Due in the next 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>Track the progress of your active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Link href={`/projects/${project.id}`} className="font-medium hover:underline">
                        {project.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {project.issues.completed}/{project.issues.total} issues
                      </span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Your assigned tasks across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssignedTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Link href={`/tasks/${task.id}`} className="flex items-center font-medium hover:underline">
                        {task.summary}
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{task.project}</span>
                        <span>•</span>
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
