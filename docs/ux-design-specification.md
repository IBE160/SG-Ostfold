# UX Design Specification  
### Shift & KPI Reporting Solution  
**IBE160 – BMAD Phase: Validate UX Design**
---
## Table of Contents

- [UX Design Specification](#ux-design-specification)
    - [Shift \& KPI Reporting Solution](#shift--kpi-reporting-solution)
  - [**IBE160 – BMAD Phase: Validate UX Design**](#ibe160--bmad-phase-validate-ux-design)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Target Users \& Roles](#2-target-users--roles)
    - [2.1 Shift Leaders](#21-shift-leaders)
    - [2.2 Department Managers](#22-department-managers)
    - [2.3 Operations Manager](#23-operations-manager)
  - [3. Design Goals \& UX Principles](#3-design-goals--ux-principles)
    - [3.1 Design Goals](#31-design-goals)
    - [3.2 UX Principles](#32-ux-principles)
  - [4. Information Architecture](#4-information-architecture)
    - [4.1 Navigation Structure](#41-navigation-structure)
    - [4.2 Navigation Pattern](#42-navigation-pattern)
  - [5. Layout Specification](#5-layout-specification)
    - [5.1 Page Layout](#51-page-layout)
      - [Sidebar](#sidebar)
      - [Main Content](#main-content)
    - [5.2 Dashboard Layout](#52-dashboard-layout)
    - [5.3 Historical Layout](#53-historical-layout)
    - [5.4 Shift Report Layout (SR1–SR9)](#54-shift-report-layout-sr1sr9)
  - [6. Visual Identity \& Styling](#6-visual-identity--styling)
    - [6.1 Color Palette](#61-color-palette)
    - [6.2 Typography](#62-typography)
  - [7. Component Inventory](#7-component-inventory)
    - [7.1 Navigation](#71-navigation)
    - [7.2 KPI Cards](#72-kpi-cards)
    - [7.3 Tables](#73-tables)
    - [7.4 Forms](#74-forms)
    - [7.5 Buttons](#75-buttons)
    - [7.6 Alerts \& Messages](#76-alerts--messages)
  - [8. Interaction Design](#8-interaction-design)
    - [Buttons](#buttons)
    - [Forms](#forms)
    - [Navigation](#navigation)
  - [9. UX States](#9-ux-states)
    - [9.1 Loading](#91-loading)
    - [9.2 Empty State](#92-empty-state)
    - [9.3 Error State](#93-error-state)
    - [9.4 Success State](#94-success-state)
  - [10. UX Data Structure](#10-ux-data-structure)
    - [Dashboard KPIs](#dashboard-kpis)
    - [Historical Table](#historical-table)
    - [Shift Reports (SR1–SR9)](#shift-reports-sr1sr9)
  - [11. User Flows](#11-user-flows)
    - [Flow: Shift Registration](#flow-shift-registration)
    - [Flow: Manager KPI Analysis](#flow-manager-kpi-analysis)
  - [12. Non-Functional UX Requirements](#12-non-functional-ux-requirements)
    - [Performance](#performance)
    - [Usability](#usability)
    - [Accessibility](#accessibility)
  - [13. Constraints](#13-constraints)
  - [Appendix](#appendix)
    - [Related Documents](#related-documents)
    - [Core Interactive Deliverables](#core-interactive-deliverables)
    - [Optional Enhancement Deliverables](#optional-enhancement-deliverables)
    - [Next Steps \& Follow-Up Workflows](#next-steps--follow-up-workflows)
  - [14. Summary](#14-summary)

## 1. Introduction  
This UX Design Specification defines the visual structure, information architecture, interaction rules, and component system for the *Shift & KPI Reporting Solution*.  
It is based directly on the UX Design Direction prototype and extended with all BMAD-required elements.

The system supports:
- Efficient shift data entry (SR1–SR9)
- KPI dashboards for supervisors and managers
- Historical report filtering and export
- A modern, dark-mode-first UI

---

## 2. Target Users & Roles

### 2.1 Shift Leaders  
- Primary users  
- Register shift data daily  
- Complete SR1–SR9  
- Should be able to use the system without training  

### 2.2 Department Managers  
- Read access to reports  
- Use Dashboard and Historical pages  
- Filter by department, date, KPI  

### 2.3 Operations Manager  
- Full system access  
- Monitors KPIs and trends  
- Exports reports (Excel/CSV)

---

## 3. Design Goals & UX Principles

### 3.1 Design Goals  
- Clean and minimal dark UI  
- Clear visual hierarchy  
- KPI-first layout  
- Low cognitive load  
- Component-driven and scalable

### 3.2 UX Principles  
- **Consistency**: Unified component behavior  
- **Predictability**: Stable navigation and structured flows  
- **Clarity**: High contrast, modern typography  
- **Scalability**: Easy to expand with new pages  
- **Dark-mode First**: Optimized entire color system

**Interactive Mockups:**

- Design Direction Showcase Mockups from stich: [Mockup-Common-Layout.html](./stich/Mockup-Common-Layout.html)
- Design Direction Showcase Mockups from stich: [Mockup-Dashboard.html](./Mockup-Dashboard.html)
- Design Direction Showcase Mockups from stich: [Mockup-Historical.html](./stich/Mockup-Historical.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR1.html](./Mockup-SR1.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR2.html](./Mockup-SR2.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR3.html](./Mockup-SR3.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR4.html](./Mockup-SR4.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR5.html](./Mockup-SR5.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR6.html](./Mockup-SR6.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR7.html](./Mockup-SR7.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR8.html](./Mockup-SR8.html)
- Design Direction Showcase Mockups from stich: [Mockup-SR9.html](./Mockup-SR9.html)


---

## 4. Information Architecture

### 4.1 Navigation Structure

1. Common Layout  
2. Dashboard  
3. Historical  
4. Shift Report 1  
5. Shift Report 2  
6. Shift Report 3  
7. Shift Report 4  
8. Shift Report 5  
9. Shift Report 6  
10. Shift Report 7  
11. Shift Report 8  
12. Shift Report 9

### 4.2 Navigation Pattern  
- Persistent left sidebar  
- Active item highlighted (#223d49)  
- Clicking loads content into the main panel  

---

## 5. Layout Specification

### 5.1 Page Layout

#### Sidebar  
- Width: 72 (Tailwind)  
- Background: `#182c34`  
- Border: `#305869`  
- Vertical menu list  
- Hover + active states

#### Main Content  
- Responsive grid layout  
- 16–24px spacing  
- Cards and panels using dark content background  

### 5.2 Dashboard Layout  
- KPI cards at top  
- Trend/graph module in middle  
- Optional weekly comparison  

### 5.3 Historical Layout  
- Filter section at top  
- Large data table in middle  
- Summary KPIs at bottom  

### 5.4 Shift Report Layout (SR1–SR9)  
- Title  
- Form section  
- Next/Back buttons  
- Step-by-step validation  
- Linear progress flow

---

## 6. Visual Identity & Styling

### 6.1 Color Palette  
| Role | Hex | Description |
|------|------|-------------|
| Primary | #3abff8 | Accent color |
| Dark Background | #101d23 | Global background |
| Content Background | #182c34 | Cards, tables |
| Border | #305869 | Dividers |
| Text Primary | #ffffff | Headings, main text |
| Text Secondary | #8fb9cc | Labels |

### 6.2 Typography  
- Font: **Inter**  
- Headings: 700–900  
- Body text: 400  
- Secondary text: #8fb9cc  

---

## 7. Component Inventory

### 7.1 Navigation  
- Sidebar  
- Menu links  
- Active/hover states

### 7.2 KPI Cards  
- Bold numbers  
- Secondary labels  
- Optional trend indicators

### 7.3 Tables  
- Dark theme  
- Hover: #223d49  
- Grid borders: #305869  

### 7.4 Forms  
- Inputs, dropdowns, date pickers  
- Tailwind Forms plugin  
- Focus border: #3abff8  

### 7.5 Buttons  
- Primary (blue)  
- Secondary (dark)  
- Disabled state  

### 7.6 Alerts & Messages  
- Success  
- Error  
- Empty state screens  

---

## 8. Interaction Design

### Buttons  
- Hover: darker tone  
- Active: strong outline  
- Disabled: 50% opacity  

### Forms  
- Focus: bright accent border  
- Error: red border + helper text  

### Navigation  
- Smooth transitions  
- Active bold text  

---

## 9. UX States

### 9.1 Loading  
- KPI skeletons  
- Table spinner  

### 9.2 Empty State  
- "No data available" panel  

### 9.3 Error State  
- Red alert banner  

### 9.4 Success State  
- Green confirmation message  

---

## 10. UX Data Structure

### Dashboard KPIs  
- Total Orders  
- Orders per Hour  
- Absence %  
- Staff Count  
- Productivity Score  

### Historical Table  
- Date  
- Department  
- Shift Type  
- Orders  
- Hours  
- Absence %  
- Deviations  

### Shift Reports (SR1–SR9)  
Examples:  
- SR1: Shift metadata  
- SR3: Hours  
- SR4: Absence reasons  
- SR5: Order data  
- SR7: Deviations  

---

## 11. User Flows

### Flow: Shift Registration  
1. Open SR1  
2. Fill fields  
3. Next → SR2  
4. Continue to SR9  
5. Submit  
6. Confirmation state  

### Flow: Manager KPI Analysis  
1. Open Dashboard  
2. Review KPIs  
3. Open Historical  
4. Filter by date/department  
5. Export Excel  

---

## 12. Non-Functional UX Requirements

### Performance  
- Dashboard loads < 1.5 sec  
- Form submit < 1 sec  

### Usability  
- Must require zero training  
- Max 2 clicks between SR pages  

### Accessibility  
- WCAG 2.1 AA  
- Visible focus states  
- High contrast  

---

## 13. Constraints  
- Tailwind CSS  
- Tailwind Forms plugin  
- Dark mode only  
- Fully compatible with React/Next.js  
- Must work on mobile devices  

---
## Appendix

### Related Documents

- Product Requirements: [PRD-md](./PRD.md)
- Product Brief: [product-brief.md](./product-brief.md)
- Proposal: [proposal.md](proposal.md)
- Brainstorming: [bmad-shiftapp-inegration-and-proposal-alignment-rune-2025-10-29.md](./Fase%20O/bmad-shiftapp-lean-integration-and-proposal-alignment-Rune-2025-10-29.md)
- Brainstorming: [brainstorming-BMAD-AI-feedback-userflow-review-rune-2025-10-27.md](./Fase%20O/brainstorming-BMAD-AI-feedback-userflow-review-Rune-2025-10-27.md)
- Brainstorming: [brainstorming-data-entry-risk-thomas.md](./Fase%20O/Brainstorming-data-entry-risk-thomas.md)
- Brainstorming: [brainstorming-userflow-thomas.md](./Fase%20O/brainstorming-userflow-thomas.md)
  
  
### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: C:\Users\thbje\Documents\IBE160\SG-Ostfold/docs/ux-color-themes.html
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: [ux-design-directions.html](./ux-design-directions.html)
  - Interactive HTML with 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Optional Enhancement Deliverables

_This section will be populated if additional UX artifacts are generated through follow-up workflows._

<!-- Additional deliverables added here by other workflows -->

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context



## 14. Summary  
This document provides a **complete professional UX Design Specification**, including:
- Layout
- Components
- User flows
- Interaction rules
- States
- Data structure
- Accessibility
- Constraints

Fully ready for BMAD: *Validate UX Design*.

