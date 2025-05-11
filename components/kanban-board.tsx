"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface Issue {
  id: string
  summary: string
  type: string
  priority: string
  assignee: {
    name: string
    avatar: string
  }
  dueDate?: string
}

interface Column {
  id: string
  title: string
  issues: Issue[]
}

interface KanbanBoardProps {
  projectId: string
}

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  // Mock data for the Kanban board
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      issues: [
        {
          id: "101",
          summary: "Implement responsive design for homepage",
          type: "Task",
          priority: "Medium",
          assignee: {
            name: "Sarah Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          dueDate: "2025-03-15",
        },
        {
          id: "102",
          summary: "Add dark mode support",
          type: "Task",
          priority: "Low",
          assignee: {
            name: "Michael Brown",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          id: "103",
          summary: "Fix navigation menu on mobile",
          type: "Bug",
          priority: "High",
          assignee: {
            name: "Emily Davis",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          dueDate: "2025-03-10",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      issues: [
        {
          id: "104",
          summary: "Implement user authentication",
          type: "Story",
          priority: "High",
          assignee: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          dueDate: "2025-03-20",
        },
        {
          id: "105",
          summary: "Create contact form",
          type: "Task",
          priority: "Medium",
          assignee: {
            name: "David Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      issues: [
        {
          id: "106",
          summary: "Optimize image loading",
          type: "Task",
          priority: "Medium",
          assignee: {
            name: "Sarah Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      issues: [
        {
          id: "107",
          summary: "Set up project repository",
          type: "Task",
          priority: "High",
          assignee: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          id: "108",
          summary: "Create initial wireframes",
          type: "Task",
          priority: "Medium",
          assignee: {
            name: "Emily Davis",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
      ],
    },
  ])

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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium">
              {column.title} <span className="ml-2 text-sm text-muted-foreground">{column.issues.length}</span>
            </h3>
            <button className="rounded-full p-1 hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {column.issues.map((issue) => (
              <Link key={issue.id} href={`/projects/${projectId}/issues/${issue.id}`} className="block">
                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="flex items-start justify-between text-sm font-medium">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(issue.type)}
                        <span className="ml-1">{issue.summary}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={issue.assignee.avatar || "/placeholder.svg"} alt={issue.assignee.name} />
                          <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Badge variant={getPriorityVariant(issue.priority)} className="text-xs">
                          {issue.priority}
                        </Badge>
                      </div>
                      {issue.dueDate && (
                        <div className="text-xs text-muted-foreground">
                          Due {new Date(issue.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
