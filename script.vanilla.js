console.log('[CRM] script loaded');

// Global Timeline State
let dashboardTimeRange = 'all'; // 'all' | 'month' | 'custom'
let customStartDate = null;
let customEndDate = null;

// Global Filter State for drill-down
let activeLeadFilter = null; // null | 'closed_won'

// Sparkline data by time range (8-12 points each)
const sparklineData = {
    all: {
        conversion: [8.5, 9.2, 10.1, 9.8, 11.2, 10.5, 11.8, 12.0],
        pipeline: [320, 340, 380, 410, 390, 420, 435, 450],
        opportunities: [145, 152, 158, 162, 168, 170, 173, 175]
    },
    month: {
        conversion: [7.2, 7.8, 8.0, 7.5, 8.1, 8.2, 8.0, 8.3],
        pipeline: [150, 158, 165, 170, 175, 172, 178, 180],
        opportunities: [48, 52, 55, 54, 58, 57, 59, 60]
    }
};

// Mock Closed Won leads for drill-down
const closedWonLeads = [
    { name: 'Tech Corp Solutions', company: 'Manufacturing Inc.', value: '$45,000', initials: 'TC' },
    { name: 'Global Systems Ltd.', company: 'Enterprise Software', value: '$72,500', initials: 'GS' },
    { name: 'Nexus Industries', company: 'Industrial Equipment', value: '$38,000', initials: 'NI' },
    { name: 'Quantum Analytics', company: 'Data Services', value: '$55,000', initials: 'QA' },
    { name: 'Stellar Dynamics', company: 'Aerospace', value: '$120,000', initials: 'SD' }
];

// Recent Employee Activities Mock Data (Last 72 Hours)
const recentActivities = [
    { employee: 'Sukhamaya Mohapatra', action: 'Updated lead status for Tech Corp', time: '12m ago', type: 'lead' },
    { employee: 'Yashvardhan Agarwal', action: 'Moved opportunity to Proposal Sent stage', time: '28m ago', type: 'opportunity' },
    { employee: 'Grihika Jeloka', action: 'Added meeting notes for client discussion', time: '45m ago', type: 'note' },
    { employee: 'Subrat Kumar Swain', action: 'Created new quotation for Enterprise Solutions', time: '1h ago', type: 'quotation' },
    { employee: 'Sukhamaya Mohapatra', action: 'Closed deal with Manufacturing Inc.', time: '2h ago', type: 'deal' },
    { employee: 'Yashvardhan Agarwal', action: 'Sent follow-up email to prospect', time: '3h ago', type: 'email' },
    { employee: 'Grihika Jeloka', action: 'Scheduled demo for next week', time: '4h ago', type: 'meeting' },
    { employee: 'Subrat Kumar Swain', action: 'Updated pipeline value for Q1 targets', time: '5h ago', type: 'update' },
    { employee: 'Sukhamaya Mohapatra', action: 'Qualified new lead from inbound campaign', time: '6h ago', type: 'lead' },
    { employee: 'Yashvardhan Agarwal', action: 'Completed onboarding call with new client', time: '8h ago', type: 'call' },
    { employee: 'Grihika Jeloka', action: 'Logged client feedback in CRM', time: '10h ago', type: 'note' },
    { employee: 'Subrat Kumar Swain', action: 'Assigned new lead to sales team', time: '12h ago', type: 'lead' },
    { employee: 'Sukhamaya Mohapatra', action: 'Reviewed quarterly sales report', time: '14h ago', type: 'update' },
    { employee: 'Yashvardhan Agarwal', action: 'Sent proposal to Global Systems Ltd.', time: '18h ago', type: 'quotation' },
    { employee: 'Grihika Jeloka', action: 'Updated contact information for key account', time: '22h ago', type: 'update' },
    { employee: 'Subrat Kumar Swain', action: 'Created follow-up task for next week', time: '26h ago', type: 'meeting' },
    { employee: 'Sukhamaya Mohapatra', action: 'Marked opportunity as Won', time: '32h ago', type: 'deal' },
    { employee: 'Yashvardhan Agarwal', action: 'Added new vendor to the system', time: '38h ago', type: 'update' },
    { employee: 'Grihika Jeloka', action: 'Completed client requirements gathering', time: '45h ago', type: 'note' },
    { employee: 'Subrat Kumar Swain', action: 'Scheduled follow-up call with prospect', time: '52h ago', type: 'call' },
    { employee: 'Sukhamaya Mohapatra', action: 'Reviewed and approved quotation', time: '58h ago', type: 'quotation' },
    { employee: 'Yashvardhan Agarwal', action: 'Updated lead source tracking', time: '64h ago', type: 'lead' },
    { employee: 'Grihika Jeloka', action: 'Sent introduction email to new lead', time: '68h ago', type: 'email' },
    { employee: 'Subrat Kumar Swain', action: 'Added notes from client meeting', time: '70h ago', type: 'note' },
    { employee: 'Sukhamaya Mohapatra', action: 'Created new opportunity from qualified lead', time: '72h ago', type: 'opportunity' }
];

