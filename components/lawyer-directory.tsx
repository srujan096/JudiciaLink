"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MessageSquare, Calendar } from "lucide-react"

type Lawyer = {
  id: number
  name: string
  specialization: string
  experience: number
  location: string
  rating: number
  cases: number
  available: boolean
  image: string
}

export function LawyerDirectory() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([
    {
      id: 1,
      name: "Adv. Priya Sharma",
      specialization: "Property Law",
      experience: 12,
      location: "Delhi",
      rating: 4.8,
      cases: 245,
      available: true,
      image: "/placeholder-user.jpg",
    },
    {
      id: 2,
      name: "Adv. Rahul Verma",
      specialization: "Family Law",
      experience: 8,
      location: "Mumbai",
      rating: 4.5,
      cases: 180,
      available: true,
      image: "/placeholder-user.jpg",
    },
    {
      id: 3,
      name: "Adv. Ananya Patel",
      specialization: "Criminal Law",
      experience: 15,
      location: "Bangalore",
      rating: 4.9,
      cases: 320,
      available: false,
      image: "/placeholder-user.jpg",
    },
    {
      id: 4,
      name: "Adv. Vikram Singh",
      specialization: "Corporate Law",
      experience: 10,
      location: "Chennai",
      rating: 4.6,
      cases: 210,
      available: true,
      image: "/placeholder-user.jpg",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [specialization, setSpecialization] = useState("all")

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      (lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (specialization === "all" || lawyer.specialization === specialization),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Find a Lawyer</CardTitle>
        <CardDescription>Connect with qualified lawyers specializing in your legal needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or specialization..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="Property Law">Property Law</SelectItem>
              <SelectItem value="Family Law">Family Law</SelectItem>
              <SelectItem value="Criminal Law">Criminal Law</SelectItem>
              <SelectItem value="Corporate Law">Corporate Law</SelectItem>
              <SelectItem value="Tax Law">Tax Law</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="overflow-hidden">
              <div className="flex p-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={lawyer.image} alt={lawyer.name} />
                  <AvatarFallback>
                    {lawyer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{lawyer.name}</h3>
                    {lawyer.available ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        Busy
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{lawyer.specialization}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{lawyer.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{lawyer.experience} years exp.</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{lawyer.location}</span>
                  </div>
                </div>
              </div>
              <div className="border-t px-6 py-4 bg-muted/50 flex justify-between">
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button size="sm">View Profile</Button>
              </div>
            </Card>
          ))}

          {filteredLawyers.length === 0 && (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No lawyers found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Browse All Lawyers</Button>
        <Button>Request Consultation</Button>
      </CardFooter>
    </Card>
  )
}

