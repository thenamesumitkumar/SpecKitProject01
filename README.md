# HR & Payroll Management Website

**Modern, Responsive HR and Payroll Management System built with Next.js**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd SpecKitProject01

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Credentials

### Employee Access
- **Email**: employee@company.com
- **Password**: password123

### Admin Access
- **Email**: admin@company.com
- **Password**: admin123

## 📋 Features

### Employee Self-Service Portal (ESS)
- ✅ Login & Dashboard with profile summary
- ✅ View current salary with breakdown
- ✅ Check leave balance and entitlements
- ✅ Monitor daily and monthly attendance
- ✅ **Coming Soon**: Request leaves, view payslips, settlement info

### Admin Portal
- ✅ Employee master data management
- ✅ Dashboard with key metrics
- ✅ **Coming Soon**: Payroll processing, leave approvals, F&F settlements, compliance reports

### Public Features
- ✅ Professional landing page
- ✅ Comprehensive FAQ section
- ✅ Responsive mobile design

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14.x with App Router |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.x |
| **UI Components** | React 18.x |
| **Data** | Embedded JSON files (MVP) |
| **Testing** | Jest, React Testing Library, Playwright |
| **Build** | Next.js static export (`next export`) |
| **Deployment** | Azure Static Web Apps, Netlify, Vercel, CDN |

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Home/landing page
│   ├── globals.css         # Global styles & Tailwind imports
│   ├── login/page.tsx      # Login page
│   ├── faq/page.tsx        # FAQ page
│   ├── ess/                # Employee portal (protected)
│   │   ├── layout.tsx      # ESS layout with sidebar
│   │   ├── page.tsx        # ESS dashboard
│   │   ├── salary/         # (Coming Soon)
│   │   ├── leave/          # (Coming Soon)
│   │   └── attendance/     # (Coming Soon)
│   └── admin/              # Admin portal (protected)
│       ├── layout.tsx      # Admin layout
│       ├── page.tsx        # Admin dashboard
│       ├── employees/      # Employee management
│       ├── payroll/        # (Coming Soon)
│       ├── leave-approvals/# (Coming Soon)
│       ├── settlement/     # (Coming Soon)
│       └── compliance/     # (Coming Soon)
├── components/
│   ├── AuthProvider.tsx    # Authentication context
│   ├── Header.tsx          # App header with user menu
│   └── Sidebar.tsx         # Role-based navigation
└── lib/
    ├── types.ts            # TypeScript interfaces
    ├── utils/
    │   ├── auth.ts         # Authentication functions
    │   ├── calculations.ts # Salary & settlement logic
    │   ├── dateUtils.ts    # Date & leave utilities
    │   └── validation.ts   # Input validation
    └── data/
        ├── employees.ts    # Employee master data
        ├── salaries.ts     # Salary structures
        ├── leaves.ts       # Leave balances
        ├── attendance.ts   # Attendance records
        ├── users.ts        # User accounts
        ├── faqs.ts         # FAQ entries
        ├── settlements.ts  # Settlement data
        └── complianceRules.ts # Tax & compliance rules

tests/
├── unit/                   # Unit tests (pending)
├── component/              # Component tests (pending)
├── e2e/                    # End-to-end tests (pending)
└── utils/                  # Test utilities

Configuration Files:
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── jest.config.js          # Jest testing configuration
├── playwright.config.ts    # Playwright E2E configuration
├── package.json            # Project dependencies
├── .eslintrc.json          # ESLint configuration
├── .prettierrc              # Prettier configuration
└── .gitignore              # Git ignore rules
```

## 📱 Responsive Design

- ✅ Mobile-first design (375px+)
- ✅ Tablet optimized (768px+)
- ✅ Desktop (1920px+)
- ✅ Touch-friendly interactions
- ✅ Accessible color contrast (WCAG AA)

## 🔐 Security

### MVP (Phase 1) - Development/Testing Only
⚠️ **Warning**: This MVP uses client-side authentication with localStorage. 
- Not suitable for production
- Demo credentials only
- No database backend

### Phase 2 Enhancements
- ✅ Backend authentication (OAuth/JWT)
- ✅ Secure HTTP-only cookies
- ✅ Real database with encryption
- ✅ HTTPS only deployment
- ✅ CSP headers & security policies

## 📊 Demo Data

### Included Test Data
- **8 Employees** with full profile details
- **5 Salary Structures** with allowances & deductions
- **Multiple Leave Balances** by employee and type
- **Attendance Records** with monthly summaries
- **FAQ Entries** categorized by topic
- **Tax Slabs** for India (FY 2025-26)

### Salary Calculation Examples

```
Basic Salary:        ₹100,000
HRA Allowance:       ₹30,000
Dearness Allowance:  ₹15,000
─────────────────────────────
Gross Salary:        ₹145,000