// Time-based Mock Data
const mockDataByTimeRange = {
    all: {
        // Funnel Data
        funnel: {
            totalLeads: 350,
            qualified: 210,
            proposalSent: 120,
            closedWon: 42
        },
        // Metric Cards
        metrics: {
            conversionRate: 12.0,
            conversionChange: '+2% vs Last Month',
            pipelineValue: 450000,
            pipelineChange: '+8% This Month',
            activeOpportunities: 175,
            activeOppValue: '$1.2M Value'
        },
        // Opportunity Analysis
        opportunity: [
            { label: 'Business Gained', value: 150, color: '#4caf50' },
            { label: 'Qualified to Opportunity', value: 125, color: '#2196f3' },
            { label: 'Disqualified Leads', value: 100, color: '#ff9800' },
            { label: 'Business Lost', value: 125, color: '#f44336' }
        ],
        // Leads by Source (horizontal bar chart data)
        leadsSource: [
            { label: 'Inbound Lead', value: 2500 },
            { label: 'Direct Outreach', value: 1800 },
            { label: 'Partnerships', value: 10000 },
            { label: 'Existing Upsell', value: 4200 },
            { label: 'Reseller', value: 5000 },
            { label: 'Referral', value: 3800 }
        ]
    },
    month: {
        // Funnel Data
        funnel: {
            totalLeads: 120,
            qualified: 70,
            proposalSent: 35,
            closedWon: 10
        },
        // Metric Cards
        metrics: {
            conversionRate: 8.3,
            conversionChange: '-3.7% vs All Time',
            pipelineValue: 180000,
            pipelineChange: '+5% This Week',
            activeOpportunities: 60,
            activeOppValue: '$380K Value'
        },
        // Opportunity Analysis
        opportunity: [
            { label: 'Business Gained', value: 45, color: '#4caf50' },
            { label: 'Qualified to Opportunity', value: 38, color: '#2196f3' },
            { label: 'Disqualified Leads', value: 22, color: '#ff9800' },
            { label: 'Business Lost', value: 35, color: '#f44336' }
        ],
        // Leads by Source (horizontal bar chart data)
        leadsSource: [
            { label: 'Inbound Lead', value: 800 },
            { label: 'Direct Outreach', value: 550 },
            { label: 'Partnerships', value: 3200 },
            { label: 'Existing Upsell', value: 1400 },
            { label: 'Reseller', value: 1600 },
            { label: 'Referral', value: 1200 }
        ]
    }
};

// Helper function to get current data based on time range
function getCurrentData() {
    const range = dashboardTimeRange === 'custom' ? 'all' : dashboardTimeRange;
    return mockDataByTimeRange[range];
}

// LBS Chart max value
const LBS_MAX_VALUE = 10000;

