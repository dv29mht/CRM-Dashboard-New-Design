// ── Currency formatter (abbreviated notation) ──────────────────────
export function formatCurrency(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

// ── KPI Metrics (Document-Driven) ───────────────────────────────────
export const kpiMetrics = {
  all: {
    totalBookedOrders: 4_250_000,        // Sum of all Sales Orders created
    totalBookedChange: '+14% vs Last Quarter',
    openPipeline: 1_620_000,             // Sum of active Quotations without an SO
    openPipelineChange: '+8% This Month',
    unbilledBacklog: 1_380_000,          // Total SO Value minus Total Invoiced Value
    unbilledBacklogChange: '-5% vs Last Month',
    quoteToOrderRate: 62.4,              // % of Quotes that became SOs
    quoteToOrderChange: '+4% vs Last Quarter',
    avgPoLagDays: 8.3,                   // Avg days between Quote Sent → SO Created
    avgPoLagChange: '-1.2 days vs Last Quarter',
  },
  month: {
    totalBookedOrders: 980_000,
    totalBookedChange: '+6% vs Last Month',
    openPipeline: 540_000,
    openPipelineChange: '+3% This Week',
    unbilledBacklog: 410_000,
    unbilledBacklogChange: '-2% vs Last Week',
    quoteToOrderRate: 58.1,
    quoteToOrderChange: '-4.3% vs All Time',
    avgPoLagDays: 9.7,
    avgPoLagChange: '+1.4 days vs All Time',
  },
};

// ── Document Flow Stages (replaces Weighted Pipeline) ───────────────
export const documentFlowStages = {
  all: [
    { stage: 'Qualified Leads', docs: 210, value: 3_200_000, color: 'slate' },
    { stage: 'Quotes Sent',     docs: 134, value: 2_450_000, color: 'indigo' },
    { stage: 'PO/SO Received',  docs: 83,  value: 1_870_000, color: 'amber' },
    { stage: 'Invoiced',        docs: 61,  value: 1_420_000, color: 'emerald' },
  ],
  month: [
    { stage: 'Qualified Leads', docs: 70,  value: 960_000,   color: 'slate' },
    { stage: 'Quotes Sent',     docs: 42,  value: 680_000,   color: 'indigo' },
    { stage: 'PO/SO Received',  docs: 24,  value: 520_000,   color: 'amber' },
    { stage: 'Invoiced',        docs: 18,  value: 390_000,   color: 'emerald' },
  ],
};

// ── Quotation Volume (Monthly, currency values) ─────────────────────
export const quotationVolume = {
  all: [
    { month: 'Sep', value: 380_000 },
    { month: 'Oct', value: 520_000 },
    { month: 'Nov', value: 445_000 },
    { month: 'Dec', value: 710_000 },
    { month: 'Jan', value: 630_000 },
    { month: 'Feb', value: 860_000 },
  ],
  month: [
    { month: 'Week 1', value: 180_000 },
    { month: 'Week 2', value: 240_000 },
    { month: 'Week 3', value: 195_000 },
    { month: 'Week 4', value: 310_000 },
  ],
};

// ── Leads By Source (unchanged) ─────────────────────────────────────
export const leadsBySource = {
  all: [
    { label: 'Partnerships',    value: 10_000_000, color: '#4f46e5' },
    { label: 'Reseller',        value: 5_000_000,  color: '#6366f1' },
    { label: 'Upsell',          value: 4_200_000,  color: '#059669' },
    { label: 'Referral',        value: 3_800_000,  color: '#10b981' },
    { label: 'Inbound',         value: 2_500_000,  color: '#f59e0b' },
    { label: 'Outreach',        value: 1_800_000,  color: '#64748b' },
  ],
  month: [
    { label: 'Partnerships',    value: 3_200_000,  color: '#4f46e5' },
    { label: 'Reseller',        value: 1_600_000,  color: '#6366f1' },
    { label: 'Upsell',          value: 1_400_000,  color: '#059669' },
    { label: 'Referral',        value: 1_200_000,  color: '#10b981' },
    { label: 'Inbound',         value: 800_000,    color: '#f59e0b' },
    { label: 'Outreach',        value: 550_000,    color: '#64748b' },
  ],
};

// ── Recent Document Activities (high-value document events only) ────
export const recentActivities = [
  { employee: 'Sukhamaya Mohapatra',  action: 'Generated Quote #1024 for Tech Corp ($145K)',              time: '12m ago',  type: 'quotation' },
  { employee: 'Yashvardhan Agarwal',  action: 'Received PO from Dahlia Infra Pvt. Ltd. ($320K)',          time: '28m ago',  type: 'po' },
  { employee: 'Grihika Jeloka',       action: 'Created Invoice #500 for GlobalTech Inc. ($98K)',           time: '45m ago',  type: 'invoice' },
  { employee: 'Subrat Kumar Swain',   action: 'Generated Quote #1023 for Enterprise Solutions ($210K)',    time: '1h ago',   type: 'quotation' },
  { employee: 'Sukhamaya Mohapatra',  action: 'Received SO #784 from Manufacturing Inc. ($175K)',          time: '2h ago',   type: 'so' },
  { employee: 'Yashvardhan Agarwal',  action: 'Created Invoice #499 for RetailMax ($67K)',                 time: '3h ago',   type: 'invoice' },
  { employee: 'Grihika Jeloka',       action: 'Generated Quote #1022 for Cloud Nine Ltd. ($88K)',          time: '4h ago',   type: 'quotation' },
  { employee: 'Subrat Kumar Swain',   action: 'Received PO from DataDriven Co. ($155K)',                   time: '5h ago',   type: 'po' },
  { employee: 'Sukhamaya Mohapatra',  action: 'Created Invoice #498 for StartupXYZ ($42K)',                time: '6h ago',   type: 'invoice' },
  { employee: 'Yashvardhan Agarwal',  action: 'Received SO #783 from MegaCorp ($290K)',                    time: '8h ago',   type: 'so' },
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
