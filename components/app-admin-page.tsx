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
import { Bell, DollarSign, LayoutDashboard, Mail, Menu, Search, Settings, Users, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGetContacts } from '@/features/api/use-get-contacts'
import { FaBloggerB } from "react-icons/fa";
import BlogPostForm from './blog-form'
import * as XLSX from 'xlsx';
import { OverviewDashboard } from './overview-dashboard'
import { SettingsPanel } from './settings-panel'
import Image from 'next/image'

// Mock data
const revenueData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1800 },
  { name: 'Mar', total: 2200 },
  { name: 'Apr', total: 2600 },
  { name: 'May', total: 3200 },
  { name: 'Jun', total: 3800 },
]

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: Mail },
  { id: 'post-blog', label: 'Post Blog', icon: FaBloggerB },
  { id: 'settings', label: 'Settings', icon: Settings }
]

export default function AdminDashboard() {

  const contactsQuery = useGetContacts()
  const contacts = contactsQuery.data || []
  
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)

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

  useEffect(() => {
    const results = contacts.filter(contact =>
      Object.values(contact).some(value =>
          value !== null && value !== undefined && // Check for null or undefined
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
    setFilteredContacts(results)
  }, [searchTerm,contacts])

  const handleExport = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert contacts data to format suitable for Excel
    const exportData = contacts.map(contact => ({
      Name: contact.name,
      Email: contact.email,
      Phone: contact.phone,
      Company: contact.company,
      'Marketing Spend': contact.marketingSpend,
      Location: contact.location,
      'Skype ID': contact.content
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "contacts_export.xlsx");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <Image src="/logo1.webp" alt="adbytehub" width={150} height={150} className='invert'/>
          {/* <h1 className="text-2xl font-bold text-gray-800">adbytehub Admin</h1> */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start transition-colors duration-200 ease-in-out hover:bg-gray-100"
              onClick={() => {
                setActiveTab(item.id)
                if (window.innerWidth < 1024) setSidebarOpen(false)
              }}
            >
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white shadow-sm rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full max-w-[300px] pl-8 transition-all duration-300 ease-in-out focus:max-w-[400px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>    
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="relative overflow-hidden transition-all duration-300 ease-in-out hover:bg-gray-100">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full transform scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 transition-transform duration-300 ease-in-out hover:scale-110">
                      <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">adbytehub Admin</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        info@adbytehub.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className=' cursor-pointer'>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="post-blog">Post Blog</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <OverviewDashboard contacts={contacts} />
            </TabsContent>
            <TabsContent value="contacts" className="space-y-4">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Contacts</CardTitle>
                    <CardDescription>
                      You have {filteredContacts.length} total contacts
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExport}
                    >
                      Export
                    </Button>
                    {/* <Button size="sm">Add Contact</Button> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <Table className="w-full overflow-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Marketing Spend</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Skype ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentContacts.map((contact) => (
                        <TableRow key={contact.id} className="transition-colors duration-200 ease-in-out hover:bg-gray-100">
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.company}</TableCell>
                          <TableCell>{contact.marketingSpend}</TableCell>
                          <TableCell>{contact.location}</TableCell>
                          <TableCell>{contact.content}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex items-center justify-between px-2 py-4">
                    <p className="text-sm text-gray-700">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredContacts.length)} of{" "}
                      {filteredContacts.length} entries
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="post-blog" className="space-y-4">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Create a Blog</CardTitle>
                  <CardDescription>
                    Create and post blogs from here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                </CardContent>
                 <BlogPostForm/>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}