// Draw Sparklines
function drawSparklines() {
    const range = dashboardTimeRange === 'custom' ? 'all' : dashboardTimeRange;
    const data = sparklineData[range];

    drawSparkline('sparklineConversion', data.conversion);
    drawSparkline('sparklinePipeline', data.pipeline);
    drawSparkline('sparklineOpportunities', data.opportunities);
}

function drawSparkline(elementId, points) {
    const svg = document.getElementById(elementId);
    if (!svg) return;

    // Clear existing content
    svg.innerHTML = '';

    const width = 80;
    const height = 32;
    const padding = 2;

    // Calculate min/max for scaling
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    // Generate path points
    const pathPoints = points.map((value, index) => {
        const x = padding + (index / (points.length - 1)) * (width - padding * 2);
        const y = height - padding - ((value - min) / range) * (height - padding * 2);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');

    // Create path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathPoints);
    svg.appendChild(path);
}

// Show Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Populate Filtered Leads Panel
function populateFilteredLeads() {
    const list = document.getElementById('filteredLeadsList');
    if (!list) return;

    list.innerHTML = '';

    closedWonLeads.forEach(lead => {
        const item = document.createElement('div');
        item.className = 'filtered-lead-item';
        item.innerHTML = `
            <div class="lead-avatar">${lead.initials}</div>
            <div class="lead-info">
                <div class="lead-name">${lead.name}</div>
                <div class="lead-company">${lead.company}</div>
            </div>
            <div class="lead-value">${lead.value}</div>
        `;
        list.appendChild(item);
    });
}

// Handle drill-down on Closed Won
function handleClosedWonClick() {
    activeLeadFilter = 'closed_won';

    // Show filtered panel
    const panel = document.getElementById('leadsFilteredPanel');
    if (panel) {
        panel.style.display = 'block';
        populateFilteredLeads();
    }

    // Scroll to leads section
    const leadsSection = document.getElementById('leads');
    if (leadsSection) {
        leadsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Show toast
    const data = getCurrentData().funnel;
    showToast(`Filtered: Closed Won (${data.closedWon})`);
}

// Clear filter
function clearLeadFilter() {
    activeLeadFilter = null;

    const panel = document.getElementById('leadsFilteredPanel');
    if (panel) {
        panel.style.display = 'none';
    }
}

// Draw Donut Chart
function drawDonutChart() {
    const canvas = document.getElementById('donutChart');
    const ctx = canvas.getContext('2d');

    // Set canvas size (compact for side-by-side layout)
    canvas.width = 160;
    canvas.height = 160;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;
    const innerRadius = radius * 0.6;

    // Get current data based on time range
    const opportunityData = getCurrentData().opportunity;

    // Calculate total
    const total = opportunityData.reduce((sum, item) => sum + item.value, 0);

    // Update center text
    const centerValue = document.querySelector('.donut-value');
    if (centerValue) {
        centerValue.textContent = total;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw slices
    let currentAngle = -Math.PI / 2;

    opportunityData.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;

        // Draw outer arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        currentAngle += sliceAngle;
    });

    // Create legend
    createDonutLegend();
}

// Create Donut Chart Legend
function createDonutLegend() {
    const legendContainer = document.getElementById('donutLegend');
    legendContainer.innerHTML = '';

    // Get current data based on time range
    const opportunityData = getCurrentData().opportunity;

    opportunityData.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${item.color}"></div>
            <span class="legend-label">${item.label}</span>
            <span class="legend-value">${item.value} Leads</span>
        `;
        legendContainer.appendChild(legendItem);
    });
}

// Draw Leads By Source Horizontal Bar Chart
function drawLBSChart() {
    const container = document.getElementById('lbsPlot');
    console.log('[CRM] lbsPlot element:', container);

    if (!container) {
        console.error('[CRM] lbsPlot element not found!');
        return;
    }

    // Get current data based on time range
    const data = getCurrentData().leadsSource;

    // Clear container
    container.innerHTML = '';

    // Render each row
    data.forEach(item => {
        const percentage = (item.value / LBS_MAX_VALUE) * 100;

        const row = document.createElement('div');
        row.className = 'lbs-row';
        row.innerHTML = `
            <div class="lbs-label">${item.label}</div>
            <div class="lbs-bar">
                <div class="lbs-bar-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="lbs-value">${item.value.toLocaleString()}</div>
        `;
        container.appendChild(row);
    });
}

// Sidebar State
let isSidebarCollapsed = false;

// Sidebar Toggle Logic
function initSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', function() {
        isSidebarCollapsed = !isSidebarCollapsed;

        if (isSidebarCollapsed) {
            sidebar.classList.remove('sidebar--expanded');
            sidebar.classList.add('sidebar--collapsed');
            toggleBtn.setAttribute('aria-label', 'Expand sidebar');

            // Close all open dropdowns when collapsing
            document.querySelectorAll('.nav-children').forEach(container => {
                container.classList.remove('expanded');
            });
            document.querySelectorAll('.nav-parent').forEach(parent => {
                parent.classList.remove('expanded');
            });
        } else {
            sidebar.classList.remove('sidebar--collapsed');
            sidebar.classList.add('sidebar--expanded');
            toggleBtn.setAttribute('aria-label', 'Collapse sidebar');
        }
    });
}

// Sidebar Navigation Collapse/Expand Logic
function initSidebar() {
    const navParents = document.querySelectorAll('.nav-parent');

    navParents.forEach(parent => {
        parent.addEventListener('click', function(e) {
            // Don't expand/collapse if sidebar is collapsed
            if (isSidebarCollapsed) return;

            const groupId = this.getAttribute('data-group');
            const childrenContainer = document.getElementById(groupId);

            // Close all other groups
            document.querySelectorAll('.nav-children').forEach(container => {
                if (container !== childrenContainer) {
                    container.classList.remove('expanded');
                }
            });

            document.querySelectorAll('.nav-parent').forEach(p => {
                if (p !== parent) {
                    p.classList.remove('expanded');
                }
            });

            // Toggle current group
            this.classList.toggle('expanded');
            childrenContainer.classList.toggle('expanded');
        });
    });
}

// Create Flyouts for Collapsed Sidebar
function createFlyouts() {
    const navGroups = document.querySelectorAll('.nav-group');

    navGroups.forEach(group => {
        const parent = group.querySelector('.nav-parent');
        const children = group.querySelector('.nav-children');

        if (!parent || !children) return;

        // Create flyout container
        const flyout = document.createElement('div');
        flyout.className = 'nav-flyout';

        // Get parent label text
        const parentLabel = parent.querySelector('.nav-label').textContent;

        // Add flyout title
        const flyoutTitle = document.createElement('div');
        flyoutTitle.className = 'nav-flyout-title';
        flyoutTitle.textContent = parentLabel;
        flyout.appendChild(flyoutTitle);

        // Clone child items into flyout
        const childItems = children.querySelectorAll('.nav-child');
        childItems.forEach(child => {
            const flyoutItem = document.createElement('a');
            flyoutItem.href = '#';
            flyoutItem.className = 'nav-flyout-item';
            flyoutItem.textContent = child.querySelector('.nav-label').textContent;
            flyout.appendChild(flyoutItem);
        });

        // Append flyout to nav group
        group.appendChild(flyout);
    });
}

// Add tooltips to single nav items
function addTooltips() {
    const singleNavItems = document.querySelectorAll('.sidebar > .sidebar-nav > .nav-item:not(.nav-parent)');

    singleNavItems.forEach(item => {
        const label = item.querySelector('.nav-label');
        if (!label) return;

        const tooltip = document.createElement('span');
        tooltip.className = 'nav-tooltip';
        tooltip.textContent = label.textContent;
        item.appendChild(tooltip);
    });
}

// Populate Recent Activities
const VISIBLE_ACTIVITY_COUNT = 8;

function populateActivities() {
    const activitiesList = document.getElementById('activitiesList');
    if (!activitiesList) return;

    activitiesList.innerHTML = '';

    // Show only first N items, rest available via scroll
    const visibleActivities = recentActivities.slice(0, VISIBLE_ACTIVITY_COUNT);

    visibleActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';

        const activityIcon = getActivityIcon(activity.type);

        activityItem.innerHTML = `
            <div class="activity-icon">${activityIcon}</div>
            <div class="activity-content">
                <div class="activity-employee">${activity.employee}</div>
                <div class="activity-action">${activity.action}</div>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;

        activitiesList.appendChild(activityItem);
    });
}

