# BeanVoyage Coffee Shop

A modern, responsive e-commerce website for BeanVoyage Coffee Roastery, built with Next.js and TypeScript.

## Features

- **Product Catalog**: Browse our premium coffee collection
- **User Authentication**: Secure login and registration
- **Shopping Cart**: Add products and manage orders
- **User Profiles**: Manage personal information and preferences
- **Order History**: Track past purchases and order status
- **Admin Panel**: Product and inventory management
- **Responsive Design**: Optimized for all devices
- **Contact System**: Get in touch with our team

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/beanvoyage.git
cd beanvoyage
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure your Supabase credentials in `.env.local`

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

1. Create a Supabase project
2. Run the SQL commands from `supabase-setup.sql` in your Supabase SQL editor
3. Configure authentication settings in your Supabase dashboard

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
├── context/            # React context providers
├── lib/                # Utility functions and configurations
└── styles/             # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

BeanVoyage Roastery & HQ  
45 Kandy Road, Colombo 07, Sri Lanka  
Email: hello@beanvoyage.com  
Phone: +94 11 234 5678  
Instagram: @beanvoyagecoffee
