"use client"

import { useState } from "react"

type Event = {
  id: number
  title: string
  date: Date
  time: string
  location: string
  type: "hearing" | "meeting" | "deadline"
  client?: string
  caseId?: string
}

export function LawyerCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined);
}