// Get icon for activity type
function getActivityIcon(type) {
    const icons = {
        lead: '👤',
        opportunity: '💼',
        note: '📝',
        quotation: '📄',
        deal: '🤝',
        email: '✉️',
        meeting: '📅',
        update: '🔄',
        call: '📞'
    };
    return icons[type] || '•';
}

// Update Metric Cards
function updateMetricCards() {
    const data = getCurrentData();

    // Conversion Rate
    const convRateValue = document.getElementById('conversionRateValue');
    const convRateChange = document.getElementById('conversionRateChange');
    if (convRateValue) convRateValue.textContent = data.metrics.conversionRate.toFixed(1) + '%';
    if (convRateChange) convRateChange.textContent = data.metrics.conversionChange;

    // Pipeline Value
    const pipelineValue = document.getElementById('pipelineValue');
    const pipelineChange = document.getElementById('pipelineChange');
    if (pipelineValue) pipelineValue.textContent = '$' + (data.metrics.pipelineValue / 1000).toFixed(0) + 'K';
    if (pipelineChange) pipelineChange.textContent = data.metrics.pipelineChange;

    // Active Opportunities
    const activeOppValue = document.getElementById('activeOpportunitiesValue');
    const activeOppSubtext = document.getElementById('activeOpportunitiesSubtext');
    if (activeOppValue) activeOppValue.textContent = data.metrics.activeOpportunities;
    if (activeOppSubtext) activeOppSubtext.textContent = data.metrics.activeOppValue;
}

