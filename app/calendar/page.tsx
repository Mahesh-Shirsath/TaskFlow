"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AppLayout } from "@/components/app-layout"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Mock data for calendar events
const mockEvents = [
  {
    id: "e1",
    title: "Implement responsive design",
    project: "Website Redesign",
    date: "2025-03-15",
    priority: "Medium",
    type: "Task",
  },
  {
    id: "e2",
    title: "Team meeting",
    project: "General",
    date: "2025-03-15",
    priority: "Medium",
    type: "Meeting",
  },
  {
    id: "e3",
    title: "Fix navigation menu on mobile",
    project: "Website Redesign",
    date: "2025-03-10",
    priority: "High",
    type: "Bug",
  },
  {
    id: "e4",
    title: "Implement user authentication",
    project: "Mobile App Development",
    date: "2025-03-20",
    priority: "High",
    type: "Story",
  },
  {
    id: "e5",
    title: "Weekly sprint review",
    project: "General",
    date: "2025-03-17",
    priority: "Medium",
    type: "Meeting",
  },
  {
    id: "e6",
    title: "Create contact form",
    project: "Mobile App Development",
    date: "2025-03-25",
    priority: "Medium",
    type: "Task",
  },
  {
    id: "e7",
    title: "Project kickoff",
    project: "CRM Integration",
    date: "2025-03-12",
    priority: "High",
    type: "Meeting",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("month")
  const [filter, setFilter] = useState("all")

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of the month and total days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  // Get day of week for first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Generate calendar days array
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push({ day: null, date: null })
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const dateString = date.toISOString().split("T")[0]

    // Get events for this day
    const dayEvents = mockEvents.filter((event) => event.date === dateString)

    // Filter events if a filter is applied
    const filteredEvents = filter === "all" ? dayEvents : dayEvents.filter((event) => event.type === filter)

    calendarDays.push({
      day,
      date: dateString,
      events: filteredEvents,
      isToday: isToday(date),
    })
  }

  // Helper function to check if a date is today
  function isToday(date: Date) {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
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

  // Function to get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Bug":
        return "bg-red-500"
      case "Task":
        return "bg-blue-500"
      case "Story":
        return "bg-purple-500"
      case "Meeting":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString("default", { month: "long" })} {currentYear}
          </h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="Task">Tasks</SelectItem>
              <SelectItem value="Bug">Bugs</SelectItem>
              <SelectItem value="Story">Stories</SelectItem>
              <SelectItem value="Meeting">Meetings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border">
          {/* Calendar header - days of week */}
          <div className="grid grid-cols-7 border-b bg-muted/50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] border-b border-r p-1 ${
                  day.isToday ? "bg-muted/30" : ""
                } ${!day.day ? "bg-muted/10" : ""}`}
              >
                {day.day && (
                  <>
                    <div className="mb-1 p-1 text-sm font-medium">{day.day}</div>
                    <div className="space-y-1">
                      {day.events?.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center gap-1 rounded-sm px-1 py-0.5 text-xs">
                          <div className={`h-2 w-2 rounded-full ${getEventTypeColor(event.type)}`} />
                          <span className="truncate">{event.title}</span>
                        </div>
                      ))}
                      {day.events && day.events.length > 3 && (
                        <div className="px-1 text-xs text-muted-foreground">+{day.events.length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents
                  .filter((event) => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{event.project}</span>
                          <span>•</span>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.type}</Badge>
                        <Badge variant={getPriorityVariant(event.priority)}>{event.priority}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
