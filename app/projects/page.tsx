"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign the company website with a modern look and feel",
    lead: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    status: "Active",
    members: 5,
    issues: 24,
    progress: 65,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Develop a new mobile app for iOS and Android platforms",
    lead: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40" },
    status: "Active",
    members: 8,
    issues: 42,
    progress: 30,
  },
  {
    id: "3",
    name: "CRM Integration",
    description: "Integrate our product with popular CRM solutions",
    lead: { name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40" },
    status: "On Hold",
    members: 3,
    issues: 15,
    progress: 10,
  },
  {
    id: "4",
    name: "Marketing Campaign",
    description: "Q3 marketing campaign for product launch",
    lead: { name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40" },
    status: "Completed",
    members: 4,
    issues: 18,
    progress: 100,
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter projects based on search query
  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                    <Badge
                      variant={
                        project.status === "Active"
                          ? "default"
                          : project.status === "Completed"
                            ? "success"
                            : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={project.lead.avatar || "/placeholder.svg"} alt={project.lead.name} />
                      <AvatarFallback>{project.lead.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Lead: {project.lead.name}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(3, project.members) }).map((_, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                          +{project.members - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{project.issues} issues</div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
