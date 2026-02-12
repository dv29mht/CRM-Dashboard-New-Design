# CRM Dashboard Clone Specification  
**Target UI:** crm.dahlia.tech/dashboard  
**Purpose:** Pixel-close frontend clone for UI replication using Claude in VS Code  

---

## Objective
Recreate the CRM dashboard shown in the reference screenshot as a **static frontend clone**.  
Focus strictly on **layout, spacing, typography, colors, and component structure**.  
No backend, authentication, or real APIs are required at this stage.

---

## Recommended Tech Stack
- React + Vite
- Tailwind CSS
- Recharts (charts)
- Lucide-react (icons)

---

## Global Layout

### Fixed Top Navigation Bar
- Height: ~70px
- Background: dark navy / indigo gradient
- Full width, fixed position

**Left**
- Large brand text: `CRM`
- Font: bold, large, light blue

**Center**
- Company selector (rounded white input)
  - Text: `Dahlia Technologies Pvt. Ltd.`
  - Right-aligned caret icon

**Right**
- Notification bell icon
- Language dropdown (rounded white input, text: `English`)
- User avatar (circular) + dropdown caret

---

### Fixed Left Sidebar
- Width: ~240px
- Background: white
- Fixed, full height

**Menu Items**
1. Dashboard (active)
2. Employee Master
3. General Master
4. Finance Master
5. Vendors
6. Clients
7. Leads
8. Opportunities
9. Events
10. Requisition

Active item:
- Light blue highlight
- Vertical indicator bar on the left

**Footer**
- Text: `POWERED BY`
- Logo + `DAHLIA TECHNOLOGIES PTE. LTD.`

---

## Main Content Area
- Background: very light gray (`#F5F7FB`)
- Padding: 20–24px
- Scrollable
- Starts below top navbar

---

## Dashboard Components

### 1. Time Filter Tabs
Segmented pill-style tabs:
- All Time (active)
- 12 Months
- 30 Days
- 7 Days
- 24 Hour
- Custom

Active state:
- Light blue background
- Rounded pill

---

### 2. KPI Summary Strip
Single white card with 5 equal columns

| Metric        | Value |
|--------------|-------|
| Employees     | 25    |
| Clients       | 163   |
| Vendors       | 7     |
| Leads         | 173   |
| Opportunities | 185   |

- Subtle vertical dividers
- Small icon button next to each metric
- Large bold number, muted label

---

### 3. Content Grid (3 Columns)

#### A. Today's Greetings Card
- Title: `Today's Greetings`
- Greeting text:
  - `Welcome Arabinda Mahapatra`
- Short motivational message (placeholder)
- Footer:
  - Small avatar
  - Name: `Arabinda Mahapatra`

---

#### B. Opportunity Analysis Card
- Donut chart (centered)
- Center text:
  - `173`
  - `Total Leads`

**Legend**
- Qualified to Opportunity — 150 Leads
- Disqualified Leads — 125 Leads
- Business Gained — 100 Leads
- Business Lost — 125 Leads

---

#### C. Recent Employees Card
- Header: `Recent Employees`
- Button: `View All` (rounded blue gradient)

**Table**
| Name                    | Email                              |
|-------------------------|------------------------------------|
| Sukhamaya Mohapatra     | sukhamaya.mohapatra@dahlia.tech    |
| Yashvardhan Agarwal     | yashvardhan.agarwal@dahlia.tech    |
| Grihika Jeloka          | intern@dahlia.tech                 |
| Subrat Kumar Swain      | subratkumar.swain@dahlia.tech      |

- Avatar shown before names

---

### 4. Leads By Source Card
- Title: `Leads By Source`
- Dropdown: `This Month`
- Horizontal bar chart

**Values**
- Inbound Lead: 40
- Direct Outreach: 25
- Partnerships: 120 (longest bar)

---

## Styling Tokens

```txt
Top bar bg: #0B1F33 → #112B46
Primary blue: #2F80ED
Light blue accent: #E8F2FF
Card background: #FFFFFF
Page background: #F5F7FB
Text primary: #1F2A37
Text muted: #6B7280
Border: #E5E7EB
Card radius: 12px
Pill radius: 999px
Shadow: subtle (shadow-sm)