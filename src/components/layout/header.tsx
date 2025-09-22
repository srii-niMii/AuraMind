import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Heart, User, Calendar, MessageCircle, BookOpen, BarChart3,LogOut} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth();
  const location = useLocation()

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "Chat", href: "/chat", icon: MessageCircle },
    { name: "Bookings", href: "/bookings", icon: Calendar },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "Community", href: "/forum", icon: MessageCircle },
  ]

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-wellness rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-wellness-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AuraMind</h1>
              <p className="text-xs text-muted-foreground">Student Support</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {user?.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}