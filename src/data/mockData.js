// ── Currency formatter (INR — Crore / Lakh notation) ────────────────
export function formatCurrency(value) {
  if (value >= 1_00_00_000) return `\u20B9${(value / 1_00_00_000).toFixed(1)}Cr`;
  if (value >= 1_00_000)    return `\u20B9${(value / 1_00_000).toFixed(1)}L`;
  if (value >= 1_000)       return `\u20B9${(value / 1_000).toFixed(0)}K`;
  return `\u20B9${value}`;
}

// ── KPI Metrics (Document-Driven, INR values) ───────────────────────
export const kpiMetrics = {
  all: {
    totalWonDealValue: 4_25_00_000,      // ₹4.3Cr — Sum of all confirmed SOs
    totalWonChange: '+14% vs Last Quarter',
    openPipeline: 1_62_00_000,           // ₹1.6Cr — Active Quotations without SO
    openPipelineChange: '+8% This Month',
    unbilledBacklog: 1_38_00_000,        // ₹1.4Cr — SO Value minus Invoiced
    unbilledBacklogChange: '-5% vs Last Month',
    quoteToOrderRate: 62.4,
    quoteToOrderChange: '+4% vs Last Quarter',
    avgPoLagDays: 8.3,
    avgPoLagChange: '-1.2 days vs Last Quarter',
  },
  month: {
    totalWonDealValue: 98_00_000,        // ₹98.0L
    totalWonChange: '+6% vs Last Month',
    openPipeline: 54_00_000,
    openPipelineChange: '+3% This Week',
    unbilledBacklog: 41_00_000,
    unbilledBacklogChange: '-2% vs Last Week',
    quoteToOrderRate: 58.1,
    quoteToOrderChange: '-4.3% vs All Time',
    avgPoLagDays: 9.7,
    avgPoLagChange: '+1.4 days vs All Time',
  },
};

// ── Document Flow Stages ────────────────────────────────────────────
export const documentFlowStages = {
  all: [
    { stage: 'Qualified Leads', docs: 210, value: 3_20_00_000, color: 'slate' },
    { stage: 'Quotes Sent',     docs: 134, value: 2_45_00_000, color: 'indigo' },
    { stage: 'PO/SO Received',  docs: 83,  value: 1_87_00_000, color: 'amber' },
    { stage: 'Invoiced',        docs: 61,  value: 1_42_00_000, color: 'emerald' },
  ],
  month: [
    { stage: 'Qualified Leads', docs: 70,  value: 96_00_000,  color: 'slate' },
    { stage: 'Quotes Sent',     docs: 42,  value: 68_00_000,  color: 'indigo' },
    { stage: 'PO/SO Received',  docs: 24,  value: 52_00_000,  color: 'amber' },
    { stage: 'Invoiced',        docs: 18,  value: 39_00_000,  color: 'emerald' },
  ],
};

// ── Quotation Volume (Monthly, INR) ─────────────────────────────────
export const quotationVolume = {
  all: [
    { month: 'Sep', value: 38_00_000 },
    { month: 'Oct', value: 52_00_000 },
    { month: 'Nov', value: 44_50_000 },
    { month: 'Dec', value: 71_00_000 },
    { month: 'Jan', value: 63_00_000 },
    { month: 'Feb', value: 86_00_000 },
  ],
  month: [
    { month: 'Week 1', value: 18_00_000 },
    { month: 'Week 2', value: 24_00_000 },
    { month: 'Week 3', value: 19_50_000 },
    { month: 'Week 4', value: 31_00_000 },
  ],
};

// ── Leads Map Data (Global — [longitude, latitude]) ─────────────────
export const leadsMapData = [
  { city: 'Mumbai',     leads: 64, value: 2_85_00_000, coordinates: [72.8777, 19.0760], highlight: true },
  { city: 'Vancouver',  leads: 38, value: 1_52_00_000, coordinates: [-123.1216, 49.2827] },
  { city: 'Houston',    leads: 42, value: 1_78_00_000, coordinates: [-95.3698, 29.7604] },
  { city: 'Dubai',      leads: 35, value: 1_45_00_000, coordinates: [55.2708, 25.2048] },
  { city: 'Singapore',  leads: 29, value: 1_18_00_000, coordinates: [103.8198, 1.3521] },
];

