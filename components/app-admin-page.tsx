'use client'

import { useState, useEffect } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, DollarSign, Download, LayoutDashboard, Mail, Menu, Search, Settings, Users, X } from 'lucide-react'

// Mock data
const revenueData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1800 },
  { name: 'Mar', total: 2200 },
  { name: 'Apr', total: 2600 },
  { name: 'May', total: 3200 },
  { name: 'Jun', total: 3800 },
]

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Interested in your services", createdAt: "2023-06-01T10:00:00Z" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Please contact me about a project", createdAt: "2023-06-02T14:30:00Z" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", message: "Looking for a quote", createdAt: "2023-06-03T09:15:00Z" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(prevState => !prevState)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Agency Admin</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {['overview', 'contacts', 'team', 'settings'].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start transition-colors duration-200 ease-in-out hover:bg-gray-100"
              onClick={() => {
                setActiveTab(item)
                if (window.innerWidth < 1024) setSidebarOpen(false)
              }}
            >
              {item === 'overview' && <LayoutDashboard className="mr-2 h-4 w-4" />}
              {item === 'contacts' && <Mail className="mr-2 h-4 w-4" />}
              {item === 'team' && <Users className="mr-2 h-4 w-4" />}
              {item === 'settings' && <Settings className="mr-2 h-4 w-4" />}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300 ease-in-out max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="bg-white shadow-sm rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 transition-transform duration-300 ease-in-out hover:scale-110">
                      <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Jay Prakash</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='hover:cursor-pointer'>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="transition-all duration-300 ease-in-out">Overview</TabsTrigger>
              <TabsTrigger value="contacts" className="transition-all duration-300 ease-in-out">Contacts</TabsTrigger>
              <TabsTrigger value="team" className="transition-all duration-300 ease-in-out">Team</TabsTrigger>
              <TabsTrigger value="settings" className="transition-all duration-300 ease-in-out">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {['Total Revenue', 'New Clients', 'Projects', 'Active Users'].map((title, index) => (
                  <Card key={title} className="transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {title}
                      </CardTitle>
                      {index === 0 && <DollarSign className="h-4 w-4 text-muted-foreground" />}
                      {index === 1 && <Users className="h-4 w-4 text-muted-foreground" />}
                      {index === 2 && <LayoutDashboard className="h-4 w-4 text-muted-foreground" />}
                      {index === 3 && <Users className="h-4 w-4 text-muted-foreground" />}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{index === 0 ? '$45,231.89' : index === 1 ? '+12' : index === 2 ? '24' : '573'}</div>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? '+20.1% from last month' : index === 1 ? '+10% from last month' : index === 2 ? '6 in progress' : '+201 since last hour'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
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
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contacts" className="space-y-4">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Contacts</CardTitle>
                  <CardDescription>
                    You have {contacts.length} unread messages.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table className="w-full overflow-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id} className="transition-colors duration-200 ease-in-out hover:bg-gray-100">
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.message}</TableCell>
                          <TableCell className="text-right">{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="team" className="space-y-4">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Invite your team members to collaborate.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "John Doe", email: "john@example.com", role: "Admin" },
                      { name: "Jane Smith", email: "jane@example.com", role: "Editor" }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center space-x-4 transition-transform duration-200 ease-in-out hover:translate-x-2">
                        <Avatar>
                          <AvatarImage src={`/avatars/0${index + 1}.png`} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="ml-auto font-medium">{member.role}</div>
                      </div>
                    ))}
                    <Button className="w-full transition-all duration-300 ease-in-out hover:bg-blue-600">
                      <Users className="mr-2 h-4 w-4" />
                      Invite Team Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Name', 'Email', 'Role'].map((field, index) => (
                    <div key={field} className="space-y-1">
                      <label htmlFor={field.toLowerCase()} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{field}</label>
                      <Input 
                        id={field.toLowerCase()} 
                        defaultValue={index === 0 ? "John Doe" : index === 1 ? "john@example.com" : "Administrator"} 
                        disabled={index === 2}
                        className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <Button className="transition-all duration-300 ease-in-out hover:bg-blue-600">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}