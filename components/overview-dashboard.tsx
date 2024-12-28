'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { DollarSign, Users, LayoutDashboard, TrendingUp } from 'lucide-react'

interface OverviewDashboardProps {
  contacts: any[] // Replace 'any' with your contact type
}

// Mock data - Replace with real data
const revenueData = [
  { name: 'Jul', total: 4200 },
  { name: 'Aug', total: 4600 },
  { name: 'Sep', total: 5000 },
  { name: 'Oct', total: 5400 },
  { name: 'Nov', total: 5800 },
  { name: 'Dec', total: 6200 },
]

export function OverviewDashboard({ contacts }: OverviewDashboardProps) {
  const totalContacts = contacts.length
  const newContactsThisMonth = contacts.filter(contact => {
    const contactDate = new Date(contact.createdAt)
    const now = new Date()
    return contactDate.getMonth() === now.getMonth() && 
           contactDate.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    {
      title: "Total Contacts",
      value: totalContacts,
      change: "+12% from last month",
      icon: Users
    },
    {
      title: "New This Month",
      value: newContactsThisMonth,
      change: "+4% from last month",
      icon: TrendingUp
    },
    {
      title: "Active Campaigns",
      value: "5",
      change: "2 pending approval",
      icon: LayoutDashboard
    },
    {
      title: "Average Spend",
      value: "$2,400",
      change: "+8% from last month",
      icon: DollarSign
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Contact Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar 
                dataKey="total" 
                fill="#adfa1d" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300 hover:fill-opacity-80" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
} 