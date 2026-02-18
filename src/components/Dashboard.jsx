import { useState } from 'react';
import {
  TrendingUp, BarChart3, Percent, Clock, IndianRupee,
  ArrowUpRight, ArrowDownRight,
  CheckCircle2, XCircle, ChevronDown, ChevronRight,
  Sparkles, Trophy, Zap, Target, AlertTriangle, Activity,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  formatCurrency,
  kpiMetrics,
  documentFlowStages,
  quotationVolume,
  qualifiedOutcomes,
  topClients,
  getTopProducts,
  getRevenueByScope,
  getQuoteVelocity,
  getStalePipeline,
  getStrikeRate,
  getAovTrend,
} from '../data/mockData';
import LeadsMap from './LeadsMap';

// ── Semantic color map ─────────────────────────────────────────────
const BAR_COLORS = {
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-700' },
  indigo:  { bg: 'bg-indigo-600',  text: 'text-indigo-700' },
  amber:   { bg: 'bg-amber-500',   text: 'text-amber-700' },
  slate:   { bg: 'bg-slate-500',   text: 'text-slate-600' },
};

const TIME_RANGES = ['All Time', '1 Month', 'Custom'];

// ── Custom tooltip ─────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, isCurrency }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
      <span className="text-slate-300">{label}: </span>
      <span className="font-semibold">
        {isCurrency ? formatCurrency(payload[0].value) : payload[0].value}
      </span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('all');
  const [expandedOutcome, setExpandedOutcome] = useState(null);

  const rangeKey = timeRange === 'custom' ? 'all' : timeRange;
  const metrics = kpiMetrics[rangeKey];
  const flow = documentFlowStages[rangeKey];
  const quoteVol = quotationVolume[rangeKey];
  const maxFlowValue = Math.max(...flow.map((s) => s.value));

  // Quotation volume summary
  const volTotal = quoteVol.reduce((s, d) => s + d.value, 0);
  const volLast = quoteVol[quoteVol.length - 1]?.value ?? 0;

  return (
    <div className="p-5 lg:p-6 bg-slate-50 min-h-screen">
      {/* ── Header Row ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold text-slate-800">
          Welcome, <span className="text-indigo-600">Devansh</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            {TIME_RANGES.map((label) => {
              const key = label === 'All Time' ? 'all' : label === '1 Month' ? 'month' : 'custom';
              const active = timeRange === key;
              return (
                <button
                  key={key}
                  onClick={() => setTimeRange(key)}
                  className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow hover:shadow-md transition-shadow flex items-center gap-1.5">
            <Sparkles size={14} />
            Leela AI
          </button>
        </div>
      </div>

      {/* ── KPI Stats Row (Hero + 4 cards) ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        {/* HERO — Total Won Deal Value (2x width) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 shadow-sm border border-emerald-500/30 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                <IndianRupee size={20} />
              </div>
              <span className="text-sm font-medium text-emerald-100">Total Won Deal Value</span>
            </div>
            <div className="text-4xl font-bold tracking-tight mb-1">
              {formatCurrency(metrics.totalWonDealValue)}
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-200">
              <ArrowUpRight size={14} />
              <span>{metrics.totalWonChange}</span>
            </div>
          </div>
        </div>

        <StatCard
          icon={<TrendingUp size={20} />}
          label="Open Pipeline"
          sublabel="Quotes without SO"
          value={formatCurrency(metrics.openPipeline)}
          change={metrics.openPipelineChange}
          positive
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          icon={<BarChart3 size={20} />}
          label="Unbilled Backlog"
          sublabel="SO Value − Invoiced"
          value={formatCurrency(metrics.unbilledBacklog)}
          change={metrics.unbilledBacklogChange}
          positive={metrics.unbilledBacklogChange.startsWith('-')}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          icon={<Percent size={20} />}
          label="Quote-to-Order Rate"
          sublabel="Quotes → SOs"
          value={`${metrics.quoteToOrderRate.toFixed(1)}%`}
          change={metrics.quoteToOrderChange}
          positive={metrics.quoteToOrderChange.startsWith('+')}
          iconBg="bg-slate-100"
          iconColor="text-slate-600"
        />
        <PoLagCard metrics={metrics} />
      </div>

      {/* ── Row 2: Document Flow + Qualified Outcomes ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Document Flow Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-semibold text-slate-800">Document Flow Status</h2>
            <span className="text-xs text-slate-400 font-medium">
              Total: {formatCurrency(flow.reduce((s, p) => s + p.value, 0))}
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {flow.map((stage) => {
              const pct = (stage.value / maxFlowValue) * 100;
              const c = BAR_COLORS[stage.color];
              return (
                <div key={stage.stage} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-slate-600">{stage.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{stage.docs} docs</span>
                      <span className={`text-[13px] font-semibold ${c.text}`}>
                        {formatCurrency(stage.value)}
                      </span>
                    </div>
                  </div>
                  <div className="h-7 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${c.bg} rounded-lg transition-all duration-500 group-hover:opacity-90`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Qualified Opportunity Outcomes */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <h2 className="text-[15px] font-semibold text-slate-800 mb-4">
            Qualified Opportunity Outcomes
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[340px] pr-1">
            {qualifiedOutcomes.map((item, i) => {
              const isWon = item.status === 'won';
              const isExpanded = expandedOutcome === i;
              return (
                <div key={i} className="border-b border-slate-100 last:border-0">
                  <button
                    onClick={() => setExpandedOutcome(isExpanded ? null : i)}
                    className="flex items-center gap-3 py-3 w-full text-left hover:bg-slate-50 transition-colors rounded px-1"
                  >
                    {/* Status icon */}
                    {isWon ? (
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-rose-400 flex-shrink-0" />
                    )}
                    {/* Client + value */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-slate-700 truncate">
                        {item.client}
                      </div>
                      <div className="text-[12px] text-slate-400">
                        {formatCurrency(item.value)}
                      </div>
                    </div>
                    {/* Won/Lost badge */}
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        isWon
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-rose-600 bg-rose-50 border border-rose-200'
                      }`}
                    >
                      {isWon ? 'WON' : 'LOST'}
                    </span>
                    {/* Expand chevron */}
                    {isExpanded ? (
                      <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {/* Expanded reason */}
                  {isExpanded && (
                    <div className="pl-10 pr-4 pb-3">
                      <div
                        className={`text-[12px] leading-relaxed p-2.5 rounded-lg ${
                          isWon ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        <span className="font-semibold">
                          {isWon ? 'Win Reason: ' : 'Lost Reason: '}
                        </span>
                        {item.reason}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Row 3: Quotation Volume + Leads Map ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Quotation Volume (Monthly) */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 flex flex-col h-[340px]">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[15px] font-semibold text-slate-800">Quotation Volume (Monthly)</h2>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(volLast)}</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">+12%</span>
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
            {formatCurrency(volTotal)} total over {quoteVol.length} periods
          </p>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quoteVol} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(v) => formatCurrency(v)}
                  width={52}
                />
                <Tooltip content={<ChartTooltip isCurrency />} cursor={{ stroke: '#e2e8f0' }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#indigoGradient)"
                  dot={{ r: 3.5, fill: '#4f46e5', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads Map — India */}
        <LeadsMap />
      </div>

      {/* ── Revenue Intelligence ─────────────────────────────── */}
      <RevenueIntelligence />
    </div>
  );
}

// ── Revenue Intelligence Section ──────────────────────────────────
const PRODUCT_COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];
const SCOPE_COLORS = ['#0d9488', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

function RevenueIntelligence() {
  const strikeRate = getStrikeRate();
  const velocity = getQuoteVelocity();
  const stalePipeline = getStalePipeline();
  const topProducts = getTopProducts();
  const scopeData = getRevenueByScope();
  const aovTrend = getAovTrend();
  const scopeTotal = scopeData.reduce((s, d) => s + d.value, 0);

  // Strike rate ring
  const ringRadius = 36;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (strikeRate / 100) * ringCircumference;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-violet-600" />
        <h2 className="text-base font-semibold text-slate-800">Revenue Intelligence</h2>
      </div>

      {/* Row 1: 3 small cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Strike Rate */}
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 shadow-sm p-5 flex items-center gap-5">
          <div className="flex-shrink-0">
            <svg width="88" height="88" viewBox="0 0 88 88">
              <defs>
                <linearGradient id="winRateGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <circle cx="44" cy="44" r={ringRadius} fill="none" stroke="#e0e7ff" strokeWidth="7" />
              <circle
                cx="44" cy="44" r={ringRadius} fill="none"
                stroke="url(#winRateGrad)" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 44 44)"
              />
              <text x="44" y="41" textAnchor="middle" style={{ fontSize: 18, fontWeight: 700, fill: '#312e81' }}>
                {strikeRate}%
              </text>
              <text x="44" y="55" textAnchor="middle" style={{ fontSize: 10, fill: '#6366f1' }}>
                Win Rate
              </text>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Target size={16} className="text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-900">Quote Win Rate</span>
            </div>
            <p className="text-xs text-indigo-400 leading-relaxed">
              {strikeRate >= 60 ? 'Strong conversion — keep it up!' : 'Below 60% — review lost reasons.'}
            </p>
          </div>
        </div>

        {/* Avg Approval Time */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
              <Zap size={20} />
            </div>
            <span className="text-sm font-medium text-slate-600">Avg Approval Time</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">
            {velocity} <span className="text-sm font-medium text-slate-500">Days</span>
          </div>
          <p className="text-xs text-slate-400">
            {velocity <= 7 ? 'Lightning-fast approvals' : velocity <= 14 ? 'Healthy approval cycle' : 'Consider follow-up automation'}
          </p>
        </div>

        {/* Ghosting / Stale Pipeline */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-xl border border-amber-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-200/60 flex items-center justify-center text-amber-700">
              <AlertTriangle size={20} />
            </div>
            <span className="text-sm font-medium text-amber-800">Stale Pipeline</span>
          </div>
          <div className="text-3xl font-bold text-amber-700 mb-1">
            {formatCurrency(stalePipeline)}
          </div>
          <p className="text-xs text-amber-600/80">
            Pending &gt;14 days — {stalePipeline > 0 ? 'needs follow-up' : 'all clear!'}
          </p>
        </div>
      </div>

      {/* Row 2: Top Products + Revenue by Scope (Premium) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96 mb-6">
        {/* Top Products by Revenue — Vertical Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold tracking-tight text-slate-800 mb-6">Top Products by Revenue</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} margin={{ top: 4, right: 8, bottom: 28, left: -10 }}>
                <defs>
                  <linearGradient id="barIndigo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.85} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  dy={10}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(v) => formatCurrency(v)}
                  width={54}
                />
                <Tooltip content={<ChartTooltip isCurrency />} cursor={{ fill: 'rgba(79,70,229,0.04)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32} fill="url(#barIndigo)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Scope of Work — Thick Donut */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold tracking-tight text-slate-800 mb-6">Revenue by Scope of Work</h3>
          <div className="flex-1 min-h-0 flex items-center">
            <div className="w-[45%] h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scopeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {scopeData.map((_, i) => (
                      <Cell key={i} fill={SCOPE_COLORS[i % SCOPE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip isCurrency />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-800 tracking-tight">{formatCurrency(scopeTotal)}</span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total</span>
              </div>
            </div>
            <div className="w-[55%] pl-5 space-y-3">
              {scopeData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: SCOPE_COLORS[i % SCOPE_COLORS.length] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-slate-700 truncate">{item.name}</div>
                    <div className="text-xs text-slate-400">
                      {formatCurrency(item.value)} · {((item.value / scopeTotal) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: AOV Trend + Top 5 Clients side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AOV Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-[360px] flex flex-col">
          <h3 className="text-lg font-bold tracking-tight text-slate-800 mb-1">AOV Trend</h3>
          <p className="text-xs text-slate-400 mb-5">Average Order Value per month</p>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aovTrend} margin={{ top: 4, right: 12, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false} tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={8}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(v) => formatCurrency(v)}
                  width={52}
                />
                <Tooltip content={<ChartTooltip isCurrency />} cursor={{ stroke: '#e2e8f0' }} />
                <Line
                  type="monotone" dataKey="aov"
                  stroke="#8b5cf6" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Clients Leaderboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-[360px] flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={16} className="text-amber-500" />
            <h3 className="text-lg font-bold tracking-tight text-slate-800">Top 5 Clients</h3>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {topClients.map((client, i) => {
              const maxInvoiced = topClients[0].invoiced;
              const pct = (client.invoiced / maxInvoiced) * 100;
              return (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 transition-colors">
                    <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-slate-700 truncate">{client.name}</div>
                        <div className="text-[11px] text-slate-400">{client.projects} projects</div>
                      </div>
                      <span className="text-[14px] font-bold text-slate-800 flex-shrink-0 ml-4">
                        {formatCurrency(client.invoiced)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500/70 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable Stat Card ─────────────────────────────────────────────
function StatCard({ icon, label, sublabel, value, change, positive, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-xs text-slate-500 font-medium mb-0.5 leading-tight">{label}</div>
        {sublabel && (
          <div className="text-[11px] text-slate-400 mb-1">{sublabel}</div>
        )}
        <div className="text-2xl font-bold text-slate-800 mb-1">{value}</div>
        <div className={`flex items-center gap-1 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-500'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}

// ── PO Lag Time Card ───────────────────────────────────────────────
function PoLagCard({ metrics }) {
  const days = metrics.avgPoLagDays;
  const isFast = days < 7;
  const isSlow = days > 14;

  const valueColor = isFast
    ? 'text-emerald-600'
    : isSlow
      ? 'text-amber-500'
      : 'text-slate-700';

  const iconBg = isFast
    ? 'bg-emerald-50'
    : isSlow
      ? 'bg-amber-50'
      : 'bg-slate-100';

  const iconColor = isFast
    ? 'text-emerald-600'
    : isSlow
      ? 'text-amber-500'
      : 'text-slate-600';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
          <Clock size={20} />
        </div>
        {isFast && (
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Fast
          </span>
        )}
        {isSlow && (
          <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Slow
          </span>
        )}
      </div>
      <div>
        <div className="text-xs text-slate-500 font-medium mb-0.5 leading-tight">Avg PO Lag Time</div>
        <div className="text-[11px] text-slate-400 mb-1">Quote Sent → SO Created</div>
        <div className={`text-2xl font-bold mb-1 ${valueColor}`}>
          {days.toFixed(1)} <span className="text-sm font-medium">Days</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
          <span>{metrics.avgPoLagChange}</span>
        </div>
      </div>
    </div>
  );
}
