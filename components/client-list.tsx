"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, FileText, Calendar } from "lucide-react"

type Client = {
  id: number
  name: string
  email: string
  phone: string
  cases: number
  status: "active" | "inactive" | "pending"
  joinDate: string
  image: string
}

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      cases: 2,
      status: "active",
      joinDate: "2025-01-15",
      image: "/placeholder-user.jpg",
    },
    {
      id: 2,
      name: "Meera Patel",
      email: "meera.patel@example.com",
      phone: "+91 87654 32109",
      cases: 1,
      status: "pending",
      joinDate: "2025-04-22",
      image: "/placeholder-user.jpg",
    },
    {
      id: 3,
      name: "Suresh Sharma",
      email: "suresh.sharma@example.com",
      phone: "+91 76543 21098",
      cases: 3,
      status: "active",
      joinDate: "2024-11-05",
      image: "/placeholder-user.jpg",
    },
    {
      id: 4,
      name: "Anita Singh",
      email: "anita.singh@example.com",
      phone: "+91 65432 10987",
      cases: 0,
      status: "inactive",
      joinDate: "2024-08-30",
      image: "/placeholder-user.jpg",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Client Management</CardTitle>
        <CardDescription>Manage your clients and their cases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="ml-4">Add New Client</Button>
        </div>

        <div className="space-y-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={client.image} alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{client.name}</h3>
                    <Badge
                      variant={
                        client.status === "active" ? "default" : client.status === "pending" ? "secondary" : "outline"
                      }
                      className="ml-2"
                    >
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-muted-foreground">
                    <span>{client.email}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{client.phone}</span>
                    <span className="hidden md:inline">•</span>
                    <span>Cases: {client.cases}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Cases
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </div>
          ))}

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

