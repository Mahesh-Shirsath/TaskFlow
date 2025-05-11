"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, GitPullRequest, AlertCircle, CheckCircle2, Clock } from "lucide-react"

// Mock data for recent activity
const mockActivity = [
  {
    id: "a1",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "created issue",
    target: "Implement responsive design for homepage",
    project: "Website Redesign",
    date: "2025-03-10T14:30:00Z",
    type: "issue",
  },
  {
    id: "a2",
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "commented on",
    target: "Fix navigation menu on mobile",
    project: "Website Redesign",
    date: "2025-03-09T11:45:00Z",
    type: "comment",
  },
  {
    id: "a3",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "updated status of",
    target: "Set up project repository",
    project: "Website Redesign",
    date: "2025-03-08T16:20:00Z",
    type: "status",
    from: "In Progress",
    to: "Done",
  },
  {
    id: "a4",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "created pull request",
    target: "Add dark mode support",
    project: "Website Redesign",
    date: "2025-03-07T13:10:00Z",
    type: "pr",
  },
  {
    id: "a5",
    user: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "reported bug",
    target: "Login form validation error",
    project: "Mobile App Development",
    date: "2025-03-06T09:30:00Z",
    type: "bug",
  },
]

export function RecentActivity() {
  // Function to get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "pr":
        return <GitPullRequest className="h-4 w-4 text-purple-500" />
      case "bug":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "status":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-primary" />
    }
  }

  // Function to format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="space-y-6">
      {mockActivity.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{activity.user.name}</span>
              <span className="text-muted-foreground">{activity.action}</span>
              <div className="flex items-center gap-1">
                {getActivityIcon(activity.type)}
                <span className="font-medium">{activity.target}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>in {activity.project}</span>
              {activity.type === "status" && (
                <>
                  <span>•</span>
                  <span>
                    Changed status from <Badge variant="outline">{activity.from}</Badge> to <Badge>{activity.to}</Badge>
                  </span>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{formatRelativeTime(activity.date)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
