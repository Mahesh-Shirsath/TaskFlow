"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

// Mock data for team members
const mockTeamMembers = [
  { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40" },
]

interface CreateIssueDialogProps {
  projectId: string
  onIssueCreated?: (issue: any) => void
}

export function CreateIssueDialog({ projectId, onIssueCreated }: CreateIssueDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    type: "Task",
    priority: "Medium",
    assigneeId: "",
    dueDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would call your API to create the issue
    const assignee = mockTeamMembers.find((member) => member.id === formData.assigneeId)

    const newIssue = {
      id: Math.random().toString(36).substring(2, 9),
      projectId,
      summary: formData.summary,
      description: formData.description,
      type: formData.type,
      status: "To Do",
      priority: formData.priority,
      assignee: assignee || mockTeamMembers[0],
      reporter: mockTeamMembers[0], // Current user
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      dueDate: formData.dueDate,
      comments: [],
      attachments: [],
    }

    if (onIssueCreated) {
      onIssueCreated(newIssue)
    }

    // Reset form and close dialog
    setFormData({
      summary: "",
      description: "",
      type: "Task",
      priority: "Medium",
      assigneeId: "",
      dueDate: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Issue</DialogTitle>
            <DialogDescription>Fill in the details to create a new issue.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Input
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Enter issue summary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter issue description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Task">Task</SelectItem>
                    <SelectItem value="Story">Story</SelectItem>
                    <SelectItem value="Epic">Epic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assigneeId">Assignee</Label>
                <Select value={formData.assigneeId} onValueChange={(value) => handleSelectChange("assigneeId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Issue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
