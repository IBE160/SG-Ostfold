### Prompt for Mockup Generation: Dashboard

**Objective:** Generate a high-fidelity mockup of the main "Dashboard" screen for a modern, desktop-first web application named `ibe160`.

**1. Overall Design System & Style Guide:**

*   **Theme:** Dark Mode. The overall aesthetic is "Modern & Tech-Forward" – professional, clean, and insightful.
*   **Color Palette:**
    *   **Background:** `#111827` (Very Dark Blue-Grey)
    *   **Card/Content Background:** `#1f2937`
    *   **Primary Accent:** `#38bdf8` (Vibrant Blue for interactive elements)
    *   **Primary Text:** `#d1d5db` (Light Grey)
    *   **Secondary Text/Labels:** `#9ca3af` (Lighter Grey)
    *   **Borders:** `#374151`
    *   **Success:** `#22c55e`
    *   **Error:** `#f43f5e`
*   **Typography:**
    *   **Font:** `Inter` (or a similar modern sans-serif like Roboto).
    *   **Base Font Size:** 16px.
*   **Spacing:** Use a consistent 8px grid system for all padding, margins, and spacing between elements.
*   **Corner Radius:** `0.5rem` (8px) for all components like cards, buttons, and inputs.

**2. Application Layout:**

*   The screen should be part of a larger application that has a **fixed sidebar navigation on the left** (width: 220px).
*   The main content area, where the dashboard will be, is to the right of the sidebar.
*   The sidebar should show navigation links like "Dashboard" (active), "Shift Reports", and "Settings".

**3. Screen Mockup Request: "Dashboard"**

*   **Philosophy:** Structured & Insightful. The layout should combine a professional structure with a clean, trend-focused display of data.
*   **Header:** At the top of the main content area, include a header with the title "Dashboard" and a dropdown/select menu on the right for choosing a time range (e.g., "Last 30 Days", "Last 7 Days", "This Quarter").
*   **Main Content:**
    *   **Primary Trend Chart:** A large card component that takes up the full width of the content area.
        *   **Title:** "Orders per Hour: Trend & Forecast".
        *   **Content:** A placeholder for a line chart showing a positive trend.
    *   **KPI Cards Grid:** Below the main chart, display a three-column grid of smaller KPI cards.
        *   **Card 1 (Success):**
            *   **Value:** "↓ 2%" (use the Success color `#22c55e`).
            *   **Label:** "Sick Leave (vs. Avg)".
        *   **Card 2 (Error):**
            *   **Value:** "↑ 15%" (use the Error color `#f43f5e`).
            *   **Label:** "Overtime (vs. Avg)".
        *   **Card 3 (Standard):**
            *   **Value:** "120" (use the Primary Accent color `#38bdf8`).
            *   **Label:** "Avg. Orders/Hr".

**4. Summary of Key Attributes:**

*   **Screen:** Dashboard
*   **Layout:** A large chart card above a three-column grid of KPI cards, next to a fixed sidebar.
*   **Theme:** Dark, with vibrant blue accents and specific colors for success/error indicators.
*   **Key Components:** Sidebar, Dropdown, Cards, Chart Placeholder.
*   **State to Show:** A typical view with positive and negative trend indicators.
