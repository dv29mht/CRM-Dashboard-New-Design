CRM Dashboard - Complete Specification
Project Overview
A static CRM dashboard built with HTML, CSS, and vanilla JavaScript only. No frameworks (React, Tailwind, Bootstrap) allowed per CLAUDE.md rules.

1. Layout Structure
Top Navigation Bar (Fixed)
Height: 70px
Background: Navy blue (#1e3a5f)
Position: Fixed at top, spans full width
Components:
Left: "CRM" logo in cyan (#4fc3f7), 36px font, bold
Center: White dropdown "Dahlia Technologies Pvt. Ltd." (400px width)
Right: Bell icon (🔔) + Language dropdown ("English") + User avatar (36px circle)
Left Sidebar (Fixed, Collapsible)
Position: Fixed, left edge, below top bar
States:
Expanded: 220px width (default)
Collapsed: 72px width (icons only)
Transition: 0.3s ease on width changes
Background: White (#fff)
Border: 1px solid #e0e0e0 on right edge
Sidebar Header
Toggle button (☰) with aria-label
"Dashboard" title (hidden when collapsed)
Padding: 20px 16px
Sidebar Navigation
Top-level item:

Dashboard (active, with icon 🏠)
Collapsible Groups (Accordion):

Masters (📋)

Employee Master
General Master
Finance Master
Business Network (🏢)

Vendors
Clients
Sales & Growth (📈)

Leads
Opportunities
Quotation
SO
Marketing (📢)

Marketing Zone
Email Templates
Signature Zone
Sample Zone
Operations (⚙️)

Requisition
PO
Operation Files
Visiting Report
Finance (💰)

Invoice
Documents & Communication (📄)

Document
Conversations
Tasks & Planning (✓)

Task Management
Events
Customization (🔧)

Custom Fields
Templates
Bottom-level item:

Settings (⚙️)
Sidebar Behavior
Expanded Mode:

Shows icons + labels + arrows
Only ONE group expanded at a time (accordion)
Active item: blue background (#e3f2fd), blue left border (3px #1976d2)
Child items indented 48px from left
Collapsed Mode:

Shows icons only (24px, centered)
Labels hidden (opacity: 0)
Arrows hidden
All dropdowns auto-close when collapsing
Hover on parent groups shows flyout panel at left: 72px
White background, shadow
Shows group title + all child items
Min-width: 200px
Hover on single items shows dark tooltip (#333 background, white text)
Sidebar Footer
"POWERED BY" (10px, gray)
"DAHLIA TECHNOLOGIES PTE. LTD." (9px, semi-bold)
Hidden when collapsed
Main Content Area
Margin-left: 220px (expanded) / 72px (collapsed)
Transition: 0.3s ease on margin changes
Padding: 24px all sides
Background: Light gray (#f5f5f5)
2. Dashboard Components
Time Filter Tabs
Horizontal tab strip with 6 options:
All Time (active default)
12 Months
30 Days
7 Days
24 Hour
Custom
Active tab: blue text (#1976d2), 3px blue underline
Right-aligned: Purple gradient button "Leela AI Integrations ⭐"
KPI Cards Row
Grid: 5 equal columns, 20px gap

Each card contains:

White background, 8px border-radius
1px solid #e0e0e0 border
Padding: 20px
Left side: Label (13px gray) + Value (32px bold black)
Right side: Circular icon badge (48px, light blue background)
Cards:

Employees: 25
Clients: 163
Vendors: 7
Leads: 173
Opportunities: 185
Three-Column Section
Grid: 3 equal columns, 20px gap

Column 1: Today's Greetings
Simplified card (reduced padding: 16px 20px)
No heading (removed "Today's Greetings")
Main text: "Welcome Arabinda Mahapatra"
Font-size: 20px
Font-weight: 600 (medium-bold)
Color: #1a1a1a
Subtext: "Have a good day to you !!!" (14px, gray)
Quote: Motivational text (13px, gray, italic)
No profile section at bottom
Column 2: Recent Employees
Card header: "Recent Employees" + "View All" button (blue)
Table with 2 columns:
Name (with 36px circular avatar)
Email (gray text)
4 employees:
Sukhamaya Mohapatra - sukhamaya.mohapatra@dahlia.tech
Yashvardhan Agarwal - yashvardhan.agarwal@dahlia.tech
Grihika Jeloka - intern@dahlia.tech
Subrat Kumar Swain - subratkumar.swain@dahlia.tech
Column 3: Opportunity Analysis
Card title: "Opportunity Analysis"
Donut chart (220px diameter)
Inner radius: 65% of outer radius
Center text: "500" (36px bold) + "Total Leads" (12px gray)
Legend below chart (4 items with semantic colors):
Business Gained - 150 Leads - Green (#4caf50)
Qualified to Opportunity - 125 Leads - Blue (#2196f3)
Disqualified Leads - 100 Leads - Amber (#ff9800)
Business Lost - 125 Leads - Red (#f44336)
Total: 150 + 125 + 100 + 125 = 500 (values add up correctly)
Leads By Source Card
Width: ~60% of content area (left-aligned)
Card header: "Leads By Source" + "This Month" dropdown
Tab Controls (6 tabs)
Horizontal tabs, 8px gap, wrap if needed
Tab labels (exact order):
Inbound Lead (default active)
Direct Outreach
Partnerships
Existing Upsell
Reseller
Referral
Active tab: Blue background (#1976d2), white text
Inactive tabs: Light gray (#f5f5f5), gray text
Hover: Light blue background (#e3f2fd)
Horizontal Bar Chart
Canvas height: 200px
3 bars per dataset (Week 1, Week 2, Week 3)
Bar height: 30px
Background track: Light purple (#e8eaf6)
Filled bar: Blue (#4285f4)
Labels on left side (right-aligned)
Datasets for each tab:
Inbound: [35, 42, 38]
Direct: [28, 35, 30]
Partnerships: [75, 88, 82]
Upsell: [45, 52, 48]
Reseller: [22, 28, 25]
Referral: [38, 45, 41]
3. Technical Implementation
File Structure

CRM Dashboard/
├── index.html       (15KB)
├── styles.css       (14KB)
├── script.js        (11KB)
└── CLAUDE.md        (Project rules)
HTML Requirements
Semantic structure with proper sections
Accessibility: aria-labels on interactive elements
No inline styles (except dynamic icon colors in KPI cards)
Canvas elements for charts
CSS Requirements
No frameworks (no Tailwind, Bootstrap)
CSS transitions: 0.3s ease for smooth animations
Responsive grid layouts (CSS Grid for KPI cards and 3-column section)
Flexbox for navigation and card headers
Custom dropdown styling (no default browser appearance)
Hover states for all interactive elements
Mobile responsive (@media queries at 768px, 1200px, 1400px)
JavaScript Requirements
No libraries (no Chart.js, no jQuery)
Pure vanilla JavaScript only
Canvas API for chart drawing (donut chart, bar chart)
DOM manipulation for dynamic content
Event listeners for:
Sidebar toggle
Sidebar accordion (one section open at a time)
Tab switching (Leads by Source)
Window resize (redraw charts)
Functions:
populateEmployeesTable()
drawDonutChart() with semantic colors
drawBarChart(source) with dataset switching
initSidebarToggle() for collapse/expand
initSidebar() for accordion behavior
createFlyouts() for collapsed mode hover panels
addTooltips() for single item tooltips
initSourceTabs() for tab switching
4. Color Palette
Primary Colors
Navy Blue: #1e3a5f (top bar)
Cyan: #4fc3f7 (CRM logo, user avatar)
Primary Blue: #1976d2 (buttons, active states, charts)
Light Blue: #e3f2fd (active backgrounds)
Purple Gradient: #667eea to #764ba2 (AI button)
Semantic Colors (Opportunity Analysis)
Green: #4caf50 (Business Gained)
Blue: #2196f3 (Qualified to Opportunity)
Amber: #ff9800 (Disqualified Leads)
Red: #f44336 (Business Lost)
Neutral Colors
White: #ffffff (cards, sidebar)
Light Gray Background: #f5f5f5 (main content)
Gray Text: #666666 (labels, inactive items)
Dark Text: #1a1a1a (headings, values)
Borders: #e0e0e0 (card borders, sidebar border)
Lighter Borders: #f0f0f0 (subtle dividers)
5. Typography
Font Family

font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
Font Sizes & Weights
Logo (CRM): 36px, bold (700)
KPI Values: 32px, bold (600)
Donut Center Value: 36px, bold (700)
Greeting Name: 20px, semi-bold (600)
Card Titles: 18px, semi-bold (600)
Sidebar Title: 16px, semi-bold (600)
Body Text / Table Data: 14px, regular (400)
Labels / Small Text: 13px, regular (400)
Donut Center Label: 12px, regular (400)
Footer: 10px (POWERED BY), 9px (company logo)
6. Spacing & Layout
Global Spacing
Content padding: 24px
Card padding: 20px (16px for greeting card)
Card gaps: 20px between cards
Section gaps: 24px between major sections
Nav item padding: 12px vertical, 16px horizontal
Child item indent: 48px from left
Transitions
Sidebar width: 0.3s ease
Main content margin: 0.3s ease
Label opacity: 0.3s ease
Dropdown max-height: 0.3s ease-out/ease-in
Hover states: 0.2s
7. Interactive Behaviors
Sidebar Toggle
Click ☰ button to toggle
Smooth width transition (220px ↔ 72px)
Main content adjusts margin-left
All labels fade out/in (opacity transition)
All open dropdowns close when collapsing
Aria-label updates ("Collapse sidebar" / "Expand sidebar")
Sidebar Accordion (Expanded Mode)
Click parent group to expand/collapse
Only ONE group open at a time
Arrow rotates 90deg when expanded (▶ → ▼)
Smooth max-height transition for children
Disabled when sidebar is collapsed
Collapsed Mode Hover
Hover on parent group → Show flyout panel to right
Flyout contains: parent title + all child items
Hover on single item → Show dark tooltip to right
No clicking on groups in collapsed mode
Tab Switching (Leads by Source)
Click tab to switch dataset
Active tab: blue background, white text
Chart redraws with new data for selected tab
Smooth transition between tabs
Chart Responsiveness
Charts redraw on window resize (250ms debounce)
Bar chart width adjusts to container
Donut chart stays fixed at 220px
8. Mock Data
Employees (4 records)

[
  { name: 'Sukhamaya Mohapatra', email: 'sukhamaya.mohapatra@dahlia.tech' },
  { name: 'Yashvardhan Agarwal', email: 'yashvardhan.agarwal@dahlia.tech' },
  { name: 'Grihika Jeloka', email: 'intern@dahlia.tech' },
  { name: 'Subrat Kumar Swain', email: 'subratkumar.swain@dahlia.tech' }
]
Opportunity Data (4 categories, total = 500)

[
  { label: 'Business Gained', value: 150, color: '#4caf50' },
  { label: 'Qualified to Opportunity', value: 125, color: '#2196f3' },
  { label: 'Disqualified Leads', value: 100, color: '#ff9800' },
  { label: 'Business Lost', value: 125, color: '#f44336' }
]
Leads by Source (6 datasets)

{
  inbound: [35, 42, 38],
  direct: [28, 35, 30],
  partnerships: [75, 88, 82],
  upsell: [45, 52, 48],
  reseller: [22, 28, 25],
  referral: [38, 45, 41]
}
9. Accessibility
✓ Semantic HTML (header, aside, main, nav)
✓ Aria-labels on toggle button
✓ Keyboard navigation (all links/buttons focusable)
✓ Color contrast ratios (WCAG AA compliant)
✓ No pointer-only interactions (tooltips are visual enhancements)
✓ Clear visual hierarchy in both sidebar states
10. Browser Compatibility
Modern browsers (Chrome, Firefox, Safari, Edge)
CSS Grid support required
Canvas API support required
ES6 JavaScript (arrow functions, const/let, template literals)
No polyfills needed for evergreen browsers
11. Project Rules (CLAUDE.md)
Tech Stack
✓ HTML, CSS, vanilla JavaScript ONLY
✗ NO React, Tailwind, Bootstrap, or any framework
✗ NO charting libraries (Chart.js, D3.js)
✓ Prefer simple, readable code
Workflow
Build step-by-step
Do not jump ahead
Ask before adding new sections
Keep changes minimal and explain what changed
Styling
Structure first, styling later
No colors, shadows, or fonts unless requested
Layout must be correct before visual polish
Communication
Be concise
No overengineering
Confirm when a step is complete
Summary
This CRM dashboard is a fully functional, responsive, collapsible sidebar application with:

5 KPI metric cards
Interactive donut chart with semantic colors
Tabbed horizontal bar chart with 6 datasets
Employee table with 4 records
Collapsible sidebar (220px ↔ 72px) with flyout panels
All built with pure HTML, CSS, and vanilla JavaScript
Professional enterprise-grade UI
Smooth transitions and hover interactions
Complete accessibility support
Total lines of code: ~700 lines across 3 files (15KB HTML + 14KB CSS + 11KB JS)