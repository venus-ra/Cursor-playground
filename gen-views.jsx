// gen-views.jsx — in-context hero + four AI-generation-state variations
const { useState: useS2 } = React;

function fmtTime(p, totalMs) {
  const s = Math.round((p * totalMs) / 1000);
  return '0:' + String(s).padStart(2, '0');
}

/* ════════════════════════ Shared comparison table ═══════════════════════ */
function ComparisonTable({ revealed, done }) {
  return (
    <div className="gen-tbl">
      <div className="gen-tr gen-thead">
        <div className="gen-th gen-crit-h">Clause</div>
        {CMP.docs.map((d, i) => (
          <div className="gen-th" key={i}>
            <span className={'gen-th-ic c' + i}><Icon name="file-text" size={13} /></span>
            <div className="gen-th-txt"><b>{d}</b><span>{CMP.meta[i]}</span></div>
          </div>
        ))}
      </div>
      {CMP.rows.map((r, ri) => (
        <div className="gen-tr" key={ri}>
          <div className="gen-td gen-crit"><Icon name={r.icon} size={15} /><span>{r.crit}</span></div>
          {r.vals.map((v, ci) => {
            const idx = ri * 3 + ci;
            const show = done || revealed > idx;
            const al = r.align[ci];
            return (
              <div className={'gen-td gen-val' + (show && al ? ' al-' + al : '')} key={ci}>
                {show ? (
                  <span className="gen-cell-val">
                    <span>{v}</span>
                    {al === 'match' && <Icon name="check" size={13} className="gen-mini ok" />}
                    {al === 'divergent' && <Icon name="triangle-alert" size={13} className="gen-mini warn" />}
                  </span>
                ) : <Skel w={ci === 2 ? '68%' : '54%'} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SummaryStrip() {
  return (
    <div className="gen-summary">
      <Icon name="circle-check" size={16} className="gen-sum-ic" />
      <span><b>4 of 5 clauses</b> in your draft align with the ITT</span>
      <span className="gen-sum-pills">
        <AlignPill kind="match" /><AlignPill kind="partial" /><AlignPill kind="divergent" />
      </span>
    </div>
  );
}

/* ════════════════════════ HERO — in app context ═════════════════════════ */
function GenHero() {
  const TOTAL = CMP.steps.length * 1150;
  const g = useGenLoop({ steps: CMP.steps.length, cells: 15, stepMs: 1150, holdMs: 4200 });
  const running = g.phase === 'run';
  const done = g.phase === 'done';

  return (
    <div className="gen-app">
      <nav className="gen-rail">
        <div className="gen-mark">A</div>
        <div className="gen-rail-sep"></div>
        <button className="rail-item"><Icon name="search" size={20} /></button>
        <button className="rail-item active"><Icon name="sparkles" size={20} /></button>
        <button className="rail-item"><Icon name="layers" size={20} /></button>
        <button className="rail-item"><Icon name="file-text" size={20} /></button>
      </nav>

      <div className="gen-main">
        <header className="gen-topbar">
          <div className="crumb">
            <span>Research assistant</span>
            <Icon name="chevron-right" size={14} className="sep" />
            <b>Compare documents</b>
          </div>
          <div className="gen-top-actions">
            <span className="avatar">RB</span>
          </div>
        </header>

        <div className="gen-body">
          <div className="gen-pagehead">
            <h1 className="ds-h1">Compare documents</h1>
            <span className="sub">Liability &amp; commercial terms · 3 documents</span>
          </div>

          <section className="card gen-card">
            <div className="gen-head">
              <div className={'gen-spark-badge' + (running ? ' busy' : done ? ' done' : '')}>
                <Icon name={done ? 'circle-check' : 'sparkles'} size={20} className={running ? 'gen-spark' : ''} />
              </div>
              <div className="gen-head-txt">
                <div className="gen-head-line">{done ? 'Comparison ready' : CMP.steps[g.stepIndex]}</div>
                <div className="gen-head-sub">
                  {done
                    ? '5 clauses · 3 documents · grounded in your library'
                    : `Step ${g.stepIndex + 1} of ${CMP.steps.length} · ${fmtTime(g.progress, TOTAL)}`}
                </div>
              </div>
              <div className="gen-head-actions">
                {running && (
                  <button className="btn btn-outlined compact gen-stop" onClick={g.stop}>
                    <Icon name="x" size={15} />Stop
                  </button>
                )}
                {done && (
                  <>
                    <button className="btn btn-text compact" onClick={g.restart}><Icon name="replay" size={15} />Replay</button>
                    <button className="btn btn-filled compact"><Icon name="download" size={15} />Export</button>
                  </>
                )}
                {g.phase === 'stopped' && (
                  <button className="btn btn-tonal compact" onClick={g.restart}><Icon name="replay" size={15} />Resume</button>
                )}
              </div>
            </div>

            {!done && (
              <div className="gen-bar">
                <div className="bar-track"><div className="bar-fill" style={{ width: (g.progress * 100).toFixed(1) + '%' }}></div></div>
              </div>
            )}

            {done && <SummaryStrip />}

            <ComparisonTable revealed={g.revealedCells} done={done} />
          </section>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════ A · Stepped skeleton ══════════════════════════ */
function VarStepped() {
  const g = useGenLoop({ steps: CMP.steps.length, cells: 15, stepMs: 1050, holdMs: 3200 });
  const done = g.phase === 'done';
  return (
    <div className="card gen-card v-stepped">
      <div className="gen-head sm">
        <div className={'gen-spark-badge sm' + (g.phase === 'run' ? ' busy' : done ? ' done' : '')}>
          <Icon name={done ? 'circle-check' : 'sparkles'} size={16} className={g.phase === 'run' ? 'gen-spark' : ''} />
        </div>
        <div className="gen-head-txt">
          <div className="gen-head-line sm">{done ? 'Comparison ready' : 'Comparing documents'}</div>
          <div className="gen-head-sub">{done ? '5 clauses · 3 documents' : `Step ${g.stepIndex + 1} of ${CMP.steps.length}`}</div>
        </div>
        {!done
          ? <button className="btn-icon ib-sm" onClick={g.stop} title="Stop"><Icon name="x" size={15} /></button>
          : <button className="btn-icon ib-sm" onClick={g.restart} title="Replay"><Icon name="replay" size={15} /></button>}
      </div>

      <ol className="gen-steps">
        {CMP.steps.map((s, i) => {
          const state = done || i < g.stepIndex ? 'done' : i === g.stepIndex ? 'active' : 'pending';
          return (
            <li className={'gen-step ' + state} key={i}>
              <span className="ic">
                {state === 'done' ? <Icon name="circle-check" size={18} />
                  : state === 'active' ? <span className="gen-spin"></span>
                  : <Icon name="circle" size={18} />}
              </span>
              <span className="gen-step-label">{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ════════════════════════ B · Determinate progress ══════════════════════ */
function VarProgress() {
  const STEPS = CMP.steps.length;
  const g = useGenLoop({ steps: STEPS, cells: 15, stepMs: 1050, holdMs: 3200 });
  const done = g.phase === 'done';
  const pct = Math.round(g.progress * 100);
  const docsLit = done ? 3 : Math.min(3, Math.floor(g.progress / 0.15) + 1);
  return (
    <div className="card gen-card v-progress">
      <div className="gen-head sm">
        <div className={'gen-spark-badge sm' + (g.phase === 'run' ? ' busy' : done ? ' done' : '')}>
          <Icon name={done ? 'circle-check' : 'sparkles'} size={16} className={g.phase === 'run' ? 'gen-spark' : ''} />
        </div>
        <div className="gen-head-txt">
          <div className="gen-head-line sm">{done ? 'Comparison ready' : 'Generating comparison'}</div>
          <div className="gen-head-sub">Liability &amp; commercial terms</div>
        </div>
        <div className="gen-pct">{done ? '100%' : pct + '%'}</div>
      </div>

      <div className="gen-docs-row">
        {CMP.docs.map((d, i) => <DocChip key={i} i={i} lit={i < docsLit} dim={i >= docsLit} />)}
      </div>

      <div className="bar-track lg"><div className="bar-fill" style={{ width: (g.progress * 100).toFixed(1) + '%' }}></div></div>

      <div className="gen-now">
        {done
          ? <><Icon name="circle-check" size={15} className="gen-now-ok" /><span>All clauses aligned &amp; scored</span></>
          : <><span className="gen-spin sm"></span><span>{CMP.steps[g.stepIndex]}</span></>}
        {!done
          ? <button className="btn btn-text compact gen-now-btn" onClick={g.stop}><Icon name="x" size={14} />Stop</button>
          : <button className="btn btn-text compact gen-now-btn" onClick={g.restart}><Icon name="replay" size={14} />Replay</button>}
      </div>
    </div>
  );
}

/* ════════════════════════ C · Calm / minimal ════════════════════════════ */
function VarCalm() {
  const g = useGenLoop({ steps: CMP.steps.length, cells: 15, stepMs: 1100, holdMs: 3400 });
  const done = g.phase === 'done';
  return (
    <div className="card gen-card v-calm">
      <div className={'gen-calm-spark' + (g.phase === 'run' ? ' busy' : done ? ' done' : '')}>
        <Icon name={done ? 'circle-check' : 'sparkles'} size={22} className={g.phase === 'run' ? 'gen-spark' : ''} />
      </div>
      <div className="gen-calm-line">{done ? 'Comparison ready' : CMP.steps[g.stepIndex]}</div>
      <div className="gen-calm-sub">{done ? '5 clauses compared across 3 documents' : 'Comparing 3 documents · liability & commercial terms'}</div>
      <div className="gen-indet-wrap">
        {done
          ? <div className="gen-indet done"><i style={{ width: '100%', transform: 'none' }}></i></div>
          : <div className="gen-indet"><i></i></div>}
      </div>
      {!done
        ? <button className="btn btn-text compact gen-calm-btn" onClick={g.stop}>Stop generation</button>
        : <button className="btn btn-text compact gen-calm-btn" onClick={g.restart}><Icon name="arrow-up-right" size={15} />View results</button>}
    </div>
  );
}

/* ════════════════════════ D · Expressive / scanning ═════════════════════ */
function VarExpressive() {
  const g = useGenLoop({ steps: CMP.steps.length, cells: 15, stepMs: 1100, holdMs: 3600 });
  const done = g.phase === 'done';
  const docState = (i) => {
    if (done) return 'read';
    const t = g.progress;
    const start = i * 0.16, end = start + 0.22;
    if (t >= end) return 'read';
    if (t >= start) return 'scan';
    return 'wait';
  };
  return (
    <div className="card gen-card v-expressive">
      <div className="gen-exp-head">
        <span className={'gen-exp-spark' + (done ? ' done' : '')}><Icon name={done ? 'circle-check' : 'sparkles'} size={18} /></span>
        <div className="gen-head-txt">
          <div className="gen-head-line sm">{done ? 'Comparison ready' : 'Reading your documents'}</div>
          <div className="gen-head-sub">{done ? '4 aligned · 1 partial · 0 missed' : 'Extracting & aligning clauses'}</div>
        </div>
        {!done
          ? <button className="btn-icon ib-sm" onClick={g.stop} title="Stop"><Icon name="x" size={15} /></button>
          : <button className="btn-icon ib-sm" onClick={g.restart} title="Replay"><Icon name="replay" size={15} /></button>}
      </div>

      <div className="gen-exp-cards">
        {CMP.docs.map((d, i) => {
          const st = docState(i);
          return (
            <div className={'gen-exp-card ' + st} key={i}>
              <div className="gen-exp-card-top">
                <Icon name="file-text" size={15} />
                {st === 'read' && <Icon name="circle-check" size={15} className="gen-exp-ok" />}
              </div>
              <b>{d}</b>
              <span className="gen-exp-meta">{CMP.meta[i]}</span>
              <div className="gen-exp-lines">
                <Skel w="100%" h={6} /><Skel w="80%" h={6} /><Skel w="90%" h={6} />
              </div>
              {st === 'scan' && <div className="gen-scan-line"></div>}
            </div>
          );
        })}
      </div>

      <div className={'gen-exp-result' + (done ? ' show' : '')}>
        <Icon name="layers" size={15} />
        <span>{done ? 'Your draft aligns with the ITT on 4 of 5 clauses' : 'Merging into one comparison…'}</span>
        {done && <AlignPill kind="partial" />}
      </div>
    </div>
  );
}

Object.assign(window, { GenHero, VarStepped, VarProgress, VarCalm, VarExpressive });
