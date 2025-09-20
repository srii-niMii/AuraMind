import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Phone, Video, MessageSquare, Star } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface Counselor {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  reviews: number
  avatar: string
  nextAvailable: string
  sessionTypes: ('in-person' | 'video' | 'phone')[]
}

interface TimeSlot {
  time: string
  available: boolean
}

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<'in-person' | 'video' | 'phone'>('video')

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress'],
      rating: 4.9,
      reviews: 127,
      avatar: '👩‍⚕️',
      nextAvailable: 'Today at 2:00 PM',
      sessionTypes: ['in-person', 'video', 'phone']
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      title: 'Student Counseling Specialist',
      specialties: ['Social Anxiety', 'Relationships', 'Self-Esteem'],
      rating: 4.8,
      reviews: 98,
      avatar: '👨‍⚕️',
      nextAvailable: 'Tomorrow at 10:00 AM',
      sessionTypes: ['video', 'phone']
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      title: 'Trauma & Crisis Counselor',
      specialties: ['Trauma', 'Crisis Support', 'PTSD'],
      rating: 4.9,
      reviews: 156,
      avatar: '👩‍💼',
      nextAvailable: 'Today at 4:30 PM',
      sessionTypes: ['in-person', 'video']
    }
  ]

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true },
  ]

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />
      case 'phone': return <Phone className="w-4 h-4" />
      case 'in-person': return <MapPin className="w-4 h-4" />
      default: return <Video className="w-4 h-4" />
    }
  }

  const handleBooking = () => {
    if (selectedCounselor && selectedTime) {
      // Mock booking process
      alert(`Booking confirmed!\n\nCounselor: ${counselors.find(c => c.id === selectedCounselor)?.name}\nDate: ${selectedDate?.toDateString()}\nTime: ${selectedTime}\nType: ${sessionType}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Book a Counseling Session
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with licensed mental health professionals in a safe, confidential environment
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Badge variant="secondary">Confidential</Badge>
              <Badge variant="secondary">Licensed Professionals</Badge>
              <Badge variant="secondary">Flexible Scheduling</Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Counselors */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Available Counselors</h2>
              
              {counselors.map((counselor) => (
                <Card 
                  key={counselor.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedCounselor === counselor.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCounselor(counselor.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{counselor.avatar}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{counselor.name}</h3>
                            <p className="text-muted-foreground">{counselor.title}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{counselor.rating}</span>
                            <span className="text-muted-foreground text-sm">({counselor.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {counselor.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{counselor.nextAvailable}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {counselor.sessionTypes.map((type) => (
                            <Button
                              key={type}
                              variant={sessionType === type ? "default" : "outline"}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSessionType(type)
                              }}
                              className="flex items-center gap-1"
                            >
                              {getSessionIcon(type)}
                              <span className="capitalize">{type}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </CardContent>
              </Card>

              {/* Time Slots */}
              {selectedDate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Available Times
                    </CardTitle>
                    <CardDescription>
                      {selectedDate.toDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          size="sm"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="justify-center"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Booking Summary */}
              {selectedCounselor && selectedTime && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium">
                        {counselors.find(c => c.id === selectedCounselor)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {counselors.find(c => c.id === selectedCounselor)?.title}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        {selectedDate?.toDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {selectedTime}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {getSessionIcon(sessionType)}
                        <span className="capitalize">{sessionType} session</span>
                      </div>
                    </div>
                    
                    <Button onClick={handleBooking} className="w-full" size="lg">
                      Confirm Booking
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      You'll receive a confirmation email with session details and access instructions.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Emergency Contact */}
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">If you're in crisis or having thoughts of self-harm:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Crisis Line: 988</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Text HOME to 741741</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}