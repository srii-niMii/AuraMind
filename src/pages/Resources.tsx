import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Headphones, Download, Play, Search, Heart, Brain, Zap, Moon } from "lucide-react";
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'exercise';
  category: string;
  duration: string;
  language: 'English' | 'Hindi' | 'Both';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url?: string;
}
export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const resources: Resource[] = [{
    id: '1',
    title: 'Understanding Anxiety: A Student\'s Guide',
    description: 'Learn about anxiety symptoms, triggers, and effective coping strategies specifically for students.',
    type: 'article',
    category: 'anxiety',
    duration: '8 min read',
    language: 'Both',
    difficulty: 'Beginner',
    url: 'https://www.apa.org/ed/schools/primer/anxiety'
  }, {
    id: '2',
    title: 'Breathing Techniques for Stress Relief',
    description: 'A guided audio session teaching various breathing exercises to reduce stress and anxiety.',
    type: 'audio',
    category: 'stress',
    duration: '15 minutes',
    language: 'English',
    difficulty: 'Beginner',
    url:'https://www.youtube.com/watch?v=LiUnFJ8P4gM'
  }, {
    id: '3',
    title: 'Sleep Hygiene for Better Mental Health',
    description: 'Video guide on creating healthy sleep habits that support your mental wellbeing.',
    type: 'video',
    category: 'sleep',
    duration: '12 minutes',
    language: 'Both',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/watch?v=fk-_SwHhLLc'
  }, {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Step-by-step audio guide to progressive muscle relaxation technique.',
    type: 'audio',
    category: 'relaxation',
    duration: '20 minutes',
    language: 'Hindi',
    difficulty: 'Beginner'
  }, {
    id: '5',
    title: 'Cognitive Behavioral Techniques',
    description: 'Learn CBT strategies to challenge negative thought patterns and improve your mood.',
    type: 'article',
    category: 'depression',
    duration: '12 min read',
    language: 'English',
    difficulty: 'Intermediate'
  }, {
    id: '6',
    title: 'Mindfulness Meditation for Students',
    description: 'A guided meditation session designed specifically for busy students.',
    type: 'audio',
    category: 'mindfulness',
    duration: '10 minutes',
    language: 'Both',
    difficulty: 'Beginner'
  }, {
    id: '7',
    title: 'Study-Life Balance Workshop',
    description: 'Comprehensive video on maintaining healthy boundaries between studies and personal life.',
    type: 'video',
    category: 'stress',
    duration: '25 minutes',
    language: 'English',
    difficulty: 'Intermediate'
  }, {
    id: '8',
    title: '5-Minute Energy Boost Exercise',
    description: 'Quick physical exercises to boost energy and mood between study sessions.',
    type: 'exercise',
    category: 'energy',
    duration: '5 minutes',
    language: 'Both',
    difficulty: 'Beginner'
  }];
  const categories = [{
    id: 'all',
    name: 'All Resources',
    icon: BookOpen
  }, {
    id: 'anxiety',
    name: 'Anxiety',
    icon: Brain
  }, {
    id: 'stress',
    name: 'Stress',
    icon: Zap
  }, {
    id: 'depression',
    name: 'Depression',
    icon: Heart
  }, {
    id: 'sleep',
    name: 'Sleep',
    icon: Moon
  }, {
    id: 'mindfulness',
    name: 'Mindfulness',
    icon: Brain
  }, {
    id: 'relaxation',
    name: 'Relaxation',
    icon: Heart
  }, {
    id: 'energy',
    name: 'Energy',
    icon: Zap
  }];
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'exercise':
        return <Play className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-500';
      case 'video':
        return 'bg-red-500';
      case 'audio':
        return 'bg-green-500';
      case 'exercise':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Mental Health Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Evidence-based tools, articles, and exercises to support your mental wellbeing
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Badge variant="secondary">Multi-language</Badge>
              <Badge variant="secondary">Professional Content</Badge>
              <Badge variant="secondary">Self-Paced</Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resources..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category.id)} className="flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>)}
            </div>
          </div>

          {/* Quick Access Tabs */}
          <Tabs defaultValue="browse" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="browse">Browse All</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6 mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-10 h-10 ${getTypeColor(resource.type)} rounded-full flex items-center justify-center`}>
                          <div className="text-white">
                            {getTypeIcon(resource.type)}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {resource.language}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{resource.duration}</span>
                        <Badge variant="secondary" className="text-xs">
                          {resource.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm" onClick={()=>resource.url && window.open(resource.url, '_blank')}>
                          <Play className="w-4 h-4 mr-2" />
                          {resource.type === 'article' ? 'Read' : resource.type === 'video' ? 'Watch' : resource.type === 'audio' ? 'Listen' : 'Start'}
                        </Button>
                        {resource.type !== 'exercise' && <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>}
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>

            <TabsContent value="articles" className="space-y-6 mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.filter(r => r.type === 'article').map(resource => <Card key={resource.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">{resource.duration}</span>
                        <Badge variant="outline">{resource.language}</Badge>
                      </div>
                      <Button className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6 mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.filter(r => r.type === 'audio').map(resource => <Card key={resource.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-green-500" />
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">{resource.duration}</span>
                        <Badge variant="outline">{resource.language}</Badge>
                      </div>
                       <Button className="w-full" onClick={()=>resource.url && window.open(resource.url,'_blank')}>
                        <Play className="w-4 h-4 mr-2" />
                        Listen Now
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6 mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.filter(r => r.type === 'video').map(resource => <Card key={resource.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-red-500" />
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">{resource.duration}</span>
                        <Badge variant="outline">{resource.language}</Badge>
                      </div>
                      <Button className="w-full" onClick={()=>resource.url && window.open(resource.url,'_blank')}>
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">Featured This Week</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-wellness">
                <CardContent className="p-8 text-center bg-[#61BED1]">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold text-white mb-4">Mental Health Awareness Week</h3>
                  <p className="text-white/90 mb-6">
                    Join our special collection of resources focused on breaking stigma and promoting wellbeing
                  </p>
                  <Button variant="secondary" size="lg">
                    Explore Collection
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-support">
                <CardContent className="p-8 text-center bg-[#61BED1]">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold text-white mb-4">Crisis Support Resources</h3>
                  <p className="text-white/90 mb-6">
                    Immediate help and support for students experiencing crisis or mental health emergencies
                  </p>
                  <Button variant="secondary" size="lg">
                    Get Help Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>;
}