Provident Fund:      ₹12,000 (12%)
Professional Tax:    ₹200
─────────────────────────────
Net Salary:          ₹132,800
```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:ci

# E2E tests (requires dev server running)
npm run test:e2e

# All tests
npm test
```

### Test Coverage Target
- **Unit Tests**: 70%+ coverage in `src/lib/utils/`
- **Component Tests**: 25%+ of component behavior
- **E2E Tests**: 5%+ critical user journeys

## 🚀 Deployment

### Build for Production

```bash
# Build optimized bundle
npm run build

# Export to static HTML (for CDN/Static hosting)
npm run export

# This creates an 'out/' directory ready for deployment
```

### Deploy to Azure Static Web Apps

```bash
# Install Azure CLI
npm install -g @azure/cli

# Login to Azure
az login

# Create and deploy
az staticwebapp create --name hr-payroll --source . --branch main
```

### Deploy to Netlify

```bash
# Via Netlify CLI
npm install -g netlify-cli
netlify deploy --dir=out

# Or connect GitHub repo to Netlify dashboard
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 📈 Performance

### Lighthouse Scores (Target)
- ✅ Performance: >90
- ✅ Accessibility: >90
- ✅ Best Practices: >90
- ✅ SEO: >90

### Bundle Size
- Shared JS: 87.4 kB
- Per-page: 89-99 kB
- Total (with assets): <300 kB

### Load Time
- First Contentful Paint: <1s
- Largest Contentful Paint: <2s
- Cumulative Layout Shift: <0.1

## 🔄 Development Workflow

### Available Scripts

```bash
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run export           # Static export (for CDN)
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
npm run test             # Run tests in watch mode
npm run test:ci          # Run tests once with coverage
npm run test:e2e         # Run E2E tests
```

### Code Style

- **Formatter**: Prettier (configured in `.prettierrc`)
- **Linter**: ESLint with Next.js config
- **Language**: TypeScript (strict mode)

```bash
# Format code
npx prettier --write .

# Fix linting issues
npm run lint -- --fix
```

## 📚 Documentation

- [Quickstart Guide](./specs/001-hr-payroll/quickstart.md) - 5-minute setup and feature testing
- [Implementation Plan](./specs/001-hr-payroll/plan.md) - Technical architecture and design decisions
- [Data Model](./specs/001-hr-payroll/data-model.md) - Entity definitions and relationships
- [API Contracts](./specs/001-hr-payroll/contracts/api-contracts.md) - (Phase 2) Backend API specifications
- [Research Documentation](./specs/001-hr-payroll/research.md) - Technical decisions and rationale
- [Specification](./specs/001-hr-payroll/spec.md) - User stories and requirements

## 🐛 Known Issues / Limitations

### MVP Phase 1
- ⚠️ No real leave request workflow (mock data only)
- ⚠️ No payroll processing
- ⚠️ No PDF export functionality
- ⚠️ Single jurisdiction (India) only
- ⚠️ No email notifications
- ⚠️ Client-side authentication (not secure)
- ⚠️ Embedded data only (not scalable)

### Phase 2 Roadmap
- ✅ Backend API with real database
- ✅ Secure authentication (OAuth/JWT)
- ✅ Email notifications
- ✅ PDF exports (payslips, settlements)
- ✅ Multi-country tax support
- ✅ Attendance tracking with QR codes
- ✅ Mobile app (React Native)

## 🤝 Contributing

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create Pull Request
```

## 📝 License

Proprietary - All rights reserved

## 📞 Support

For issues, questions, or feedback:
- GitHub Issues: [Project Issues](./../../issues)
- Email: support@company.com
- Slack: #hr-payroll-dev

---

## 🎯 Project Status

| Phase | Status | ETA |
|-------|--------|-----|
| **Phase 1: MVP UI** | ✅ COMPLETE | Done |
| **Phase 2: Backend** | ⏳ PLANNED | Q2 2026 |
| **Phase 3: Mobile** | 📋 BACKLOG | Q3 2026 |
| **Phase 4: Analytics** | 📋 BACKLOG | Q4 2026 |

---

**Version**: 1.0.0-alpha  
**Last Updated**: 2026-01-20  
**Maintained by**: Development Team  
**Repository**: 001-hr-payroll branch