// ── Qualified Opportunity Outcomes (Won/Lost with reasons) ──────────
export const qualifiedOutcomes = [
  {
    client: 'Tech Corp India',
    status: 'won',
    value: 45_00_000,
    reason: 'Strong technical proposal and competitive pricing beat 3 other vendors.',
  },
  {
    client: 'Dahlia Infra Pvt. Ltd.',
    status: 'won',
    value: 32_00_000,
    reason: 'Existing relationship and proven track record on similar projects.',
  },
  {
    client: 'GlobalTech Inc.',
    status: 'lost',
    value: 28_00_000,
    reason: 'Competitor price was 15% lower with similar scope.',
  },
  {
    client: 'Manufacturing Solutions',
    status: 'won',
    value: 18_50_000,
    reason: 'Only vendor with required ISO certification for this project type.',
  },
  {
    client: 'RetailMax Ltd.',
    status: 'lost',
    value: 22_00_000,
    reason: 'Client postponed project to next fiscal year due to budget freeze.',
  },
  {
    client: 'Cloud Nine Ltd.',
    status: 'lost',
    value: 15_00_000,
    reason: 'Scope mismatch — client needed on-site team which we could not provide.',
  },
  {
    client: 'DataDriven Co.',
    status: 'won',
    value: 41_00_000,
    reason: 'Won on technical evaluation; fastest proposed delivery timeline.',
  },
  {
    client: 'MegaCorp Engg.',
    status: 'lost',
    value: 38_00_000,
    reason: 'Lost to incumbent vendor who matched our revised quote.',
  },
];

// ── Top 5 Clients by Total Invoiced Value ───────────────────────────
export const topClients = [
  { name: 'Dahlia Infra Pvt. Ltd.',  invoiced: 1_12_00_000, projects: 8 },
  { name: 'Tech Corp India',         invoiced: 87_00_000,   projects: 5 },
  { name: 'MegaCorp Engg.',          invoiced: 74_00_000,   projects: 6 },
  { name: 'GlobalTech Inc.',         invoiced: 62_00_000,   projects: 4 },
  { name: 'Manufacturing Solutions', invoiced: 53_00_000,   projects: 3 },
];

// ── Sidebar Menu Structure ─────────────────────────────────────────
export const sidebarMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', active: true },
  {
    id: 'masters', label: 'Masters', icon: 'ClipboardList',
    children: ['Employee Master', 'General Master', 'Finance Master'],
  },
  {
    id: 'business', label: 'Business Network', icon: 'Building2',
    children: ['Vendors', 'Clients'],
  },
  {
    id: 'sales', label: 'Sales & Growth', icon: 'TrendingUp',
    children: ['Leads', 'Opportunities', 'Quotation', 'SO'],
  },
  {
    id: 'marketing', label: 'Marketing', icon: 'Megaphone',
    children: ['Marketing Zone', 'Email Templates', 'Signature Zone', 'Sample Zone'],
  },
  {
    id: 'operations', label: 'Operations', icon: 'Settings',
    children: ['Requisition', 'PO', 'Operation Files', 'Visiting Report'],
  },
  {
    id: 'finance', label: 'Finance', icon: 'DollarSign',
    children: ['Invoice'],
  },
  {
    id: 'documents', label: 'Documents', icon: 'FileText',
    children: ['Document', 'Conversations'],
  },
  {
    id: 'tasks', label: 'Tasks & Planning', icon: 'CheckSquare',
    children: ['Task Management', 'Events'],
  },
  {
    id: 'customization', label: 'Customization', icon: 'Wrench',
    children: ['Custom Fields', 'Templates'],
  },
  { id: 'settings', label: 'Settings', icon: 'Cog' },
];
