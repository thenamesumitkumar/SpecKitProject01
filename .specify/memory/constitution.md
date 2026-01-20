# Static Web App Constitution

## Core Principles

### I. Static-First Delivery
All content MUST be served as static HTML, CSS, and JavaScript. Server-side rendering is prohibited. Dynamic functionality MUST be handled exclusively through client-side JavaScript. Content updates require rebuilding and redeployment—no server-side state.

### II. Progressive Enhancement
Core functionality MUST work without JavaScript. Interactive features MUST enhance—not replace—baseline HTML functionality. Users with JavaScript disabled receive a functional, read-only experience. Graceful degradation is non-negotiable.

### III. Performance & Optimization
All assets MUST be optimized for fast delivery: minified CSS/JS, compressed images, lazy-loading for media, and cache-busting headers. Target: page load under 2 seconds on 4G networks. No bloat dependencies—prefer vanilla JS over frameworks when possible.

### IV. Accessibility & SEO
All content MUST be semantically correct HTML with proper heading hierarchy (h1→h6), alt text on images, ARIA labels where needed, and keyboard navigation support. Meta tags, Open Graph, and structured data MUST be present. Pages MUST pass WCAG 2.1 AA standards.

### V. Build & Deployment Pipeline
Source lives in version control. Build process MUST be automated: lint, optimize, and generate static outputs. Deployments MUST be idempotent and reversible. All built artifacts committed or hosted on CDN with immutable URLs.

## Technical Constraints

- **Technology Stack**: HTML5, CSS3, vanilla JavaScript (ES6+). No server-side code or backend API dependencies required.
- **Hosting**: Static hosting platform (e.g., Azure Static Web Apps, Netlify, GitHub Pages, S3+CloudFront).
- **Build Tool**: Specify preferred tool (e.g., Hugo, Jekyll, Vite, webpack) or mark as decision pending.
- **No Runtime Dependencies**: Third-party libraries MUST be vetted for size and security; vendor dependencies locked in version control or via CDN with SRI hashes.

## Development Workflow

- All work tracked in version control with feature branches.
- Pull requests MUST include: build output validation, lighthouse performance report (>90 score), and accessibility audit results.
- Automated checks (linting, minification, broken link detection) MUST pass before merge.
- Deployment MUST be automated from main branch; manual rollback procedure documented.

## Governance

This constitution supersedes all other development practices for this project. Amendments require documentation and ratification by project stakeholders. Compliance is verified during PR review—all code MUST align with the principles above. Violations MUST be escalated or waived explicitly.

**Version**: 1.0.0 | **Ratified**: 2026-01-20 | **Last Amended**: 2026-01-20
