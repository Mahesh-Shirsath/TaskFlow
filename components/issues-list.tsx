"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface Issue {
  id: string
  summary: string
  type: string
  status: string
  priority: string
  assignee: {
    name: string
    avatar: string
  }
  created: string
  updated: string
}

interface IssuesListProps {
  projectId: string
}

export function IssuesList({ projectId }: IssuesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data for issues
  const issues: Issue[] = [
    {
      id: "101",
      summary: "Implement responsive design for homepage",
      type: "Task",
      status: "To Do",
      priority: "Medium",
      assignee: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-10T14:30:00Z",
      updated: "2025-02-10T14:30:00Z",
    },
    {
      id: "102",
      summary: "Add dark mode support",
      type: "Task",
      status: "To Do",
      priority: "Low",
      assignee: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-11T09:15:00Z",
      updated: "2025-02-11T09:15:00Z",
    },
    {
      id: "103",
      summary: "Fix navigation menu on mobile",
      type: "Bug",
      status: "To Do",
      priority: "High",
      assignee: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-12T11:45:00Z",
      updated: "2025-02-12T11:45:00Z",
    },
    {
      id: "104",
      summary: "Implement user authentication",
      type: "Story",
      status: "In Progress",
      priority: "High",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-08T10:20:00Z",
      updated: "2025-02-15T14:30:00Z",
    },
    {
      id: "105",
      summary: "Create contact form",
      type: "Task",
      status: "In Progress",
      priority: "Medium",
      assignee: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-09T16:10:00Z",
      updated: "2025-02-14T11:25:00Z",
    },
    {
      id: "106",
      summary: "Optimize image loading",
      type: "Task",
      status: "Review",
      priority: "Medium",
      assignee: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-07T13:40:00Z",
      updated: "2025-02-13T09:50:00Z",
    },
    {
      id: "107",
      summary: "Set up project repository",
      type: "Task",
      status: "Done",
      priority: "High",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-01T09:00:00Z",
      updated: "2025-02-01T15:30:00Z",
    },
    {
      id: "108",
      summary: "Create initial wireframes",
      type: "Task",
      status: "Done",
      priority: "Medium",
      assignee: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      created: "2025-02-02T11:20:00Z",
      updated: "2025-02-05T14:15:00Z",
    },
  ]

  // Filter issues based on search query and filters
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesType = typeFilter === "all" || issue.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

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

  // Function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "To Do":
        return "outline"
      case "In Progress":
        return "default"
      case "Review":
        return "secondary"
      case "Done":
        return "success"
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
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search issues..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Bug">Bug</SelectItem>
              <SelectItem value="Task">Task</SelectItem>
              <SelectItem value="Story">Story</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[150px]">Assignee</TableHead>
              <TableHead className="w-[120px]">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No issues found.
                </TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-mono text-xs">{issue.id}</TableCell>
                  <TableCell>
                    <Link href={`/projects/${projectId}/issues/${issue.id}`} className="hover:underline">
                      {issue.summary}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(issue.type)}
                      <span className="text-xs">{issue.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(issue.priority)}>{issue.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={issue.assignee.avatar || "/placeholder.svg"} alt={issue.assignee.name} />
                        <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{issue.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(issue.updated).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
