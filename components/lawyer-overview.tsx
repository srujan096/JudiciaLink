"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 5,
  },
  {
    name: "Feb",
    total: 8,
  },
  {
    name: "Mar",
    total: 12,
  },
  {
    name: "Apr",
    total: 10,
  },
  {
    name: "May",
    total: 15,
  },
  {
    name: "Jun",
    total: 7,
  },
]

export function LawyerOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