// Draw Funnel Chart with stage-to-stage percentages
function drawFunnelChart() {
    const canvas = document.getElementById('funnelChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const data = getCurrentData().funnel;

    // Set canvas size to match container
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight || 280;

    const padding = { left: 100, right: 100, top: 30, bottom: 30 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;

    // Funnel stages with values array for step calculation
    const stageValues = [data.totalLeads, data.qualified, data.proposalSent, data.closedWon];
    const stages = [
        { label: 'Total Leads', value: data.totalLeads, color: '#667eea', clickable: false },
        { label: 'Qualified', value: data.qualified, color: '#4285f4', clickable: false },
        { label: 'Proposal Sent', value: data.proposalSent, color: '#1976d2', clickable: false },
        { label: 'Closed Won', value: data.closedWon, color: '#4caf50', clickable: true }
    ];

    const maxValue = data.totalLeads;
    const stageHeight = chartHeight / stages.length;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Store clickable regions for hit detection
    canvas.clickableRegions = [];

    // Draw funnel stages
    stages.forEach((stage, index) => {
        const y = padding.top + index * stageHeight;
        const widthRatio = stage.value / maxValue;
        const stageWidth = chartWidth * widthRatio;
        const x = padding.left + (chartWidth - stageWidth) / 2;

        // Draw trapezoid
        ctx.fillStyle = stage.color;
        ctx.globalAlpha = 0.85;

        if (index === stages.length - 1) {
            // Last stage - rectangle (Closed Won)
            ctx.fillRect(x, y, stageWidth, stageHeight - 5);

            // Store clickable region for Closed Won
            if (stage.clickable) {
                canvas.clickableRegions.push({
                    x: x,
                    y: y,
                    width: stageWidth,
                    height: stageHeight - 5,
                    stage: 'closed_won'
                });
            }
        } else {
            // Trapezoid
            const nextWidthRatio = stages[index + 1].value / maxValue;
            const nextStageWidth = chartWidth * nextWidthRatio;
            const nextX = padding.left + (chartWidth - nextStageWidth) / 2;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + stageWidth, y);
            ctx.lineTo(nextX + nextStageWidth, y + stageHeight - 5);
            ctx.lineTo(nextX, y + stageHeight - 5);
            ctx.closePath();
            ctx.fill();
        }

        ctx.globalAlpha = 1;

        // Draw label and value
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(stage.label, padding.left - 95, y + stageHeight / 2 - 2);

        // Draw step conversion % below label (except for first stage)
        if (index > 0) {
            const stepPercent = ((stage.value / stageValues[index - 1]) * 100).toFixed(0);
            ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = '#999';
            ctx.fillText(`Step: ${stepPercent}%`, padding.left - 95, y + stageHeight / 2 + 12);
        }

        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(stage.value.toString(), padding.left + chartWidth / 2, y + stageHeight / 2 + 5);

        // Draw overall percentage (% of Total)
        const percentage = ((stage.value / maxValue) * 100).toFixed(1) + '%';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'right';
        ctx.fillText(percentage, canvas.width - padding.right + 50, y + stageHeight / 2 + 5);
    });
}

// Initialize funnel click handling
function initFunnelInteraction() {
    const canvas = document.getElementById('funnelChart');
    if (!canvas) return;

    // Change cursor on hover over clickable regions
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let isOverClickable = false;
        if (canvas.clickableRegions) {
            for (const region of canvas.clickableRegions) {
                if (x >= region.x && x <= region.x + region.width &&
                    y >= region.y && y <= region.y + region.height) {
                    isOverClickable = true;
                    break;
                }
            }
        }
        canvas.style.cursor = isOverClickable ? 'pointer' : 'default';
    });

    // Handle click on Closed Won
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (canvas.clickableRegions) {
            for (const region of canvas.clickableRegions) {
                if (x >= region.x && x <= region.x + region.width &&
                    y >= region.y && y <= region.y + region.height) {
                    if (region.stage === 'closed_won') {
                        handleClosedWonClick();
                    }
                    break;
                }
            }
        }
    });
}

