"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, FileText, User, AlertCircle } from "lucide-react"

type Case = {
  id: string
  title: string
  client: string
  court: string
  type: string
  status: "active" | "closed" | "pending"
  nextHearing: string | null
  filingDate: string
}

export function CaseManagement() {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "CIV-2025-001",
      title: "Property Dispute",
      client: "Rajesh Kumar",
      court: "District Court, Delhi",
      type: "Civil",
      status: "active",
      nextHearing: "2025-05-15",
      filingDate: "2025-01-10",
    },
    {
      id: "FAM-2025-002",
      title: "Divorce Proceedings",
      client: "Meera Patel",
      court: "Family Court, Mumbai",
      type: "Family",
      status: "pending",
      nextHearing: null,
      filingDate: "2025-03-22",
    },
    {
      id: "CRIM-2025-003",
      title: "Fraud Case",
      client: "Suresh Sharma",
      court: "Sessions Court, Bangalore",
      type: "Criminal",
      status: "active",
      nextHearing: "2025-05-10",
      filingDate: "2025-02-15",
    },
    {
      id: "CORP-2025-004",
      title: "Contract Dispute",
      client: "Suresh Sharma",
      court: "Commercial Court, Chennai",
      type: "Corporate",
      status: "active",
      nextHearing: "2025-06-05",
      filingDate: "2025-03-10",
    },
    {
      id: "PROP-2025-005",
      title: "Tenant Eviction",
      client: "Rajesh Kumar",
      court: "Civil Court, Delhi",
      type: "Property",
      status: "active",
      nextHearing: "2025-05-20",
      filingDate: "2025-04-01",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Case Management</CardTitle>
        <CardDescription>Manage and track all your legal cases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cases..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="ml-4">Add New Case</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="p-4">
            <div className="space-y-4">
              {filteredCases.length > 0 ? (
                filteredCases.map((c) => (
                  <div key={c.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{c.title}</h3>
                        <p className="text-sm text-muted-foreground">Case ID: {c.id}</p>
                      </div>
                      <Badge
                        variant={c.status === "active" ? "default" : c.status === "pending" ? "secondary" : "outline"}
                      >
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium">Client</p>
                        <p className="text-sm text-muted-foreground">{c.client}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Court</p>
                        <p className="text-sm text-muted-foreground">{c.court}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Case Type</p>
                        <p className="text-sm text-muted-foreground">{c.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Filing Date</p>
                        <p className="text-sm text-muted-foreground">{c.filingDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Hearing</p>
                        <p className="text-sm text-muted-foreground">{c.nextHearing || "Not scheduled"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Hearings
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Client
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Updates
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No cases found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="active" className="p-4">
            <div className="space-y-4">
              {filteredCases
                .filter((c) => c.status === "active")
                .map((c) => (
                  <div key={c.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{c.title}</h3>
                        <p className="text-sm text-muted-foreground">Case ID: {c.id}</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium">Client</p>
                        <p className="text-sm text-muted-foreground">{c.client}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Court</p>
                        <p className="text-sm text-muted-foreground">{c.court}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Case Type</p>
                        <p className="text-sm text-muted-foreground">{c.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Filing Date</p>
                        <p className="text-sm text-muted-foreground">{c.filingDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Hearing</p>
                        <p className="text-sm text-muted-foreground">{c.nextHearing || "Not scheduled"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Hearings
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Client
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Updates
                      </Button>
                    </div>
                  </div>
                ))}
              {filteredCases.filter((c) => c.status === "active").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active cases found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="pending" className="p-4">
            <div className="space-y-4">
              {filteredCases
                .filter((c) => c.status === "pending")
                .map((c) => (
                  <div key={c.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{c.title}</h3>
                        <p className="text-sm text-muted-foreground">Case ID: {c.id}</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium">Client</p>
                        <p className="text-sm text-muted-foreground">{c.client}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Court</p>
                        <p className="text-sm text-muted-foreground">{c.court}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Case Type</p>
                        <p className="text-sm text-muted-foreground">{c.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Filing Date</p>
                        <p className="text-sm text-muted-foreground">{c.filingDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Client
                      </Button>
                    </div>
                  </div>
                ))}
              {filteredCases.filter((c) => c.status === "pending").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending cases found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="closed" className="p-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No closed cases found</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

