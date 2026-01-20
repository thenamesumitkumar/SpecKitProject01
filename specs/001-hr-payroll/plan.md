# Implementation Plan: Modern HR and Payroll Management Website

**Branch**: `001-hr-payroll` | **Date**: 2026-01-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-hr-payroll/spec.md`

**Note**: This plan outlines the technical approach, data modeling, and task breakdown for building a modern HR and Payroll management website using Next.js static site generation with embedded dummy data.

## Summary

Build a modern, fully responsive HR and Payroll management website with Employee Self-Service (ESS) portal, automated salary calculations, leave/attendance management, F&F settlement module, and statutory compliance features. Static site built with Next.js (next export) using embedded dummy data for MVP. Deployable to Azure Static Web Apps, Netlify, or similar CDN-based platforms. Sleek, mobile-first design aligned with Static Web App Constitution principles: static-first delivery, progressive enhancement, performance optimization, accessibility (WCAG 2.1 AA), and automated build pipeline.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 14.x with static site generation (next export)  
**Primary Dependencies**: React 18.x, Next.js (SSG), Tailwind CSS 3.x, TypeScript, date-fns (optional, date utilities)  
**Storage**: Embedded JSON data files in project (dummy data for MVP; no backend API required)  
**Testing**: Jest (unit tests), React Testing Library (component tests), Playwright (E2E tests)  
**Target Platform**: Web (desktop + mobile); static HTML/CSS/JS output deployable to CDN platforms  
**Project Type**: Web application (frontend-only for MVP; backend integration deferred to Phase 2)  
**Performance Goals**: Page load < 2 seconds on 4G; Lighthouse score > 90 (performance, accessibility, best practices, SEO)  
**Constraints**: Static site generation (no server-side rendering); 24/7 availability; 99.5% uptime SLA  
**Scale/Scope**: Single organization MVP (up to 5,000 employees); 8+ user stories, 15 functional requirements, 14 success criteria

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASSES (all principles aligned)

| Principle | Requirement | This Plan | ✓ |
|-----------|-------------|-----------|---|
| **I. Static-First Delivery** | No server-side rendering; static HTML/CSS/JS only | Next.js static export (next export) generates static assets; no server-side code | ✅ |
| **II. Progressive Enhancement** | Core functionality without JavaScript; graceful degradation | HTML forms functional without JS; JavaScript enhances interactivity; dummy data embedded in HTML | ✅ |
| **III. Performance & Optimization** | Page load <2s on 4G; minified assets; image compression; cache-busting | Next.js automatic optimization; Tailwind CSS minification; next/image for optimization; static asset versioning | ✅ |
| **IV. Accessibility & SEO** | WCAG 2.1 AA; semantic HTML; alt text; structured data; meta tags | Next.js provides semantic HTML; Tailwind allows semantic markup; metadata configured per page; mobile-responsive design | ✅ |
| **V. Build & Deployment Pipeline** | Automated build; optimized static output; idempotent deployments | Next.js build process (next build + next export); output to static folder; deployable to Azure Static Web Apps, Netlify, CDN | ✅ |

**No violations. Specification and technical approach fully compliant with Static Web App Constitution.**

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
next-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with navigation
│   │   ├── page.tsx                # Landing page
│   │   ├── ess/
│   │   │   ├── layout.tsx          # ESS portal layout
│   │   │   ├── page.tsx            # ESS dashboard
│   │   │   ├── profile/page.tsx
│   │   │   ├── salary/page.tsx
│   │   │   ├── leave/page.tsx
│   │   │   ├── attendance/page.tsx
│   │   │   └── settlement/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx            # Admin dashboard
│   │   │   ├── employees/page.tsx
│   │   │   ├── payroll/page.tsx
│   │   │   └── compliance/page.tsx
│   │   └── faq/page.tsx            # FAQ page
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SalaryCard.tsx
│   │   ├── LeaveCard.tsx
│   │   ├── AttendanceTable.tsx
│   │   ├── EmployeeList.tsx
│   │   └── FAQAccordion.tsx
│   ├── lib/
│   │   ├── data/
│   │   │   ├── employees.ts        # Embedded employee data
│   │   │   ├── salaries.ts         # Embedded salary data
│   │   │   ├── leaves.ts           # Embedded leave data
│   │   │   ├── attendance.ts       # Embedded attendance data
│   │   │   ├── faqs.ts             # Embedded FAQ data
│   │   │   └── settlements.ts      # Embedded F&F data
│   │   ├── utils/
│   │   │   ├── calculations.ts     # Salary calculation logic
│   │   │   ├── dateUtils.ts        # Date/leave utilities
│   │   │   └── validation.ts       # Data validation
│   │   └── types.ts                # TypeScript interfaces
│   └── styles/
│       └── globals.css             # Tailwind + global styles
├── public/
│   └── images/                     # Logo, icons, etc.
├── tests/
│   ├── unit/
│   │   ├── calculations.test.ts
│   │   └── validation.test.ts
│   ├── component/
│   │   ├── SalaryCard.test.tsx
│   │   └── AttendanceTable.test.tsx
│   └── e2e/
│       ├── ess-portal.spec.ts      # Playwright E2E tests
│       └── admin.spec.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Structure Decision**: Web application structure using Next.js App Router with embedded data files. ESS portal and admin dashboard as separate route groups. All data managed through TypeScript files (not database). Static generation through next export produces standalone HTML/CSS/JS suitable for CDN deployment.

## Complexity Tracking

> **No Constitution violations. This section left empty as no complexity justifications needed.**

All implementation choices align with Static Web App Constitution. Complexity is well-managed through:
- Static site generation eliminates backend/database complexity
- Embedded data simplifies deployment and scaling for MVP
- Tailwind CSS and Next.js reduce styling complexity
- TypeScript ensures type safety and reduced bugs
- Modular component structure supports future expansion
