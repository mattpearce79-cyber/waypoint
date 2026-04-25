'use client';

import { useState } from 'react';

// ─── Design tokens ───────────────────────────────────────────────
const C = {
  blue:      '#002E6D',
  teal:      '#45C2B1',
  tealDark:  '#1BA39C',
  orange:    '#F29729',
  prostate:  '#0182FC',
  bg:        '#F3F6FC',
  bgLight:   '#F7F9FB',
  white:     '#FFFFFF',
  text:      '#313131',
  text2:     '#717A86',
  text3:     '#B9C4D9',
  border:    '#E4EAF4',
  shadowSm:  '0 1px 4px rgba(0,46,109,0.06)',
  shadowMd:  '0 2px 12px rgba(0,46,109,0.09)',
} as const;

// ─── Shared primitives ───────────────────────────────────────────

type BadgeVariant = 'teal' | 'orange' | 'blue' | 'grey' | 'green';

const BADGE: Record<BadgeVariant, React.CSSProperties> = {
  teal:   { background: 'rgba(69,194,177,0.12)',  color: '#1BA39C' },
  orange: { background: 'rgba(242,151,41,0.14)',  color: '#c97a10' },
  blue:   { background: 'rgba(1,130,252,0.10)',   color: '#0160c2' },
  grey:   { background: C.bg,                     color: C.text2, border: `1px solid ${C.border}` },
  green:  { background: 'rgba(39,174,96,0.12)',   color: '#1a7a42' },
};

function Badge({
  variant,
  children,
  style,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        borderRadius: 9999, padding: '3px 10px', fontSize: 11, fontWeight: 600,
        ...BADGE[variant], ...style,
      }}
    >
      {children}
    </span>
  );
}

// ─── SVG icons ───────────────────────────────────────────────────

const icons = {
  home: (stroke = 'currentColor') => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  activity: () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  calendar: () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3} y={4} width={18} height={18} rx={2} />
      <line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} />
    </svg>
  ),
  message: () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  edit: () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  info: () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={10} /><line x1={12} y1={8} x2={12} y2={12} /><line x1={12} y1={16} x2={12.01} y2={16} />
    </svg>
  ),
  user: () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} />
    </svg>
  ),
  bell: () => (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={C.text2} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  chevLeft: () => (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  chevRight: () => (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  check: (size = 10, strokeColor = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  pill: (strokeColor = '#0182FC') => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1={6} y1={1} x2={6} y2={4} /><line x1={10} y1={1} x2={10} y2={4} /><line x1={14} y1={1} x2={14} y2={4} />
    </svg>
  ),
  monitor: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={2} y={3} width={20} height={14} rx={2} /><line x1={8} y1={21} x2={16} y2={21} /><line x1={12} y1={17} x2={12} y2={21} />
    </svg>
  ),
  phone: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={5} y={2} width={14} height={20} rx={2} /><line x1={12} y1={18} x2={12.01} y2={18} />
    </svg>
  ),
};

// ─── Desktop: Sidebar ────────────────────────────────────────────

const NAV = [
  {
    label: 'My health',
    items: [
      { icon: icons.home('#45C2B1'), label: 'Dashboard', active: true },
      { icon: icons.activity(), label: 'My results' },
      { icon: icons.calendar(), label: 'Appointments', badge: 2 },
      { icon: icons.message(), label: 'Messages', badge: 1 },
    ],
  },
  {
    label: 'Self-management',
    items: [
      { icon: icons.edit(), label: 'Check-in' },
      { icon: icons.info(), label: 'Resources' },
    ],
  },
  {
    label: 'Account',
    items: [{ icon: icons.user(), label: 'My profile' }],
  },
];

