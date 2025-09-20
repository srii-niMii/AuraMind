# AuraMind - Mental Health Support Platform

A comprehensive mental health support platform built with React that provides AI-powered chat support, counselor booking, resources, and community features for students and individuals seeking mental health assistance.

## 🌟 Features

### Core Features
- **AI Support Chat** - Intelligent chatbot providing immediate emotional support and coping strategies
- **Counselor Booking** - Schedule sessions with professional mental health counselors
- **Resource Hub** - Curated mental health resources, articles, and self-help materials
- **Community Forum** - Peer support and discussion platform
- **Admin Dashboard** - Analytics and management tools for administrators
- **User Authentication** - Secure login and user management

### Key Capabilities
- **Crisis Detection** - AI automatically detects high-risk situations and provides crisis resources
- **Sentiment Analysis** - Real-time analysis of user messages to provide appropriate responses
- **Privacy-First Design** - End-to-end encryption and anonymous options
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark/Light Mode** - Theme switching for user preference
- **Real-time Analytics** - Track platform usage and mental health trends

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Charts & Analytics**: Recharts
- **Form Handling**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auramind
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── layout/            # Layout components (Header, etc.)
│   └── theme-provider.tsx # Theme management
├── pages/
│   ├── Home.tsx           # Landing page with features
│   ├── Chat.tsx           # AI support chat interface
│   ├── Bookings.tsx       # Counselor booking system
│   ├── Resources.tsx      # Mental health resources
│   ├── Forum.tsx          # Community discussion
│   ├── Dashboard.tsx      # Admin analytics dashboard
│   └── Auth.tsx           # Authentication page
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── assets/               # Images and static files
└── App.tsx               # Main application component
```

## 🎨 Design System

The project uses a comprehensive design system built with Tailwind CSS:

Key design principles:
- Accessibility-first approach
- Mobile-responsive design
- Consistent spacing and typography
- High contrast for readability
- Calming color palette suitable for mental health contexts

## 🔧 Configuration

### Theme Customization
Modify `src/index.css` and `tailwind.config.ts` to customize the design system.

### Route Configuration
Add new routes in `src/App.tsx` following the existing pattern.

### Environment Setup
For backend functionality, connect to Supabase.

## 📊 Key Components

### AI Chat System
- Sentiment analysis for user messages
- Contextual responses based on emotional state
- Crisis detection and intervention
- Coping strategy recommendations

### Analytics Dashboard
- Real-time usage metrics
- Mental health trend tracking
- User engagement analytics
- System health monitoring

### Resource Management
- Categorized mental health resources
- Search and filtering capabilities
- Bookmarking and sharing features

## 🚀 Deployment

### Vercel 
The project is configured for Vercel deployment with proper routing setup.

1. Connect your repository to Vercel
2. Deploy automatically on push to main branch
3. Configure custom domain if needed

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🔒 Privacy & Security

- **Data Protection**: No sensitive data stored locally
- **Anonymous Options**: Users can chat without creating accounts
- **Encryption**: All communications secured
- **GDPR Compliant**: Privacy-first architecture
- **Crisis Protocol**: Automatic detection and intervention for high-risk situations

## 🤝 Contributing

This project follows modern React development practices:
- TypeScript for type safety
- Component-driven architecture
- Responsive design principles
- Accessibility standards (WCAG 2.1)


## 📄 License

This project is licensed under the MIT License.

**Note**: This platform provides peer support and resources but is not a substitute for professional mental health care. Always consult with qualified mental health professionals for serious concerns.
