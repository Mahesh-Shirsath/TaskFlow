"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MoreHorizontal } from "lucide-react"

interface ProjectHeaderProps {
  project: {
    id: string
    name: string
    description: string
    status: string
    lead: {
      name: string
      avatar: string
    }
    members: Array<{
      id: string
      name: string
      avatar: string
    }>
    progress: number
    startDate: string
    endDate: string
  }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Badge
              variant={
                project.status === "Active" ? "default" : project.status === "Completed" ? "success" : "secondary"
              }
            >
              {project.status}
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Lead</div>
          <div className="mt-1 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.lead.avatar || "/placeholder.svg"} alt={project.lead.name} />
              <AvatarFallback>{project.lead.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{project.lead.name}</span>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Team</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {project.members.length > 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                  +{project.members.length - 3}
                </div>
              )}
            </div>
            <span>{project.members.length} members</span>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Timeline</div>
          <div className="mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-muted-foreground">Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="mt-2" />
        </div>
      </div>
    </div>
  )
}
