// gen-core.jsx — shared primitives for the BidBlocks AI generation states
const { useState, useEffect, useRef, useCallback } = React;

/* ───────────────────────── Icons (inline Lucide) ───────────────────────── */
const GEN_ICONS = {
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  square: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
  replay: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  percent: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  'triangle-alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
};

function Icon({ name, size = 20, strokeWidth = 1.75, className = '', style }) {
  return React.createElement('svg', {
    className: 'lucide ' + className,
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth,
    strokeLinecap: 'round', strokeLinejoin: 'round', style,
    dangerouslySetInnerHTML: { __html: GEN_ICONS[name] || '' },
  });
}

/* ───────────────────────── Comparison content ──────────────────────────── */
const CMP = {
  docs: ['Invitation to Tender', 'Incumbent contract', 'Our draft response'],
  meta: ['42 pp · PDF', '68 pp · DOCX', '24 pp · live'],
  rows: [
    { crit: 'Liability cap',     icon: 'scale',   vals: ['£5m / claim', '£2m aggregate', '£5m / claim'],   align: [null, 'divergent', 'match'] },
    { crit: 'Termination notice',icon: 'clock',   vals: ['90 days', '30 days', '90 days'],                 align: [null, 'divergent', 'match'] },
    { crit: 'Indemnification',   icon: 'shield',  vals: ['Mutual', 'Supplier-only', 'Mutual'],             align: [null, 'divergent', 'match'] },
    { crit: 'Service credits',   icon: 'percent', vals: ['Up to 10%', 'Up to 4%', 'Up to 10%'],            align: [null, 'divergent', 'match'] },
    { crit: 'Data protection',   icon: 'lock',    vals: ['GDPR + ISO 27001', 'UK GDPR', 'GDPR + ISO 27001'],align: [null, 'partial', 'match'] },
  ],
  steps: [
    'Reading Invitation to Tender (42 pp)…',
    'Extracting liability & indemnity clauses…',
    'Aligning clauses across 3 documents…',
    'Scoring divergence & commercial risk…',
    'Building comparison table…',
  ],
};

/* ───────────────────────── Lifecycle loop hook ─────────────────────────── */
function useGenLoop({ steps, cells, stepMs = 1150, holdMs = 3400, autoLoop = true }) {
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState('run');
  const startRef = useRef(performance.now());
  const phaseRef = useRef('run');
  const total = steps * stepMs;

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const restart = useCallback(() => {
    startRef.current = performance.now();
    setPhase('run'); setTick(0);
  }, []);
  const stop = useCallback(() => { setPhase('stopped'); }, []);

  useEffect(() => {
    let holdUntil = null;
    const id = setInterval(() => {
      const now = performance.now();
      const p = phaseRef.current;
      if (p === 'run') {
        const e = now - startRef.current;
        if (e >= total) { setPhase('done'); setTick(total); holdUntil = now + holdMs; }
        else setTick(e);
      } else if (p === 'done') {
        if (autoLoop && holdUntil && now >= holdUntil) { holdUntil = null; restart(); }
      }
    }, 45);
    return () => clearInterval(id);
  }, [total, holdMs, autoLoop, restart]);

  const progress = phase === 'done' ? 1 : Math.min(1, tick / total);
  const stepIndex = phase === 'done' ? steps - 1 : Math.min(steps - 1, Math.floor(progress * steps));
  const cellP = Math.max(0, Math.min(1, (progress - 0.38) / 0.62));
  const revealedCells = phase === 'done' ? cells : Math.floor(cellP * cells);
  return { phase, progress, stepIndex, revealedCells, restart, stop };
}

/* ───────────────────────── Shared bits ─────────────────────────────────── */
function Skel({ w = '100%', h = 11, style }) {
  return React.createElement('span', { className: 'gen-skel', style: { width: w, height: h, ...style } });
}

function DocChip({ i, lit = true, dim = false }) {
  return (
    <div className={'gen-doc' + (lit ? ' lit' : '') + (dim ? ' dim' : '')}>
      <span className="gen-doc-ic"><Icon name="file-text" size={15} /></span>
      <div className="gen-doc-txt">
        <b>{CMP.docs[i]}</b>
        <span>{CMP.meta[i]}</span>
      </div>
    </div>
  );
}

function AlignPill({ kind }) {
  if (!kind) return null;
  const map = {
    match:     { cls: 'badge-success', label: 'Aligned' },
    divergent: { cls: 'badge-danger',  label: 'Divergent' },
    partial:   { cls: 'badge-info',    label: 'Partial' },
  };
  const m = map[kind];
  return <span className={'badge badge-md ' + m.cls}>{m.label}</span>;
}

Object.assign(window, { Icon, CMP, useGenLoop, Skel, DocChip, AlignPill });