// Global function to apply time range changes
function applyTimeRange(newRange) {
    dashboardTimeRange = newRange;

    // Update all dashboard widgets
    updateMetricCards();
    drawSparklines();
    drawFunnelChart();
    drawDonutChart();
    drawLBSChart();

    // Update active state on filter buttons
    document.querySelectorAll('.time-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-range="${newRange}"]`)?.classList.add('active');
}

// Initialize Time Filter
function initTimeFilter() {
    const filterBtns = document.querySelectorAll('.time-filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const range = this.getAttribute('data-range');

            if (range === 'custom') {
                // For now, just use 'month' as placeholder for custom
                // In a full implementation, you'd show a date picker modal
                applyTimeRange('month');
            } else {
                applyTimeRange(range);
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Populate data and draw charts
    populateActivities();
    updateMetricCards();
    drawSparklines();
    drawFunnelChart();
    drawDonutChart();
    drawLBSChart();

    // Initialize sidebar toggle
    initSidebarToggle();

    // Initialize sidebar collapse/expand
    initSidebar();

    // Create flyouts for collapsed mode
    createFlyouts();

    // Add tooltips for single items
    addTooltips();

    // Initialize time filter
    initTimeFilter();

    // Initialize funnel click interaction
    initFunnelInteraction();

    // Initialize clear filter button
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', clearLeadFilter);
    }

    // Redraw charts on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            drawLBSChart();
            drawFunnelChart();
        }, 250);
    });
});
