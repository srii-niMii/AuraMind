import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'
import { 
  Users, MessageSquare, Calendar, TrendingUp, TrendingDown, 
  Heart, Brain, Clock, AlertTriangle, CheckCircle 
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  // Mock analytics data
  const studentStats = {
    totalUsers: 2456,
    activeThisWeek: 847,
    newThisMonth: 234,
    chatSessions: 1823,
    bookings: 456,
    forumPosts: 234
  }

  const moodData = [
    { month: 'Jan', anxiety: 45, depression: 30, stress: 60, wellness: 35 },
    { month: 'Feb', anxiety: 42, depression: 28, stress: 58, wellness: 38 },
    { month: 'Mar', anxiety: 40, depression: 25, stress: 55, wellness: 42 },
    { month: 'Apr', anxiety: 38, depression: 23, stress: 52, wellness: 45 },
    { month: 'May', anxiety: 35, depression: 20, stress: 48, wellness: 48 },
    { month: 'Jun', anxiety: 32, depression: 18, stress: 45, wellness: 52 }
  ]

  const categoryData = [
    { name: 'Anxiety', value: 35, color: '#ef4444' },
    { name: 'Stress', value: 28, color: '#f97316' },
    { name: 'Depression', value: 20, color: '#8b5cf6' },
    { name: 'Sleep Issues', value: 12, color: '#06b6d4' },
    { name: 'Other', value: 5, color: '#10b981' }
  ]

  const usageData = [
    { time: '6 AM', chatbot: 45, bookings: 12, resources: 23 },
    { time: '9 AM', chatbot: 120, bookings: 34, resources: 67 },
    { time: '12 PM', chatbot: 95, bookings: 28, resources: 45 },
    { time: '3 PM', chatbot: 156, bookings: 45, resources: 89 },
    { time: '6 PM', chatbot: 203, bookings: 67, resources: 134 },
    { time: '9 PM', chatbot: 178, bookings: 23, resources: 98 },
    { time: '12 AM', chatbot: 89, bookings: 8, resources: 34 }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Mental health analytics and system overview (All data is anonymized)
            </p>
            <div className="flex gap-2 mt-4">
              <Badge variant="secondary">Real-time Analytics</Badge>
              <Badge variant="secondary">HIPAA Compliant</Badge>
              <Badge variant="secondary">Anonymous Data Only</Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold">{studentStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +12% from last month
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active This Week</p>
                    <p className="text-3xl font-bold">{studentStats.activeThisWeek}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +8% from last week
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-wellness" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Chat Sessions</p>
                    <p className="text-3xl font-bold">{studentStats.chatSessions}</p>
                    <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      24/7 availability
                    </p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Counseling Bookings</p>
                    <p className="text-3xl font-bold">{studentStats.bookings}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      94% attendance rate
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-wellness" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Mood Trends */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Mental Health Trends
                </CardTitle>
                <CardDescription>
                  6-month overview of student mental health indicators (anonymized data)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="anxiety" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2} />
                    <Line type="monotone" dataKey="depression" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="wellness" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Issue Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Top Concerns</CardTitle>
                <CardDescription>
                  Most common issues students seek help for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Usage Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Usage Patterns</CardTitle>
                <CardDescription>
                  Student engagement throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="chatbot" fill="#3b82f6" />
                    <Bar dataKey="resources" fill="#10b981" />
                    <Bar dataKey="bookings" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  System Health
                </CardTitle>
                <CardDescription>
                  Platform performance and availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Chatbot Uptime</span>
                    <span>99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Response Time</span>
                    <span>&lt; 2s avg</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>User Satisfaction</span>
                    <span>4.7/5</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>All systems operational</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Crisis detection: Active</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Data encryption: Enabled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Actions */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle className="w-5 h-5" />
                  Attention Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">High Crisis Alerts</p>
                      <p className="text-sm text-muted-foreground">3 this week</p>
                    </div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">Forum Moderation</p>
                      <p className="text-sm text-muted-foreground">5 posts pending</p>
                    </div>
                    <Link to="/forum">
                      <Button size="sm" variant="outline">Review</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Export User Analytics
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Chat Logs (Anonymized)
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Counselor Schedule Management
                </Button>
                
                <Link to="/forum">
                  <Button className="w-full justify-start" variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Forum Moderation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}