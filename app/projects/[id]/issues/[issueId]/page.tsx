"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppLayout } from "@/components/app-layout"
import { EditIssueDialog } from "@/components/edit-issue-dialog"
import { ChevronLeft, MessageSquare, Paperclip, Clock, AlertCircle } from "lucide-react"

// Mock issue data
const mockIssue = {
  id: "101",
  projectId: "1",
  summary: "Implement responsive design for homepage",
  description:
    "The homepage needs to be fully responsive across all device sizes. This includes the navigation, hero section, features section, and footer.",
  type: "Task",
  status: "In Progress",
  priority: "Medium",
  assignee: {
    id: "2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  reporter: {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  created: "2025-02-10T14:30:00Z",
  updated: "2025-02-15T09:45:00Z",
  comments: [
    {
      id: "c1",
      author: {
        id: "1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "I've created the initial designs in Figma. Please check them out and let me know your thoughts.",
      created: "2025-02-10T15:20:00Z",
    },
    {
      id: "c2",
      author: {
        id: "2",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "The designs look good. I'll start implementing them today.",
      created: "2025-02-11T10:15:00Z",
    },
  ],
  attachments: [
    {
      id: "a1",
      name: "homepage-design.fig",
      size: "2.4 MB",
      uploaded: "2025-02-10T15:20:00Z",
    },
    {
      id: "a2",
      name: "responsive-requirements.pdf",
      size: "1.1 MB",
      uploaded: "2025-02-10T15:25:00Z",
    },
  ],
}

export default function IssuePage() {
  const params = useParams()
  const projectId = params.id as string
  const issueId = params.issueId as string

  // In a real app, you would fetch the issue data based on the issueId
  // For now, we'll just use the mock data

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-6">
          <Link href={`/projects/${projectId}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{mockIssue.type}</Badge>
              <h1 className="text-2xl font-bold">{mockIssue.summary}</h1>
            </div>
            <EditIssueDialog issue={mockIssue} />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Issue #{mockIssue.id} • Created by {mockIssue.reporter.name} on{" "}
            {new Date(mockIssue.created).toLocaleDateString()}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="comments">Comments ({mockIssue.comments.length})</TabsTrigger>
                <TabsTrigger value="attachments">Attachments ({mockIssue.attachments.length})</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardHeader className="font-semibold">Description</CardHeader>
                  <CardContent>
                    <p>{mockIssue.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-4 space-y-4">
                {mockIssue.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{comment.author.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(comment.created).toLocaleString()}
                            </div>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea placeholder="Add a comment..." className="min-h-[100px]" />
                        <div className="mt-2 flex items-center justify-between">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="mr-2 h-4 w-4" />
                            Attach
                          </Button>
                          <Button size="sm">Comment</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attachments" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {mockIssue.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{attachment.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {attachment.size} • {new Date(attachment.uploaded).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}

                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          <Paperclip className="mr-2 h-4 w-4" />
                          Add Attachment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Sarah Chen</span>
                            <span>changed status from</span>
                            <Badge variant="outline">To Do</Badge>
                            <span>to</span>
                            <Badge>In Progress</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(mockIssue.updated).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MessageSquare className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Sarah Chen</span>
                            <span>added a comment</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(mockIssue.comments[1].created).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Alex Johnson</span>
                            <span>created this issue</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(mockIssue.created).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-medium">Status</div>
                    <Select defaultValue={mockIssue.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium">Assignee</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={mockIssue.assignee.avatar || "/placeholder.svg"}
                          alt={mockIssue.assignee.name}
                        />
                        <AvatarFallback>{mockIssue.assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>{mockIssue.assignee.name}</div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium">Reporter</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={mockIssue.reporter.avatar || "/placeholder.svg"}
                          alt={mockIssue.reporter.name}
                        />
                        <AvatarFallback>{mockIssue.reporter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>{mockIssue.reporter.name}</div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium">Priority</div>
                    <Select defaultValue={mockIssue.priority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium">Type</div>
                    <Select defaultValue={mockIssue.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bug">Bug</SelectItem>
                        <SelectItem value="Task">Task</SelectItem>
                        <SelectItem value="Story">Story</SelectItem>
                        <SelectItem value="Epic">Epic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
