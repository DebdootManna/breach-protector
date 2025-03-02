# Breach Protector

A comprehensive data privacy platform that helps users detect data breaches and remove their personal information from data brokers.

## Features

- **Data Breach Detection**: Scan for your personal information in known data breaches and dark web sources
- **Data Broker Removal**: Automatically generate and send removal requests to data brokers
- **Ongoing Monitoring**: Receive real-time alerts when your information appears in new data breaches

## Tech Stack

- **Frontend**: Next.js 14 (TypeScript)
- **Backend**: Python (FastAPI)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Deployment**: Vercel + Railway

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/breach-protector.git
   cd breach-protector
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials and HIBP API key.

4. Set up Python backend:
   ```bash
   cd python-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

5. Start the development servers:
   ```bash
   # In the main directory
   npm run dev
   
   # In a separate terminal, in the python-backend directory
   python main.py
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

1. Connect to your Supabase project
2. Run the migration scripts in the `supabase/migrations` directory

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard

### Backend (Railway)

1. Connect your repository to Railway
2. Set up environment variables in Railway dashboard
3. Configure the Python service to run `python main.py`

## License

This project is licensed under the MIT License - see the LICENSE file for details.