function Sidebar() {
  return (
    <div style={{ width: 230, background: C.blue, display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
      <div style={{ padding: '28px 22px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>
          Way<span style={{ color: C.teal }}>point</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Patient portal
        </div>
      </div>

      <div style={{ padding: '16px 12px', flex: 1 }}>
        {NAV.map((section) => (
          <div key={section.label}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '14px 10px 6px' }}>
              {section.label}
            </div>
            {section.items.map((item) => (
              <button
                key={item.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px',
                  borderRadius: 8, fontSize: 13, fontWeight: 600, width: '100%', textAlign: 'left',
                  color: item.active ? '#fff' : 'rgba(255,255,255,0.55)',
                  background: item.active ? 'rgba(69,194,177,0.14)' : 'none',
                  border: 'none', cursor: 'pointer', marginBottom: 2, fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ opacity: item.active ? 1 : 0.6, flexShrink: 0 }}>{item.icon}</span>
                {item.label}
                {item.badge != null && (
                  <span style={{ marginLeft: 'auto', background: C.orange, color: '#fff', borderRadius: 9999, fontSize: 10, fontWeight: 700, padding: '2px 8px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
          JD
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>James Davies</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>NHS · 123 456 7890</div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop: Topbar ─────────────────────────────────────────────

function Topbar() {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Good morning, James.</div>
        <div style={{ fontSize: 12, color: C.text2, marginTop: 2 }}>Saturday, 25 April 2026 · Your next appointment is in 20 days</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: C.bg, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {icons.bell()}
          <div style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#E53935', border: '1.5px solid #fff' }} />
        </div>
        <button style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 13, background: C.orange, color: '#fff', border: 'none', borderRadius: 9999, padding: '9px 18px', cursor: 'pointer' }}>
          Complete check-in
        </button>
      </div>
    </div>
  );
}

// ─── Desktop: Stat cards ─────────────────────────────────────────

function StatCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
      {/* Next appointment */}
      <div style={{ background: C.white, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, boxShadow: C.shadowSm, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: C.teal }} />
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next appointment</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.blue, lineHeight: 1.1 }}>15 May</div>
        <div style={{ fontSize: 12, color: C.text2 }}>Virtual review · 10:30am</div>
        <Badge variant="teal" style={{ marginTop: 4 }}>
          {icons.check(10)} Confirmed
        </Badge>
      </div>

      {/* PSA level */}
      <div style={{ background: C.white, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, boxShadow: C.shadowSm, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: C.prostate }} />
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>PSA level</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.blue, lineHeight: 1.1 }}>
          4.2 <span style={{ fontSize: 14, fontWeight: 400, color: C.text2 }}>ng/mL</span>
        </div>
        <div style={{ fontSize: 12, color: C.text2 }}>Last tested 22 Apr 2026</div>
        <Badge variant="orange" style={{ marginTop: 4 }}>Monitoring</Badge>
      </div>

      {/* Weekly check-in */}
      <div style={{ background: C.white, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, boxShadow: C.shadowSm, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: C.orange }} />
        <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weekly check-in</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.orange, lineHeight: 1.1 }}>Due today</div>
        <div style={{ fontSize: 12, color: C.text2 }}>Keeps your care team informed</div>
        <Badge variant="orange" style={{ marginTop: 4 }}>3 min · Tap to start</Badge>
      </div>
    </div>
  );
}

// ─── Desktop: Calendar ───────────────────────────────────────────

type CalCell = { d: number; other?: boolean; appt?: boolean; today?: boolean };

const MAY_WEEKS: CalCell[][] = [
  [{ d: 28, other: true }, { d: 29, other: true }, { d: 30, other: true }, { d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }],
  [{ d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9 }, { d: 10 }, { d: 11 }],
  [{ d: 12 }, { d: 13 }, { d: 14 }, { d: 15, appt: true }, { d: 16 }, { d: 17 }, { d: 18 }],
  [{ d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23 }, { d: 24 }, { d: 25, today: true }],
  [{ d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30 }, { d: 31 }, { d: 1, other: true }],
];

function CalendarCard() {
  const dayStyle = (cell: CalCell): React.CSSProperties => {
    if (cell.today)  return { background: C.blue, color: '#fff', fontWeight: 700 };
    if (cell.appt)   return { background: 'rgba(69,194,177,0.12)', color: C.tealDark, fontWeight: 700 };
    if (cell.other)  return { color: C.text3 };
    return { color: C.text2 };
  };

  return (
    <div style={{ background: C.white, borderRadius: 16, boxShadow: C.shadowSm, border: `1px solid ${C.border}`, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>May 2026</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[icons.chevLeft, icons.chevRight].map((Icon, i) => (
            <button key={i} style={{ width: 28, height: 28, borderRadius: 8, background: C.bg, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.text2 }}>
              <Icon />
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
        {['Mo','Tu','We','Th','Fr','Sa','Su'].map((d) => (
          <div key={d} style={{ fontSize: 10, fontWeight: 700, color: C.text3, textAlign: 'center', padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d}</div>
        ))}
        {MAY_WEEKS.flat().map((cell, i) => (
          <div
            key={i}
            style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, borderRadius: 8, cursor: 'pointer', position: 'relative', transition: 'all 0.15s', ...dayStyle(cell) }}
          >
            {cell.d}
            {cell.appt && !cell.today && (
              <span style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: C.teal }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: C.text2 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.teal, flexShrink: 0 }} /> Appointment
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: C.text2 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: C.blue, flexShrink: 0 }} /> Today
        </div>
      </div>
    </div>
  );
}

// ─── Desktop: Appointments list ───────────────────────────────────

const APPOINTMENTS = [
  { day: 15, month: 'May', title: 'Virtual review', detail: '10:30am · Dr. Sarah Chen · Urology', badge: 'teal' as BadgeVariant, badgeLabel: 'Virtual' },
  { day: 2,  month: 'Jun', title: 'Blood test',     detail: '8:45am · City Hospital · Please fast for 8 hours', badge: 'orange' as BadgeVariant, badgeLabel: 'Prep needed' },
  { day: 18, month: 'Jul', title: 'Clinic review',  detail: '2:00pm · Dr. Sarah Chen · In person', badge: 'grey' as BadgeVariant, badgeLabel: 'In person' },
];

function AppointmentsCard() {
  return (
    <div style={{ background: C.white, borderRadius: 16, boxShadow: C.shadowSm, border: `1px solid ${C.border}`, padding: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.text2, marginBottom: 12 }}>Upcoming appointments</div>
      {APPOINTMENTS.map((appt, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: i < APPOINTMENTS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ minWidth: 48, textAlign: 'center', background: C.bg, borderRadius: 8, padding: '8px 6px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.blue, lineHeight: 1 }}>{appt.day}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.text2, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{appt.month}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{appt.title}</div>
            <div style={{ fontSize: 12, color: C.text2, marginTop: 3, lineHeight: 1.4 }}>{appt.detail}</div>
          </div>
          <Badge variant={appt.badge}>{appt.badgeLabel}</Badge>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop: Health metrics ──────────────────────────────────────

const METRICS = [
  { name: 'PSA level', sub: 'Reference < 4.0 ng/mL', val: '4.2 ng/mL', badge: 'orange' as BadgeVariant, badgeLabel: 'Monitor', progress: { pct: 70, color: C.orange } },
  { name: 'Blood pressure', sub: 'Recorded today', val: '122/78', badge: 'green' as BadgeVariant, badgeLabel: 'Normal' },
  { name: 'Weight', sub: '3 days ago', val: '82.4 kg', badge: 'grey' as BadgeVariant, badgeLabel: 'Stable' },
  { name: 'Testosterone', sub: 'Last blood test · 22 Apr', val: '0.8 nmol/L', badge: 'green' as BadgeVariant, badgeLabel: 'On target', progress: { pct: 30, color: C.teal } },
];

function HealthMetricsCard() {
  return (
    <div style={{ background: C.white, borderRadius: 16, boxShadow: C.shadowSm, border: `1px solid ${C.border}`, padding: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.text2, marginBottom: 12 }}>Health metrics</div>
      {METRICS.map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < METRICS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{m.name}</div>
            <div style={{ fontSize: 11, color: C.text2, marginTop: 2 }}>{m.sub}</div>
            {m.progress && (
              <div style={{ height: 5, background: C.bg, borderRadius: 999, marginTop: 7, overflow: 'hidden', width: 180 }}>
                <div style={{ height: '100%', width: `${m.progress.pct}%`, borderRadius: 999, background: m.progress.color }} />
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.blue }}>{m.val}</div>
            <Badge variant={m.badge} style={{ fontSize: 10, marginTop: 4 }}>{m.badgeLabel}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop: Medication card ─────────────────────────────────────

function MedicationCard() {
  return (
    <div style={{ background: C.white, borderRadius: 16, boxShadow: C.shadowSm, border: `1px solid ${C.border}`, padding: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.text2, marginBottom: 12 }}>Medication today</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Bicalutamide */}
        <div style={{ background: 'rgba(1,130,252,0.04)', border: '1px solid rgba(1,130,252,0.14)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(1,130,252,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {icons.pill()}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Bicalutamide 50mg</div>
            <div style={{ fontSize: 12, color: C.text2, marginTop: 2 }}>Once daily · Morning</div>
          </div>
          <button style={{ marginLeft: 'auto', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, background: C.teal, color: '#fff', border: 'none', borderRadius: 9999, padding: '7px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Mark taken
          </button>
        </div>

        {/* Zoladex */}
        <div style={{ background: 'rgba(39,174,96,0.04)', border: '1px solid rgba(39,174,96,0.18)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {icons.check(20, '#27AE60')}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Zoladex 3.6mg</div>
            <div style={{ fontSize: 12, color: C.text2, marginTop: 2 }}>Injection · Next due 12 Jun</div>
          </div>
          <Badge variant="green" style={{ marginLeft: 'auto' }}>Up to date</Badge>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop: Wellbeing card ──────────────────────────────────────

function WellbeingCard() {
  return (
    <div style={{ background: 'linear-gradient(120deg,#002E6D 0%,#004faa 100%)', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>How are you feeling today?</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.5 }}>Your weekly check-in helps us provide the best care for you.</div>
      </div>
      <button style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 13, background: C.orange, color: '#fff', border: 'none', borderRadius: 9999, padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Start check-in
      </button>
    </div>
  );
}

// ─── Desktop view (full layout) ───────────────────────────────────

function DesktopView() {
  return (
    <div style={{ width: 1200, height: 760, background: C.bg, borderRadius: 16, overflow: 'hidden', display: 'flex', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.bg }}>
        <Topbar />
        <div style={{ flex: 1, overflowY: 'auto', padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <StatCards />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CalendarCard />
              <AppointmentsCard />
            </div>
            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <HealthMetricsCard />
              <MedicationCard />
              <WellbeingCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile view (phone frame) ────────────────────────────────────

const MOB_WEEKS: CalCell[][] = [
  [{ d: 28, other: true }, { d: 29, other: true }, { d: 30, other: true }, { d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }],
  [{ d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9 }, { d: 10 }, { d: 11 }],
  [{ d: 12 }, { d: 13 }, { d: 14 }, { d: 15, appt: true }, { d: 16 }, { d: 17 }, { d: 18 }],
  [{ d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23 }, { d: 24 }, { d: 25, today: true }],
  [{ d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30 }, { d: 31 }, { d: 1, other: true }],
];

const MOB_TABS = [
  { icon: icons.home, label: 'Home', active: true },
  { icon: icons.calendar, label: 'Appointments' },
  { icon: icons.activity, label: 'Results' },
  { icon: icons.message, label: 'Messages' },
  { icon: icons.user, label: 'Profile' },
];

function MobileView() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: 393, height: 760, background: C.bg, borderRadius: 40, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.4)', border: '8px solid #1a1a1a', position: 'relative' }}>

        {/* Status bar */}
        <div style={{ background: C.blue, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
              <path d="M1.51 8a15 15 0 0 1 21 0M5 12a11 11 0 0 1 14 0M8.53 16a6 6 0 0 1 6.95 0" />
              <circle cx={12} cy={20} r={1} fill="white" />
            </svg>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="white">
              <rect x={2} y={7} width={16} height={10} rx={2} />
              <path d="M22 11v2a2 2 0 0 1-2 2h0V9h0a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: C.blue, padding: '4px 20px 20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>Good morning,</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 1 }}>James</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 7, height: 7, borderRadius: '50%', background: '#E53935', border: `1.5px solid ${C.blue}` }} />
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>JD</div>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Next appointment hero */}
          <div style={{ background: 'linear-gradient(130deg,#003580 0%,#0055b0 100%)', borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Next appointment</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Thursday, 15 May</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>10:30am · Virtual review with Dr. Sarah Chen</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
              <Badge variant="teal">
                {icons.check(9)} Confirmed · 20 days
              </Badge>
              <button style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 13, background: C.orange, color: '#fff', border: 'none', borderRadius: 9999, padding: '9px 20px', cursor: 'pointer' }}>
                View details
              </button>
            </div>
          </div>

          {/* Check-in prompt */}
          <div style={{ background: 'linear-gradient(120deg,#45C2B1,#1BA39C)', borderRadius: 16, border: 'none' }}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Weekly check-in due</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>About 3 minutes · Due today</div>
              </div>
              <button style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 12, background: '#fff', color: C.tealDark, border: 'none', borderRadius: 9999, padding: '8px 14px', cursor: 'pointer' }}>
                Start
              </button>
            </div>
          </div>

          {/* Mini calendar */}
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: C.shadowSm, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.text2, marginBottom: 10 }}>May 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
              {['Mo','Tu','We','Th','Fr','Sa','Su'].map((d) => (
                <div key={d} style={{ fontSize: 9, fontWeight: 700, color: C.text3, textAlign: 'center', textTransform: 'uppercase', padding: '3px 0' }}>{d}</div>
              ))}
              {MOB_WEEKS.flat().map((cell, i) => {
                let style: React.CSSProperties = { fontSize: 11, fontWeight: 500, color: C.text2, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1' };
                if (cell.today) style = { ...style, background: C.blue, color: '#fff', fontWeight: 700 };
                else if (cell.appt) style = { ...style, background: 'rgba(69,194,177,0.14)', color: C.tealDark, fontWeight: 700 };
                else if (cell.other) style = { ...style, color: C.text3 };
                return <div key={i} style={style}>{cell.d}</div>;
              })}
            </div>
          </div>

          {/* Health metrics grid */}
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: C.shadowSm, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.text2, marginBottom: 10 }}>Health metrics</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'PSA level', val: '4.2', valColor: C.orange, sub: 'ng/mL · Monitoring' },
                { label: 'Blood pressure', val: '122/78', sub: 'Normal · Today' },
                { label: 'Weight', val: '82.4', sub: 'kg · Stable' },
                { label: 'Testosterone', val: '0.8', valSize: 16, sub: 'nmol/L · On target' },
              ].map((m, i) => (
                <div key={i} style={{ background: C.bg, borderRadius: 12, padding: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: C.text2 }}>{m.label}</div>
                  <div style={{ fontSize: m.valSize ?? 20, fontWeight: 700, color: m.valColor ?? C.blue, marginTop: 4, lineHeight: 1 }}>{m.val}</div>
                  <div style={{ fontSize: 10, color: C.text2, marginTop: 3 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Medication */}
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: C.shadowSm, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.text2, marginBottom: 10 }}>Today&apos;s medication</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Bicalutamide 50mg</div>
                <div style={{ fontSize: 11, color: C.text2, marginTop: 2 }}>Once daily · Morning</div>
              </div>
              <button style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 11, background: C.teal, color: '#fff', border: 'none', borderRadius: 9999, padding: '7px 14px', cursor: 'pointer' }}>
                Mark taken
              </button>
            </div>
            <div style={{ height: 1, background: C.border, margin: '6px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Zoladex injection</div>
                <div style={{ fontSize: 11, color: C.text2, marginTop: 2 }}>Next due 12 June</div>
              </div>
              <Badge variant="green" style={{ fontSize: 10 }}>Up to date</Badge>
            </div>
          </div>

          <div style={{ height: 4 }} />
        </div>

        {/* Bottom tab bar */}
        <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, display: 'flex', padding: '8px 0 16px', flexShrink: 0 }}>
          {MOB_TABS.map((tab, i) => (
            <button
              key={i}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 0', border: 'none', background: 'none', fontFamily: 'inherit' }}
            >
              <span style={{ display: 'flex' }}>
                {React.cloneElement(tab.icon() as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
                  width: 22,
                  height: 22,
                  stroke: tab.active ? C.teal : C.text3,
                })}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: tab.active ? C.teal : C.text3 }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

import React from 'react';

type View = 'desktop' | 'mobile';

export default function DashboardPage() {
  const [view, setView] = useState<View>('desktop');

  return (
    <div style={{ fontFamily: 'inherit', background: '#1C2B45', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, gap: 16 }}>
      {/* View toggle */}
      <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 9999, padding: 4, alignSelf: 'center' }}>
        {(['desktop', 'mobile'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
              borderRadius: 9999, padding: '8px 20px', transition: 'all 0.2s ease',
              color: view === v ? C.blue : 'rgba(255,255,255,0.6)',
              background: view === v ? '#fff' : 'transparent',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {v === 'desktop' ? icons.monitor() : icons.phone()}
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {view === 'desktop' ? <DesktopView /> : <MobileView />}
    </div>
  );
}
