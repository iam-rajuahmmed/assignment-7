# 🛒 বাজার দর (Bazar Dor)

## 📖 Description
**বাজার দর (Bazar Dor)** is a complete Next.js-based price tracking application designed to help consumers in Bangladesh track the daily prices of essential commodities across various markets. Users can view which products have seen a price increase or decrease, check detailed market-specific prices, and filter products by categories.

## 🚀 Key Features
1. **Dynamic Price Tracking**: Real-time ticker and dedicated sections for daily top risers (দাম বেড়েছে) and fallers (দাম কমেছে).
2. **Comprehensive Product Details**: Secure (protected) detailed views of individual products showing minimum, maximum, and average prices across different markets.
3. **Category Filtering & Sorting**: Easily browse products by categories (Rice, Dal, Oil, Veg, etc.) with advanced sorting options based on Bengali numeral parsing.
4. **Authentication System**: Secure sign-up and sign-in functionality utilizing BetterAuth, including Email/Password and Social Logins (Google & GitHub).
5. **Profile Management**: Dedicated user profile page where authenticated users can view and update their personal information seamlessly.

## 🛠️ Technologies Used
- **Framework**: Next.js 15 (App Router)
- **UI & Styling**: Tailwind CSS, DaisyUI, React Icons
- **Authentication**: BetterAuth (with Prisma ORM & SQLite)
- **Data Fetching**: Next.js native `fetch` with server/client components
- **Notifications**: React Hot Toast

## 💻 Running Locally

1. Clone the repository and navigate into the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma db push
   npx @better-auth/cli generate
   ```
4. Set up environment variables (`.env` file):
   ```env
   DATABASE_URL="file:./dev.db"
   BETTER_AUTH_SECRET="your-secret-string"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   # Add your GOOGLE_CLIENT_ID and GITHUB_CLIENT_ID if you want to use social auth
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🌐 Live URL
[Live Link] (Insert Live Deployment URL here)
