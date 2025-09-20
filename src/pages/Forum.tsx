import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Heart, Reply, Flag, Plus, Search, TrendingUp, Clock, Users } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorInitials: string
  timestamp: string
  category: string
  replies: number
  likes: number
  isAnonymous: boolean
  tags: string[]
}

interface Reply {
  id: string
  content: string
  author: string
  authorInitials: string
  timestamp: string
  likes: number
  isAnonymous: boolean
}

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
    isAnonymous: true
  })

  const posts: ForumPost[] = [
    {
      id: '1',
      title: 'Dealing with exam anxiety - sharing what worked for me',
      content: 'Hey everyone! I wanted to share some techniques that really helped me manage my exam anxiety. The breathing exercises from the resources section were a game changer...',
      author: 'Anonymous Student',
      authorInitials: 'AS',
      timestamp: '2 hours ago',
      category: 'anxiety',
      replies: 12,
      likes: 24,
      isAnonymous: true,
      tags: ['anxiety', 'exams', 'coping-strategies']
    },
    {
      id: '2',
      title: 'Finding motivation during tough times',
      content: 'Has anyone else been struggling with motivation lately? I feel like I am in a constant cycle of procrastination and guilt. Looking for advice or just knowing I am not alone.',
      author: 'Sam K.',
      authorInitials: 'SK',
      timestamp: '4 hours ago',
      category: 'motivation',
      replies: 8,
      likes: 16,
      isAnonymous: false,
      tags: ['motivation', 'procrastination', 'support']
    },
    {
      id: '3',
      title: 'Sleep schedule completely messed up',
      content: 'Anyone else having trouble with their sleep? I have been staying up until 3 AM and then feeling terrible the next day. How do you get back on track?',
      author: 'Anonymous Student',
      authorInitials: 'AS',
      timestamp: '6 hours ago',
      category: 'sleep',
      replies: 15,
      likes: 31,
      isAnonymous: true,
      tags: ['sleep', 'schedule', 'health']
    },
    {
      id: '4',
      title: 'Grateful for this community',
      content: 'Just wanted to say thank you to everyone here. Reading your posts and knowing others go through similar struggles has been so helpful. Sending positive vibes to all!',
      author: 'Maya P.',
      authorInitials: 'MP',
      timestamp: '1 day ago',
      category: 'support',
      replies: 22,
      likes: 45,
      isAnonymous: false,
      tags: ['gratitude', 'community', 'support']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: posts.length },
    { id: 'anxiety', name: 'Anxiety', count: posts.filter(p => p.category === 'anxiety').length },
    { id: 'depression', name: 'Depression', count: posts.filter(p => p.category === 'depression').length },
    { id: 'stress', name: 'Stress', count: posts.filter(p => p.category === 'stress').length },
    { id: 'motivation', name: 'Motivation', count: posts.filter(p => p.category === 'motivation').length },
    { id: 'sleep', name: 'Sleep', count: posts.filter(p => p.category === 'sleep').length },
    { id: 'support', name: 'General Support', count: posts.filter(p => p.category === 'support').length }
  ]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmitPost = () => {
    if (newPost.title && newPost.content) {
      // Mock submission
      alert('Post submitted successfully! It will appear after moderation review.')
      setNewPost({ title: "", content: "", category: "general", isAnonymous: true })
      setShowNewPost(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Peer Support Forum
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow students in a safe, anonymous, and moderated environment
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Badge variant="secondary">Anonymous</Badge>
              <Badge variant="secondary">Moderated</Badge>
              <Badge variant="secondary">Safe Space</Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* New Post Button */}
              <Button 
                onClick={() => setShowNewPost(true)} 
                className="w-full" 
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Forum Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Forum Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Active Users</span>
                    </div>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Total Posts</span>
                    </div>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">This Week</span>
                    </div>
                    <span className="font-medium">89</span>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="border-wellness/20 bg-wellness/5">
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Be respectful and kind</p>
                  <p>• No personal information sharing</p>
                  <p>• Report inappropriate content</p>
                  <p>• Support, don't diagnose</p>
                  <p>• Seek professional help for crises</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* New Post Form */}
              {showNewPost && (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>
                      Share your thoughts, ask for support, or start a discussion
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Input
                        placeholder="Post title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Share your thoughts... (Be respectful and supportive)"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={newPost.isAnonymous}
                            onChange={(e) => setNewPost(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                          />
                          Post anonymously
                        </label>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewPost(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitPost}>
                          Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts */}
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {post.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          {post.isAnonymous && (
                            <Badge variant="outline" className="text-xs">Anonymous</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        
                        <p className="text-foreground mb-4 leading-relaxed">
                          {post.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Reply className="w-4 h-4" />
                            <span>{post.replies} replies</span>
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Flag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredPosts.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ? 'Try adjusting your search terms' : 'Be the first to start a conversation!'}
                    </p>
                    <Button onClick={() => setShowNewPost(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Post
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}