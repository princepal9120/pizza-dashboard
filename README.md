# Pizza Dashboard

A production-ready Next.js dashboard application for managing pizza orders. Built with modern web technologies, this application provides a secure and intuitive interface for tracking and managing pizza orders in real-time.

## Features

- **Secure Authentication**
  - Google OAuth 2.0 integration
  - Protected routes with middleware
  - Automatic redirects for unauthorized access

- **Dashboard Overview**
  - Real-time order statistics
  - Quick access to recent orders
  - Status-based order filtering
  - Revenue tracking

- **Order Management**
  - Comprehensive order table with sorting
  - Status tracking with visual indicators
  - Search and filter capabilities
  - Responsive design for all devices

- **User Experience**
  - Dark/Light mode support
  - Loading states and animations
  - Responsive layout
  - Accessible components

## Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Google Cloud Platform account for OAuth

### Environment Setup

1. Create a `.env.local` file in the root directory:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pizza-dashboard.git
```

2. Install dependencies:
```bash
cd pizza-dashboard
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Google OAuth Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google OAuth2 API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials (Client ID & Secret)
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

## Project Structure

```
├── app/                  # Next.js 13 app directory
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   └── orders/          # Orders management pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and configurations
├── store/              # Zustand state management
└── data/               # Mock data and types
```

## 🧩 Challenges Faced & Solutions

During the development process, I encountered and solved several technical issues:

### 1. Type Safety Issues in Next.js


Initially, the generated components lacked strict type definitions, which led to frequent TypeScript errors and unclear prop expectations.



### 2. Cloud Console Setup Issues


Setting up deployment on the cloud platform (e.g., Vercel or Firebase) was problematic due to misconfigured environment variables and missing build settings.



### 3. `next-themes` or `metro.config.js` Conflicts


When implementing dark/light mode using `next-themes`, I faced conflicts with theme detection and runtime errors due to module resolution issues. In mobile-related builds (e.g., React Native Web), `metro.config.js` caused issues.




## Future Improvements

-  Add real-time order updates with WebSocket
-  Implement order creation and editing
-  Add customer management system
-  Integrate with payment processing
-  Add analytics dashboard
-  Implement email notifications
-  Add inventory management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
