# Story Context: S-1.1 - Initialize Next.js Project

**Story Key:** S-1.1
**Epic:** E-1 (Foundation & Setup)
**Sprint:** 1
**Author:** Bob, Scrum Master
**Date:** 2025-12-06
**Status:** ready for sprint demo

---

## 1. Story Summary

This story focuses on **initializing the frontend application structure** for the Shift & KPI Reporting Solution.
-   **Purpose:** To establish a robust and consistent technical foundation for the frontend, enabling subsequent feature development.
-   **Role:** As a Developer, I want a Next.js project initialized with TypeScript and Tailwind CSS, so that I can start building the frontend UI.
-   **Value:** Provides the necessary codebase, development tools, and initial structural and visual conformity. It unblocks authentication (S-2.1) and all other frontend stories.
-   **Fit into Sprint 1:** This is a core foundational task (Epic E-1), directly contributing to Sprint 1's goal of establishing the technical foundation. It's a prerequisite for S-2.1 (Login) and S-2.4 (RLS).

## 2. Detailed Requirements

The development agent must perform the following tasks:

-   **Project Initialization:**
    -   Initialize a new Next.js 14+ project within a `frontend/` directory at the project root.
    -   Configure the project to use:
        -   TypeScript (default)
        -   ESLint (default)
        -   Tailwind CSS (default)
        -   Next.js App Router (default)
        -   `src/` directory for application code (recommended)
-   **`shadcn/ui` Integration:**
    -   Integrate `shadcn/ui` into the Next.js project. Follow the official installation guide for Next.js.
    -   Add the following core UI primitives from `shadcn/ui`: `Button`, `Input`, `Label`, `Card`.
    -   **Configure Global Providers:** Set up the global `ToastProvider` from `shadcn/ui` to ensure `Toast` components function correctly across the application. Consider setting up other global providers (e.g., `DialogProvider`, `TooltipProvider`) if `shadcn/ui` components requiring them are integrated.
-   **Global Theme and Styling:**
    -   **Dark Theme:** Configure Tailwind CSS to implement the project's global dark theme using the color palette from `ux-design-specification.md`:
        -   `primary: #3abff8`
        -   `background-dark: #101d23` (global background)
        -   `content-bg: #182c34` (for cards, tables)
        -   `border: #305869`
        -   `text-primary: #ffffff`
        -   `text-secondary: #8fb9cc`
    -   **Typography:** Configure the `Inter` font globally for headings (700-900 weight), body text (400 weight), and secondary text (`#8fb9cc`). This involves importing and configuring `Inter` via `@next/font/google` and applying it via Tailwind.
-   **Base Application Layout:**
    -   Create the main application layout using the Next.js App Router (`app/layout.tsx`).
    -   Implement a **persistent left sidebar** component within this layout. It should adhere to the `ux-design-specification.md` rules:
        -   Tailwind `w-72` for width.
        -   `background: #182c34`.
        -   `border: #305869`.
    -   Include basic **navigation placeholder menu items** within the sidebar (e.g., links for "Dashboard" and "Shift Reports" - these do not need to be functional yet).
    -   The main content area should have a simple **placeholder text or component** displaying "Dashboard".
-   **Routing & Folder Structure:**
    -   Create the Next.js App Router folder structure: `/app`.
    -   Create the `/app/(auth)/login` route folder with a basic placeholder `page.tsx` for the upcoming login story (S-2.1).
    -   Establish the overall folder structure consistent with architecture requirements (`architecture.md`):
        -   `/app` (Next.js App Router pages)
        -   `/app/(auth)/...` (for authentication-related routes)
        -   `/components` (for reusable UI components)
        -   `/components/ui` (for `shadcn/ui` components)
        -   `/lib` (for utility functions, e.g., Supabase client setup later)
        -   `/hooks` (for React hooks)
        -   `/styles` (for global CSS, e.g., `globals.css` for Tailwind)
-   **Documentation:**
    -   Create a `frontend/README.md` file with clear instructions on how to set up, run, and develop the frontend application.

## 3. Constraints

-   Must adhere to the UX Design Specification for visual identity, layout, and responsiveness.
-   Must follow the Architecture Specification, specifically regarding the Next.js App Router and modular frontend structure.
-   Must use Next.js 14+ for project initialization.
-   Must use TypeScript, Tailwind CSS, and `shadcn/ui` as core technologies.
-   The environment must be correctly prepared for upcoming stories, particularly the S-2.1 login flow.

## 4. Acceptance Criteria

Upon completion of this story, the following must be verifiable:

-   A Next.js project is successfully initialized within a `frontend/` directory.
-   The application builds and runs locally without errors via `npm run dev` or `pnpm dev`.
-   The browser displays a persistent left sidebar (`w-72`) and a main content area placeholder ("Dashboard"), visually conforming to the `ux-design-specification.md` rules (colors, spacing, typography).
-   Tailwind CSS and `shadcn/ui` are correctly configured and functional. This can be verified by using at least one `shadcn/ui` component (e.g., `Button`) and observing correct styling.
-   The global dark theme, color palette, and `Inter` typography from the UX spec are applied correctly across the base layout.
-   The `/app/(auth)/login` route folder exists and contains a basic placeholder `page.tsx`.
-   The specified folder structure (e.g., `/components`, `/lib`, `/hooks`, `/styles`) is established.
-   A `frontend/README.md` file exists and contains clear, concise instructions for setting up and running the frontend development environment.
-   The codebase passes initial TypeScript and ESLint checks with no critical errors or warnings.
-   The global `ToastProvider` from `shadcn/ui` (and any other necessary global providers like `DialogProvider` or `TooltipProvider` if related `shadcn/ui` components are installed) is configured and available in the root layout.

## 5. Dependencies

-   None (this story is a starting point for frontend development).

## 6. Deliverables for Dev Agent

The successful completion of this story will result in the following artifacts:

-   The complete **project scaffolding** (files and folder structure) within the `frontend/` directory.
-   All necessary **configuration files** for Next.js, TypeScript, ESLint, Tailwind CSS (`tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `next.config.js`, `eslint.config.js` or `.eslintrc.json`).
-   Global CSS file (e.g., `frontend/app/globals.css` or `frontend/styles/globals.css`) containing the dark theme and `Inter` font imports and configurations.
-   The root `layout.tsx` file for the main application shell, including the `Sidebar` component.
-   Placeholder `page.tsx` files for `/app/(main)/dashboard` and `/app/(auth)/login`.
-   Installed `shadcn/ui` primitives (`Button`, `Input`, `Label`, `Card`, `Toast`) and their global providers configured in `layout.tsx`.
-   A `frontend/README.md` file.

---
**References:**
-   **UX Design Specification:** `docs/ux-design-specification.md`
-   **Architecture Specification:** `docs/architecture.md`
-   **Sprint 1 Plan:** `docs/sprint-plan-1.md`
-   **Epic Technical Context for Sprint 1:** `docs/sprint-artifacts/epic-tech-context-sprint-1.md`