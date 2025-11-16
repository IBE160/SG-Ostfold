### Prompt for Mockup Generation: Historical Reports View

**Objective:** Generate a high-fidelity mockup of a "Historical Shift Reports" screen for a modern, desktop-first web application named `ibe160`.

**1. Overall Design System & Style Guide:**

*   **Theme:** Dark Mode. The overall aesthetic is "Modern & Tech-Forward" – professional, clean, and data-driven.
*   **Color Palette:**
    *   **Background:** `#111827` (Very Dark Blue-Grey)
    *   **Card/Content Background:** `#1f2937`
    *   **Primary Accent:** `#38bdf8` (Vibrant Blue for interactive elements)
    *   **Primary Text:** `#d1d5db` (Light Grey)
    *   **Secondary Text/Labels:** `#9ca3af` (Lighter Grey)
    *   **Borders:** `#374151`
*   **Typography:**
    *   **Font:** `Inter` (or a similar modern sans-serif like Roboto).
    *   **Base Font Size:** 16px.
*   **Spacing:** Use a consistent 8px grid system for all padding, margins, and spacing between elements.
*   **Corner Radius:** `0.5rem` (8px) for all components like cards, buttons, and inputs.

**2. Application Layout:**

*   The screen should be part of a larger application that has a **fixed sidebar navigation on the left** (width: 220px).
*   The main content area, where the reports table will be, is to the right of the sidebar.
*   The sidebar should show navigation links like "Dashboard", "Shift Reports" (active), and "Settings".

**3. Screen Mockup Request: "Historical Shift Reports"**

*   **Philosophy:** Data-Driven & Analytical. The layout should prioritize filtering and a clear, sortable table view for managers to quickly find specific reports.
*   **Header:** At the top of the main content area, include a header with the title "Historical Shift Reports" and an outline-style "Export CSV" button on the right.
*   **Main Content:**
    *   **Filter Panel:** A card component at the top that contains the filter controls.
        *   **Layout:** A horizontal row of filter inputs.
        *   **Controls:**
            *   A Date Picker for the start date.
            *   A Date Picker for the end date.
            *   A Dropdown/Select for "Shift" (with "All Shifts" as the default).
            *   A Text Input for "Area" (with a placeholder "Filter by Area").
            *   A solid blue "Apply Filters" button.
    *   **Data Table:** Below the filter panel, display a data table with the following columns: "Date", "Shift", "Area", "Orders", "Overtime", "Sick Leave", "Actions".
        *   **Styling:** The table should have clear header rows and subtle borders between rows.
        *   **Content:** Populate the table with 3-4 rows of sample data.
        *   **Actions Column:** In the "Actions" column, each row should have a "View" link styled with the Primary Accent color.

**4. Summary of Key Attributes:**

*   **Screen:** Historical Shift Reports
*   **Layout:** A filter panel card above a data table, next to a fixed sidebar.
*   **Theme:** Dark, with vibrant blue accents.
*   **Key Components:** Sidebar, Date Pickers, Dropdowns, Text Inputs, Data Table, Buttons.
*   **State to Show:** A typical view with filters applied and a populated table.
