# Implementation Report – OnBoard / FyndMe Dashboard

## Overview
This project implements a responsive dashboard built with **Next.js 13+ (App Router)**, **Tailwind CSS**, and **Recharts**.  
It displays statistics, user verification tables (Pending/Completed), promotions, performance summaries, ads cards, and charts for visits/clicks and conversions.

## Features Implemented
1. **Dashboard Layout**
   - Multiple sections for stats, tables, promotions, ads, and charts.
   - Spacing and alignment match the Figma reference using Tailwind CSS utilities.

2. **User Verification Tables**
   - **Pending Requests**: Filtered from `data.csv` where ID/Portfolio verification = `"Not verified"`.
   - **Completed Requests**: Filtered where both verifications = `"Verified"`.
   - Pagination and collapsible functionality.

3. **Charts & Stats**
   - Visits vs Clicks multi-line chart.
   - Conversions data visualization.
   - Static statistical cards for quick insights.

4. **Backend Integration**
   - Simple Node.js/Express backend (`/server`) serving API data.
   - Frontend uses Axios for API calls.

## Technical Considerations & Trade-offs
- **Static CSV Parsing**: Used `data.csv` for simplicity and faster local development; can be replaced with a live API for production.
- **Static Chart Data**: Charts use mock datasets until backend metrics are available.
- **Styling Precision**: Applied exact px/gap values from Figma for design fidelity, which slightly reduces flexibility for responsive breakpoints.
- **App Router in Next.js 13+**: Chosen for modern routing and performance benefits, but requires more granular client/server component separation.
