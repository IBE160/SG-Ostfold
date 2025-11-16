### Prompt for Mockup Generation: Shift Report Form

**Objective:** Generate a high-fidelity mockup of a "New Shift Report" screen for a modern, desktop-first web application named `ibe160`.

**1. Overall Design System & Style Guide:**

*   **Theme:** Dark Mode. The overall aesthetic is "Modern & Tech-Forward" – professional, clean, and efficient.
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
    *   **Labels:** 14px, secondary text color.
    *   **Input Text:** 16px, primary text color.
*   **Spacing:** Use a consistent 8px grid system for all padding, margins, and spacing between elements.
*   **Corner Radius:** `0.5rem` (8px) for all components like cards, buttons, and inputs.

**2. Application Layout:**

*   The screen should be part of a larger application that has a **fixed sidebar navigation on the left** (width: 220px).
*   The main content area, where the form will be, is to the right of the sidebar.
*   The sidebar should show navigation links like "Dashboard", "Shift Reports" (active), and "Settings".

**3. Screen Mockup Request: "New Shift Report Form"**

*   **Philosophy:** Fast & Efficient. The layout should be optimized for quick data entry by an experienced user on a desktop computer.
*   **Header:** At the top of the main content area, include a header with the title "New Shift Report" and a secondary "Cancel" button on the right.
*   **Main Content:** The form itself should be contained within a single large Card component.
*   **Form Layout:** Use a **two-column grid layout** for the input fields to minimize scrolling.
*   **Form Fields (with labels positioned above each field):**
    *   **Column 1:**
        *   **Date:** (Date Picker) Label: "Date *". Default to today's date.
        *   **Area:** (Text Input) Label: "Area *". Placeholder: "e.g., Packing, Shipping".
        *   **Orders Processed:** (Number Input) Label: "Orders Processed *". Placeholder: "e.g., 1200".
    *   **Column 2:**
        *   **Shift:** (Dropdown/Select) Label: "Shift *". Options: "Morning (06:00-14:00)", "Evening (14:00-22:00)", "Night (22:00-06:00)".
        *   **Staffing Count:** (Number Input) Label: "Staffing Count *". Placeholder: "e.g., 15".
        *   **Overtime Hours:** (Number Input) Label: "Overtime Hours". Placeholder: "e.g., 10".
    *   **Full-Width Field (below the two columns):**
        *   **Notes:** (Textarea) Label: "Notes". Placeholder: "Any incidents, issues, or observations...". Should be a larger input field (e.g., 3-4 rows high).
*   **Action Button:**
    *   At the bottom of the form, include a full-width, solid blue **"Submit Report"** button (Primary Action style).
*   **Interaction State Example:**
    *   Show one of the fields (e.g., "Overtime Hours") in an error state, with a red border and a small red error message below it saying "Value must be between 0-24."

**4. Summary of Key Attributes:**

*   **Screen:** New Shift Report Form
*   **Layout:** Two-column form inside a card, next to a fixed sidebar.
*   **Theme:** Dark, with vibrant blue accents.
*   **Key Components:** Date Picker, Dropdown, Number Inputs, Textarea, Primary Button.
*   **State to Show:** Default state with one field showing a validation error.
