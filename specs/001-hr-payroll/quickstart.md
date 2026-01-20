# Quickstart: HR and Payroll Management Website

**Purpose**: Get the Next.js project running locally in 5 minutes.  
**Target**: Developers, designers, stakeholders wanting to see the MVP in action.

---

## Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** (npm 9.x+)
- **Git** (for version control)
- **Code Editor** (VS Code recommended)

Verify installation:
```bash
node --version    # v18.x or higher
npm --version     # 9.x or higher
git --version     # Latest
```

---

## Quick Start (5 minutes)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-org/hr-payroll-webapp.git
cd hr-payroll-webapp

# Install dependencies
npm install

# Or with yarn
yarn install
```

**Expected output**: Installation completes without errors.

---

### 2. Start Development Server

```bash
npm run dev
```

**Output**:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.3s
```

---

### 3. Open in Browser

Navigate to: **http://localhost:3000**

You should see:
- Landing page with HR/Payroll features showcase
- "Login to ESS Portal" call-to-action button
- Navigation to FAQ and other sections

---

## Demo Login Credentials

Use these credentials to test the ESS Portal:

### Employee (Basic User)
```
Email: john.doe@company.com
Password: demo123
```

### HR Admin
```
Email: admin@company.com
Password: admin123
```

---

## Testing the MVP Features

### 1. ESS Portal - View Profile
1. Login with employee credentials
2. Navigate to **"My Profile"**
3. View employee information (name, department, designation, etc.)

### 2. ESS Portal - View Salary
1. From dashboard, click **"Salary & Payslip"**
2. View current month's salary breakdown:
   - Base salary
   - Allowances
   - Deductions
   - Net salary
3. View previous months' payslips

### 3. ESS Portal - Leave Management
1. Click **"Leave & Time Off"**
2. View available leave balance:
   - Paid Leave: X days
   - Sick Leave: Y days
   - Casual Leave: Z days
3. Click **"Request Leave"**
4. Select dates and submit
5. Leave request appears in pending section
6. Try manual approval (admin feature)

### 4. ESS Portal - Attendance
1. Click **"Attendance"**
2. View monthly attendance summary
3. See calendar with daily status (Present, Absent, Leave, Holiday)

### 5. Admin Dashboard
1. Logout and login as admin (admin@company.com)
2. Navigate to **"/admin"**
3. View employee list with filter options
4. Click on employee to see full profile
5. View monthly payroll summary
6. View pending leave approvals
7. Approve/reject leaves

### 6. F&F Settlement (Admin)
1. In admin dashboard, navigate to **"Settlement"**
2. Select an employee (demo data includes exit dates)
3. View settlement calculation:
   - Pending salary
   - Leave encashment
   - Gratuity calculation
   - Deductions
   - Net settlement due
4. Approve settlement

### 7. FAQ Section
1. Navigate to **"/faq"** from navigation
2. View categorized FAQs
3. Use search to find answers

### 8. Responsive Design
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M on Windows, Cmd+Shift+M on Mac)
3. Test on different screen sizes:
   - Mobile (375px - iPhone SE)
   - Tablet (768px - iPad)
   - Desktop (1920px)

---

## Project Structure

```
hr-payroll-webapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── ess/
│   │   │   ├── page.tsx            # ESS dashboard
│   │   │   ├── profile/page.tsx    # Employee profile
│   │   │   ├── salary/page.tsx     # Salary & payslips
│   │   │   ├── leave/page.tsx      # Leave management
│   │   │   └── attendance/page.tsx # Attendance
│   │   ├── admin/
│   │   │   ├── page.tsx            # Admin dashboard
│   │   │   ├── employees/page.tsx  # Employee management
│   │   │   ├── payroll/page.tsx    # Payroll management
│   │   │   └── settlement/page.tsx # F&F settlements
│   │   └── faq/page.tsx            # FAQ page
│   ├── components/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── SalaryCard.tsx          # Salary display component
│   │   ├── LeaveCard.tsx           # Leave balance component
│   │   └── [other components]
│   ├── lib/
│   │   ├── data/
│   │   │   ├── employees.ts        # Employee data
│   │   │   ├── salaries.ts         # Salary data
│   │   │   ├── leaves.ts           # Leave data
│   │   │   └── [other data files]
│   │   ├── utils/
│   │   │   ├── calculations.ts     # Salary calc logic
│   │   │   └── validation.ts       # Validation functions
│   │   └── types.ts                # TypeScript interfaces
│   └── styles/
│       └── globals.css             # Tailwind + global styles
├── public/
│   └── images/                     # Logo, icons
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Generate static site (for deployment to Azure Static Web Apps, Netlify, etc.)
npm run export

# Start production server
npm start

# Run tests
npm test

# Run unit tests only
npm run test:unit

# Run component tests
npm run test:component

# Run E2E tests
npm run test:e2e

# Run linter
npm run lint

# Format code with Prettier
npm run format

# Generate Lighthouse report
npm run lighthouse

# Check accessibility
npm run a11y
```

