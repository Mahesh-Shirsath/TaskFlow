"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppLayout } from "@/components/app-layout"
import { KanbanBoard } from "@/components/kanban-board"
import { IssuesList } from "@/components/issues-list"
import { ProjectHeader } from "@/components/project-header"
import { CreateIssueDialog } from "@/components/create-issue-dialog"

// Mock data for the project
const mockProject = {
  id: "1",
  name: "Website Redesign",
  description: "Redesign the company website with a modern look and feel",
  lead: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
  status: "Active",
  members: [
    { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40" },
  ],
  progress: 65,
  startDate: "2025-01-15",
  endDate: "2025-06-30",
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const [activeTab, setActiveTab] = useState("board")

  // In a real app, you would fetch the project data based on the projectId
  // For now, we'll just use the mock data

  return (
    <AppLayout>
      <div className="container py-6">
        <ProjectHeader project={mockProject} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="board">Board</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <CreateIssueDialog projectId={projectId} />
          </div>

          <TabsContent value="board" className="mt-6">
            <KanbanBoard projectId={projectId} />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <IssuesList projectId={projectId} />
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">Timeline view coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">Reports view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
