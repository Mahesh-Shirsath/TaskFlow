"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppLayout } from "@/components/app-layout"
import { Search, Filter, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react"

// Mock data for tasks
const mockTasks = [
  {
    id: "101",
    summary: "Implement responsive design for homepage",
    project: { id: "1", name: "Website Redesign" },
    type: "Task",
    status: "To Do",
    priority: "Medium",
    dueDate: "2025-03-15",
    completed: false,
  },
  {
    id: "102",
    summary: "Add dark mode support",
    project: { id: "1", name: "Website Redesign" },
    type: "Task",
    status: "To Do",
    priority: "Low",
    dueDate: "2025-03-22",
    completed: false,
  },
  {
    id: "103",
    summary: "Fix navigation menu on mobile",
    project: { id: "1", name: "Website Redesign" },
    type: "Bug",
    status: "To Do",
    priority: "High",
    dueDate: "2025-03-10",
    completed: false,
  },
  {
    id: "104",
    summary: "Implement user authentication",
    project: { id: "2", name: "Mobile App Development" },
    type: "Story",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-03-20",
    completed: false,
  },
  {
    id: "105",
    summary: "Create contact form",
    project: { id: "2", name: "Mobile App Development" },
    type: "Task",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-03-25",
    completed: false,
  },
  {
    id: "106",
    summary: "Optimize image loading",
    project: { id: "1", name: "Website Redesign" },
    type: "Task",
    status: "Review",
    priority: "Medium",
    dueDate: "2025-03-18",
    completed: false,
  },
  {
    id: "107",
    summary: "Set up project repository",
    project: { id: "1", name: "Website Redesign" },
    type: "Task",
    status: "Done",
    priority: "High",
    dueDate: "2025-02-28",
    completed: true,
  },
  {
    id: "108",
    summary: "Create initial wireframes",
    project: { id: "1", name: "Website Redesign" },
    type: "Task",
    status: "Done",
    priority: "Medium",
    dueDate: "2025-03-05",
    completed: true,
  },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [tasks, setTasks] = useState(mockTasks)
  const [activeTab, setActiveTab] = useState("all")

  // Get unique projects for filter
  const projects = Array.from(new Set(mockTasks.map((task) => task.project.name))).map((name) => {
    const project = mockTasks.find((task) => task.project.name === name)?.project
    return project
  })

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project.id === projectFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "today" && isToday(task.dueDate)) ||
      (activeTab === "upcoming" && isUpcoming(task.dueDate)) ||
      (activeTab === "completed" && task.completed)

    return matchesSearch && matchesPriority && matchesProject && matchesTab
  })

  // Helper functions for date filtering
  function isToday(dateString: string) {
    const today = new Date()
    const taskDate = new Date(dateString)
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    )
  }

  function isUpcoming(dateString: string) {
    const today = new Date()
    const taskDate = new Date(dateString)
    const oneWeekFromNow = new Date()
    oneWeekFromNow.setDate(today.getDate() + 7)
    return taskDate > today && taskDate <= oneWeekFromNow
  }

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed, status: !task.completed ? "Done" : "To Do" } : task,
      ),
    )
  }

  // Function to get priority badge variant
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Bug":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "Task":
        return <CheckCircle2 className="h-4 w-4 text-primary" />
      case "Story":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <Button>Create Task</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project?.id} value={project?.id || ""}>
                    {project?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No tasks found matching your filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className={task.completed ? "opacity-70" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          <Link
                            href={`/projects/${task.project.id}/issues/${task.id}`}
                            className={`font-medium hover:underline ${task.completed ? "line-through" : ""}`}
                          >
                            {task.summary}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                          <Badge variant="outline">{task.status}</Badge>
                        </div>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <Link href={`/projects/${task.project.id}`} className="hover:underline">
                          {task.project.name}
                        </Link>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  )
}
