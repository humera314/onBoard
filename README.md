# OnBoard / FyndMe Dashboard

A responsive dashboard built with **Next.js 13+ (App Router)**, **Tailwind CSS**, and **Recharts**.  
It shows stats, user verification tables (Pending/Completed), promotions, performance summaries, ads cards, and charts for visits/clicks and conversions.

---

## 🔧 How to Install & Run (Required)
- For backend

cd server
npm install
node index
API will be at: http://localhost:5000

-Frontend

npm install
npm run dev
App will start at: http://localhost:3000
you can see http://localhost:3000/performance-summary



🗂 Data Source
This project uses the provided data.csv file.

Location: /public/data.csv

The CSV is parsed in the frontend and mapped into a list of user records.
Filtering is applied in memory to categorize pending and completed verification requests.


🧠 Development Approach & Key Decisions
UI Framework: Used Next.js (App Router) for page routing and component-based structure.

Styling: Tailwind CSS with consistent spacing utilities (px-[val], py-[val], gap-[val]) to match Figma design values.

Backend Integration: Connected backend to frontend using Axios for API calls.

Data Handling: Modified tables to dynamically render data from data.csv based on verification status.

Statistics: Added static statistical cards for quick insights.

Layout Adjustments: Applied px-[160px] for left-side spacing, adjusted gaps, and ensured each section is displayed in separate cards for better visual organization.


📌 Assumptions
Member Name, Username, ID Verification, Portfolio Verification, No. Of Portfolios

“Not verified” means pending; “Verified” on both checks means completed.

Routes /req-pending and /req-complete exist  on  http://localhost:3000/req-pending
http://localhost:3000/req-complete

Static datasets are currently used for charts; they can be integrated with real data if available.