---

## Customization Guide

### Change Demo Data

Edit data files in `src/lib/data/`:

**src/lib/data/employees.ts**:
```typescript
export const employees = [
  {
    id: 'emp001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    // ... other fields
  },
  // Add more employees
];
```

**src/lib/data/salaries.ts**:
```typescript
export const salaries = [
  {
    employeeId: 'emp001',
    base: 500000,           // Change base salary
    allowances: {
      housRent: 100000,
      dearness: 50000,
    },
    // ... other components
  },
];
```

### Styling

Tailwind CSS is configured. Modify `tailwind.config.ts` for theme changes:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-brand-color',
      },
    },
  },
};
```

### Add New Pages

Create new routes by adding files to `src/app/`:

```typescript
// src/app/new-feature/page.tsx
export default function NewFeature() {
  return <div>New feature content</div>;
}
```

---

## Deployment

### Build Static Site

```bash
npm run build
npm run export
```

Generates `out/` directory with static HTML/CSS/JS.

### Deploy to Azure Static Web Apps

```bash
# Install Azure CLI
npm install -g @azure/cli

# Login
az login

# Create static web app
az staticwebapp create --name hr-payroll --resource-group my-rg --source . --location "East US"

# Deploy
cd out/
az storage blob upload-batch -d '$web' -s .
```

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build && npm run export`
4. Set publish directory: `out`
5. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

---

## Testing

### Run Unit Tests

```bash
npm run test:unit

# Example test: salary calculation
npm run test:unit -- calculations.test.ts
```

### Run Component Tests

```bash
npm run test:component

# Test specific component
npm run test:component -- SalaryCard.test.tsx
```

### Run E2E Tests

```bash
npm run test:e2e

# Run specific test
npm run test:e2e -- ess-portal.spec.ts
```

### Check Accessibility

```bash
npm run a11y

# Opens report in browser
```

### Generate Lighthouse Report

```bash
npm run lighthouse

# Check performance and accessibility scores
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000    # macOS/Linux

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors

```bash
# Verify TypeScript
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Session Not Persisting

Demo uses localStorage. Clear browser storage:
1. Open DevTools (F12)
2. Go to **Storage** → **Local Storage**
3. Clear all
4. Refresh page and login again

---

## Next Steps

### For Developers
1. Review `research.md` for technical decisions
2. Read `data-model.md` for data structure details
3. Study `contracts/api-contracts.md` for API specs
4. Check `src/lib/utils/calculations.ts` for salary logic
5. Run tests: `npm test`

### For Designers
1. Review Tailwind CSS configuration in `tailwind.config.ts`
2. Component files in `src/components/`
3. Test responsive design with DevTools
4. Modify colors/fonts in Tailwind config

### For Stakeholders
1. Test all user stories (see "Testing the MVP Features" above)
2. Verify success criteria alignment
3. Gather feedback for Phase 2 planning

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **React**: https://react.dev
- **Jest Testing**: https://jestjs.io
- **Playwright E2E**: https://playwright.dev

---

## Support & Feedback

- **Issues**: Create GitHub issue for bugs
- **Questions**: Check FAQ section in app
- **Feedback**: Submit to product team

---

## Version Info

- **Project**: HR and Payroll Management Website - MVP
- **Version**: 1.0.0-beta
- **Created**: 2026-01-20
- **Branch**: `001-hr-payroll`
- **Status**: Development (Phase 1)
- **Next Phase**: Phase 2 (Backend API integration, real database, production auth)
