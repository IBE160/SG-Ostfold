# Shift Report Wizard Notes

This document clarifies the canonical location and usage of the Shift Report Wizard component within the project.

## Canonical Location

The authoritative implementation of the Shift Report Wizard is now located within the `frontend/` application.

*   **Wizard Component:** `frontend/src/components/shift-report/shift-report-wizard.tsx`
*   **Zod Schema:** `frontend/src/lib/schemas/shift-report.ts`
*   **Server Action:** `frontend/src/lib/actions/create-shift-report.ts`
*   **Theme Provider:** `frontend/src/components/theme-provider.tsx`
*   **Root Layout:** `frontend/app/layout.tsx`
*   **Main App Layout (with sidebar):** `frontend/app/(main)/layout.tsx`
*   **Shift Report Create Page Layout (no sidebar):** `frontend/app/(main)/shift-report/create/layout.tsx`
*   **Shift Report Create Page:** `frontend/app/(main)/shift-report/create/page.tsx`
*   **Global Styles:** `frontend/app/globals.css` (includes Material Symbols font import)

## Legacy `src` Folder

The `src/` folder at the project root (`C:\Users\thbje\Documents\IBE160\SG-Ostfold\src`) is now considered a legacy or experimental directory. The running Next.js application (under `frontend/`) no longer depends on any code or configurations within this root `src/` folder. It remains in the project but is effectively unused by the primary application.
