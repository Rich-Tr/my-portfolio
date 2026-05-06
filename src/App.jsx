import { useState } from "react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "bridge", label: "Legacy → Modern" },
  { id: "projects", label: "Projects" },
];

const COLORS = {
  navy: "#0c1f3d",
  navy2: "#162d52",
  teal: "#0f6e56",
  tealLight: "#E1F5EE",
  tealMid: "#1D9E75",
  gold: "#b8892a",
  goldLight: "#FAEEDA",
  goldMid: "#EF9F27",
  slate: "#475569",
  border: "#e8e4dc",
  bg: "#f8f6f1",
  white: "#ffffff",
  textPrimary: "#0c1f3d",
  textSecondary: "#64748b",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #f8f6f1; color: #0c1f3d; }
  .nav-link { padding: 8px 18px; border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 500; border: none; transition: all 0.2s; background: transparent; color: #475569; }
  .nav-link:hover { background: #f1ede4; color: #0c1f3d; }
  .nav-link.active { background: #0c1f3d; color: #fff; }
  .pill { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 999px; font-family: 'DM Mono', monospace; margin: 3px; }
  .pill-default { background: #eeeae2; color: #3d3620; }
  .pill-teal { background: #E1F5EE; color: #085041; border: 1px solid #9FE1CB; }
  .pill-gold { background: #FAEEDA; color: #633806; border: 1px solid #FAC775; }
  .pill-navy { background: #e8edf5; color: #0c1f3d; border: 1px solid #b5c4dc; }
  .card { background: #fff; border: 1px solid #e8e4dc; border-radius: 14px; padding: 28px 32px; margin-bottom: 20px; }
  .card:hover { border-color: #c8c0b0; }
  .role-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 10px; flex-wrap: wrap; }
  .role-title { font-size: 17px; font-weight: 500; color: #0c1f3d; }
  .role-org { font-size: 13px; font-weight: 500; color: #b8892a; font-family: 'DM Mono', monospace; }
  .role-date { font-size: 12px; color: #94a3b8; font-family: 'DM Mono', monospace; white-space: nowrap; }
  .bullet-list { list-style: none; padding: 0; margin: 12px 0 0; }
  .bullet-list li { font-size: 14px; color: #475569; line-height: 1.6; padding: 5px 0 5px 20px; position: relative; border-bottom: 1px solid #f3f0ea; }
  .bullet-list li:last-child { border-bottom: none; }
  .bullet-list li::before { content: ''; position: absolute; left: 0; top: 13px; width: 6px; height: 6px; border-radius: 50%; background: #1D9E75; }
  .bridge-row { display: grid; grid-template-columns: 1fr 32px 1fr; align-items: stretch; margin-bottom: 10px; }
  .bridge-from { background: #fff; border: 1px solid #e8e4dc; border-right: none; border-radius: 10px 0 0 10px; padding: 12px 16px; }
  .bridge-to { background: #E1F5EE; border: 1px solid #9FE1CB; border-left: none; border-radius: 0 10px 10px 0; padding: 12px 16px; }
  .bridge-sep { background: #f3f0ea; border-top: 1px solid #e8e4dc; border-bottom: 1px solid #e8e4dc; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #1D9E75; font-weight: 500; }
  .bridge-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px; font-family: 'DM Mono', monospace; }
  .bridge-from .bridge-label { color: #94a3b8; }
  .bridge-to .bridge-label { color: #0f6e56; }
  .bridge-value { font-size: 13px; font-weight: 500; color: #0c1f3d; }
  .bridge-to .bridge-value { color: #085041; }
  .stat-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 12px; padding: 20px 24px; text-align: center; }
  .stat-num { font-family: 'Fraunces', serif; font-size: 2.4rem; font-weight: 300; color: #0c1f3d; line-height: 1; }
  .stat-label { font-size: 12px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
  .skill-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .skill-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 14px; padding: 22px 24px; }
  .skill-card-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 16px; }
  .skill-card h3 { font-size: 15px; font-weight: 500; color: #0c1f3d; margin-bottom: 8px; }
  .skill-card p { font-size: 13px; color: #64748b; line-height: 1.55; margin-bottom: 12px; }
  .section-header { margin-bottom: 32px; }
  .section-header h2 { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 300; color: #0c1f3d; margin-bottom: 8px; }
  .section-header p { font-size: 15px; color: #64748b; max-width: 680px; line-height: 1.6; }
  .cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 12px; margin-top: 16px; }
  .cert-item { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px; padding: 14px 16px; }
  .cert-item .cert-name { font-size: 13px; font-weight: 500; color: #0c1f3d; margin-bottom: 2px; }
  .cert-item .cert-sub { font-size: 11px; color: #94a3b8; font-family: 'DM Mono', monospace; }
  .cert-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 8px; vertical-align: middle; }
  .highlight-box { background: #0c1f3d; border-radius: 16px; padding: 32px 36px; margin-bottom: 32px; color: #f8f6f1; }
  .highlight-box h3 { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 300; color: #EF9F27; margin-bottom: 12px; }
  .highlight-box p { font-size: 14px; line-height: 1.7; color: rgba(248,246,241,0.75); }
  .tag-group { display: flex; flex-wrap: wrap; gap: 0; margin-bottom: 24px; }
  .domain-tag { font-size: 12px; font-weight: 500; padding: 5px 13px; border-radius: 999px; margin: 4px; cursor: default; background: #eeeae2; color: #3d3620; }
`;

function Header({ page, setPage }) {
  return (
    <header style={{ position: "sticky", top: 0, background: "rgba(248,246,241,0.97)", borderBottom: "1px solid #e8e4dc", zIndex: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 300, color: COLORS.navy, letterSpacing: "-0.01em" }}>
          Richard Trew
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94a3b8", marginLeft: 10, fontWeight: 400 }}>MSc IT</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {NAV.map(n => (
            <button key={n.id} className={`nav-link${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>{n.label}</button>
          ))}
        </nav>
        <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>Cornwall · UK</div>
      </div>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px 120px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 60, alignItems: "start" }}>
        <div>
          <div style={{ display: "inline-block", background: "#E1F5EE", color: "#085041", fontSize: 12, fontWeight: 500, padding: "4px 14px", borderRadius: 999, marginBottom: 24, border: "1px solid #9FE1CB", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
            Available for contract &amp; consultancy
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "3.2rem", fontWeight: 300, lineHeight: 1.1, marginBottom: 24, color: COLORS.navy }}>
            Senior Fintech Data<br/>
            <em style={{ color: "#b8892a", fontStyle: "italic" }}>Engineer &amp; Consultant</em>
          </h1>
          <p style={{ fontSize: 18, color: COLORS.slate, maxWidth: 600, lineHeight: 1.6, marginBottom: 20 }}>
            30+ years delivering investment data solutions across tier-1 banks, asset managers and reinsurers. Deep expertise in EDM platforms, OMS systems and securities data — now applying that foundation to cloud-native and AI-enabled architectures.
          </p>
          <p style={{ fontSize: 15, color: "#64748b", maxWidth: 580, lineHeight: 1.65, marginBottom: 36 }}>
            The rare combination of financial domain depth (securities, derivatives, FX, regulatory reporting) and hands-on engineering means I hit the ground running and forsee issues early in environments where inexperienced cloud engineers may struggle.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setPage("skills")} style={{ padding: "12px 28px", background: COLORS.navy, color: "#fff", border: "none", borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              View skills ↗
            </button>
            <button onClick={() => setPage("bridge")} style={{ padding: "12px 28px", background: "transparent", color: COLORS.navy, border: `1.5px solid ${COLORS.navy}`, borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              Legacy → Modern
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["30+", "Years in fintech"], ["15+", "Major clients"], ["3", "Cloud platforms"], ["2", "Distinctions (MSc, PGDip)"]].map(([n, l]) => (
              <div key={l} className="stat-card">
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e8e4dc", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Core platforms</div>
            {[
              ["Gresham / Markit EDM", "V10 → V22R3, 10+ years"],
              ["Charles River IMS", "V9 → V22, certified admin"],
              ["Finbourne LUSID", "Certified, POC lead"],
              ["Azure · AWS · GCP", "Active cloud migration work"],
            ].map(([name, detail]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "7px 0", borderBottom: "1px solid #f3f0ea" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.navy }}>{name}</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{detail}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#0c1f3d", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: "rgba(248,246,241,0.4)", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Actively learning</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
              {["Python / Pandas", "Databricks", "NVIDIA AI", "dbt", "Kafka", "Streamlit"].map(t => (
                <span key={t} style={{ fontSize: 11, background: "rgba(29,158,117,0.2)", color: "#9FE1CB", border: "1px solid rgba(29,158,117,0.3)", borderRadius: 999, padding: "3px 10px", margin: "3px", fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 60, borderTop: "1px solid #e8e4dc", paddingTop: 40 }}>
        <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Financial domains covered</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
          {["Securities reference data", "Trade & order processing", "Portfolio management", "FX & derivatives", "ETF / unit-linked pricing", "Collateral management", "Middle & back office", "MiFID II", "PRIIPS / KID", "Solvency II", "IFRS 9", "ESG data", "Bloomberg / LSEG feeds", "Data mastering & MDM", "Risk analytics"].map(t => (
            <span key={t} className="domain-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const roles = [
    {
      title: "Development Consultant",
      org: "UBS · London",
      date: "Mar 2025 – Aug 2025",
      project: "HOLT Lens — Azure Cloud Migration",
      summary: "High-profile Credit Suisse→UBS migration under US Federal deadline pressure. HOLT is a globally-used financial analytics platform with 500 institutional clients.",
      bullets: [
        "Reverse-engineered undocumented LSEG multi-file feed (Instrument / ISIN / CUSIP / SEDOL / Quote) with minimal spec and built full ETL pipeline from scratch to replace a decommissioned CS team process",
        "Created security master pre-master records and matcher logic to associate LSEG attributes (inc. RIC codes) to internal CadisIDs — delivered ahead of schedule with minimal defects",
        "Resolved performance and GUI issues related to the on-prem → Gresham EDM on Azure transition",
        "Operated in a zero-margin-for-error environment dictated by US Federal government deadlines",
      ],
      skills: ["Gresham Opus EDM", "LSEG feeds", "SQL Server", "Azure", "ETL design", "Security master"],
    },
    {
      title: "Senior Consultant",
      org: "Reformis (Deloitte) · London",
      date: "Apr 2021 – Oct 2024",
      project: "Multi-client: Finbourne POC · Charles River SaaS · Janus Henderson OMS",
      summary: "Broad delivery across fintech platforms — from proof-of-concept on next-gen tooling through to production OMS cloud transformation programmes.",
      bullets: [
        "Led Finbourne EDM POC: Python, Jupyter, Finbourne Luminesce and workflow scheduling to validate security / portfolio / transaction data loads into LUSID — head-to-head comparison vs Markit EDM",
        "Janus Henderson: processed ~200 new Bloomberg batch attributes into MEDM master and built full trade (orders / allocations / fills) mastering into CRD SaaS — part of on-prem → SaaS consolidation programme",
        "Charles River IMS V22R3: Java FIXML and standard message adapter plugins to intercept and modify FIX messages; C# REST API customisations for model generation and ad-hoc security addition",
        "Involved in estimates and proposals for new consultancy business at JP Morgan, BNY Mellon and Finbourne",
      ],
      skills: ["Finbourne LUSID", "Luminesce", "Python", "Jupyter", "Charles River V22", "Java", "FIXML", "Bloomberg feeds", "Markit EDM V19"],
    },
    {
      title: "Development Consultant",
      org: "SCOR Group · Paris",
      date: "Sep 2019 – Jul 2020",
      project: "Markit EDM V18 — Risk / ESG / IFRS 9 extract suite",
      summary: "SCOR Global Investments (4th largest reinsurer globally). Built data warehouse extract suite feeding Tableau dashboards and CSV outputs for the investment division.",
      bullets: [
        "Designed and built Risk, ESG and IFRS 9 extract pipelines from a SimCorp Dimension-fed warehouse into a Report Mart solution for business user consumption",
        "Enhanced mastered data with new attributes before building the aggregation and extract logic — clean separation of mastering from reporting concerns",
        "Enabled automated Tableau dashboards and structured CSV files for investment decision-making without requiring IT intermediation",
      ],
      skills: ["Markit EDM V18", "SQL Server", "IFRS 9", "ESG data", "Tableau", "Report Mart", "SimCorp Dimension"],
    },
    {
      title: "Development Consultant",
      org: "HSBC HSS · Canary Wharf",
      date: "Jun 2018 – Sep 2019",
      project: "Markit EDM V10 — Funds Data Provision (M&G/Prudential onboarding)",
      summary: "FDP platform provides fund administration and reference data for 3,500+ global clients. Worked within the publishing POD in 3-week agile sprints.",
      bullets: [
        "Built XML publishing pipeline to Riskmetrics (VaR) covering exchange-traded, cash, generic bonds, inflation swaps and interest rate swap positions for M&G/Prudential",
        "Created annuity cash flow calculation files and Solvency II instrument/closed derivative position/issuer counterparty files",
        "Built GUI workflows, pages and data generators for publishing UI and associated reference data screens from scratch",
      ],
      skills: ["Markit EDM V10", "XML publishing", "Solvency II", "Riskmetrics VaR", "Agile sprints", "GUI workflows"],
    },
    {
      title: "Development Consultant",
      org: "Hermes Investment Management · London",
      date: "Oct 2017 – Apr 2018",
      project: "MiFID II · OTC CDS SEF clearing · Markit EDM upgrade (10.5→17.1)",
      summary: "Busy, high-pressure delivery role covering regulatory uplift, new instrument flow build and platform upgrade simultaneously.",
      bullets: [
        "Built MiFID II attribute capture from ThinkFolio OMS through MEDM to Northern Trust for middle/back office — including new GUI elements for re-submission of MiFID reports",
        "Created end-to-end OTC Credit Default Swap SEF clearing workflow: XML in from tFolio → mastering → XML extract to NT with SEF-specific confirmation/settlement attributes → position feedback loop",
        "Engineered weekly CDS compression logic generating new aggregated assets from NT constituent positions — a complex derivatives processing challenge",
        "Managed the 10.5→17.1 platform upgrade alongside all the above delivery",
      ],
      skills: ["Markit EDM V17", "MiFID II", "OTC CDS", "FIX/XML", "ThinkFolio", "Northern Trust interfaces", "SQL Server"],
    },
    {
      title: "Senior Development Specialist",
      org: "HSBC HSS · Canary Wharf",
      date: "Sep 2009 – Feb 2016",
      project: "FXHome (Charles River IMS) · ULAP (PControl) · Markit EDM BAU",
      summary: "Core member of the securities services technology team across three strategic platforms serving ~3,500 global clients.",
      bullets: [
        "FXHome: strategic multi-client FX trading system on Charles River IMS, covering security order FX and subscription/redemption cash FX — full SDLC including C# customisations, blotters, queries, reports and workflow monitors",
        "2015: extended FXHome to execute FX on matched/confirmed MT541/543 equity and bond trades for new prospective clients",
        "ULAP: customised Milestones PControl for multi-client unit-linked pension/life processing — liabilities, pricing, reconciliation, fees and rebates",
        "Markit EDM 3rd-line BAU: daily processing of thousands of trades from inception through validation, enrichment, mastering to downstream settlement via Tradeflow, Calypso and accounting",
      ],
      skills: ["Charles River IMS V9", "C#", "Oracle", "Markit CADIS", "PowerBuilder", "Control-M", "FX trading", "Unit pricing"],
    },
    {
      title: "Contractor / Lead Developer",
      org: "Deutsche MG · Aberdeen AM · Morgan Stanley · ING Barings · RBS · Louis Dreyfus",
      date: "1994 – 2008",
      project: "Asset management, FX trading, deal management, fund accounting",
      summary: "14 years across tier-1 institutions. Consistently extended and trusted on complex deliverables — typically leading development or owning entire modules.",
      bullets: [
        "Aberdeen AM: Charles River migration from DEAM trading platform (Phase 1); BNP block trade matching integration (Phase 2); full fund migration (Phase 3) — delivered across 2+ years",
        "Gartmore/Maddox Ford: designed and led development of a high-profile FX trading system (110-user base) tracking FX deals from initiation to completion",
        "Deutsche MG: Deal Management System for Fixed Income, UK Equity and International Equity dealing desks",
        "RBS Trust Bank: reporting suite for unit trust accounting/settlements across high-profile clients",
      ],
      skills: ["PowerBuilder", "Oracle", "Sybase", "Charles River", "SQL Server", "FX systems", "Fund accounting"],
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>
      <div className="section-header">
        <h2>Professional experience</h2>
        <p>30+ years of high-impact delivery across tier-1 investment banks, global asset managers and specialist fintech firms. Each role involved rapid context acquisition in complex financial environments — the core transferable skill.</p>
      </div>
      {roles.map(r => (
        <div key={r.title + r.org} className="card">
          <div className="role-header">
            <div>
              <div className="role-title">{r.title}</div>
              <div className="role-org">{r.org}</div>
            </div>
            <div className="role-date">{r.date}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#b8892a", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{r.project}</div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.55, marginBottom: 0 }}>{r.summary}</p>
          <ul className="bullet-list">
            {r.bullets.map(b => <li key={b}>{b}</li>)}
          </ul>
          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 0 }}>
            {r.skills.map(s => <span key={s} className="pill pill-default">{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  const clusters = [
    {
      icon: "⬡",
      iconBg: "#E1F5EE",
      title: "Investment data engineering",
      desc: "The core specialism. Designed and built production data pipelines processing hundreds of thousands of trades, securities and positions daily across the most complex financial instrument types.",
      legacy: ["Markit / Gresham EDM", "CADIS mastering workflows", "Sybase / Oracle stored procs", "Control-M scheduling"],
      modern: ["Python / Pandas / NumPy", "Databricks / Spark", "dbt transformations", "Apache Airflow", "Azure Data Factory"],
      transferNote: "ETL design patterns, data quality rules and mastering logic are platform-agnostic. The financial domain knowledge that makes pipelines correct takes years to acquire — it cannot be Googled.",
    },
    {
      icon: "⬡",
      iconBg: "#FAEEDA",
      title: "Securities & reference data",
      desc: "End-to-end security master management across equities, fixed income, FX, OTC derivatives and structured products. Bloomberg and LSEG feed ingestion, ISIN/CUSIP/SEDOL/RIC mapping, instrument lifecycle.",
      legacy: ["Bloomberg batch feeds", "LSEG / Refinitiv feeds", "Charles River IMS security master", "Markit EDM MDM"],
      modern: ["OpenFIGI / PermID APIs", "Finbourne LUSID security master", "Cloud-native MDM", "Data mesh patterns"],
      transferNote: "Understanding what makes a security record 'correct' across 20 instrument types is the hard part. The tooling to load and store it changes; the domain logic doesn't.",
    },
    {
      icon: "⬡",
      iconBg: "#e8edf5",
      title: "Cloud & platform migration",
      desc: "Repeated track record migrating complex financial systems from on-prem to cloud. UBS HOLT (Azure), Janus Henderson (CRD SaaS), BT Pension Scheme (Northern Trust). Understands the data, business logic and integration challenges that cause migrations to fail.",
      legacy: ["On-prem SQL Server / Sybase", "PVCS / Clearcase versioning", "Dedicated server scheduling"],
      modern: ["Azure (active)", "AWS · GCP (familiar)", "GIT / Azure DevOps", "Containerised workloads", "Managed cloud OMS"],
      transferNote: "Having migrated legacy platforms multiple times, I can identify which business logic is genuinely needed vs accumulated accidental complexity — saving weeks of analysis.",
    },
    {
      icon: "⬡",
      iconBg: "#FAECE7",
      title: "Regulatory & compliance data",
      desc: "First-hand delivery of MiFID II, PRIIPS, Solvency II and IFRS 9 data requirements in production environments. Understands what regulators actually need — not just the headline requirement but the data lineage and auditability behind it.",
      legacy: ["MiFID II (Hermes, Aberdeen)", "PRIIPS / KID (Aberdeen 500+ funds)", "Solvency II (HSBC GSS)", "IFRS 9 (SCOR)"],
      modern: ["Data lineage tools (OpenLineage)", "Regulatory data vaults", "GDPR-compliant pipelines", "Audit trail patterns"],
      transferNote: "Regulatory data projects fail when engineers don't understand the business context. Having personally built MiFID II and Solvency II solutions end-to-end is a clear differentiator.",
    },
    {
      icon: "⬡",
      iconBg: "#E1F5EE",
      title: "Python & modern data tooling",
      desc: "Active upskilling beyond the financial platform specialism. Anaconda IDE, Pandas, NumPy, SciPy, Matplotlib in use. Finbourne LUSID and Luminesce certified. Databricks Fundamentals and NVIDIA AI curriculum completed.",
      legacy: ["C# / .NET / ASP.NET MVC", "Java (Eclipse, CRIMS plugins)", "PowerBuilder (12+ years)", "SQL / PL-SQL / T-SQL"],
      modern: ["Python (Pandas, NumPy, SciPy)", "Finbourne Luminesce / LUSID", "Databricks", "Streamlit dashboards", "NVIDIA AI tooling"],
      transferNote: "Strong programming foundations across multiple paradigms mean picking up new frameworks is rapid. Current personal projects build automated trading systems in Python — see Projects.",
    },
    {
      icon: "⬡",
      iconBg: "#FAEEDA",
      title: "Business analysis & architecture",
      desc: "Cranfield MSc included Systems Analysis, Expert Systems, DSS and GIS. Practical experience with UML, SSADM, Jira, and gap analysis across complex multi-system financial environments. Can bridge business and engineering effectively.",
      legacy: ["SSADM · UML · HOW methodology", "Riverton / PowerDesigner", "Requirements gathering", "Solution design docs"],
      modern: ["Domain-driven design", "Agile / SAFe", "Event storming", "C4 architecture diagrams"],
      transferNote: "At Aberdeen AM, the entire cost-and-charges data challenge (500+ funds, 5 third-party accountants, no single landing point) was solved through structured gap analysis — the methodology scales to any domain.",
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>
      <div className="section-header">
        <h2>Transferable skills</h2>
        <p>Each cluster shows the established tools I've used in production, the modern equivalents they map to, and — critically — why the underlying expertise transfers regardless of tooling generation.</p>
      </div>

      <div className="highlight-box">
        <h3>The core transferable advantage</h3>
        <p>Junior data engineers can learn Spark or dbt from documentation in weeks. What they cannot acquire quickly is knowing <em>why</em> a Bloomberg FIGI lookup sometimes returns stale data on corporate actions, or why a Solvency II SCR calculation needs instrument-level granularity and not just portfolio aggregates, or why a MiFID II trade report needs a specific LEI hierarchy. That knowledge — accumulated across 30 years — is what makes complex financial data projects deliver on time with correct results.</p>
      </div>

      {clusters.map(c => (
        <div key={c.title} className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
            <div className="skill-card-icon" style={{ background: c.iconBg, fontSize: 20, color: "#0c1f3d" }}>◈</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.navy, marginBottom: 4 }}>{c.title}</div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.55 }}>{c.desc}</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "14px 0" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Established expertise</div>
              <div>{c.legacy.map(t => <span key={t} className="pill pill-default">{t}</span>)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, color: "#0f6e56", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Modern equivalents</div>
              <div>{c.modern.map(t => <span key={t} className="pill pill-teal">{t}</span>)}</div>
            </div>
          </div>
          <div style={{ background: "#f8f6f1", borderRadius: 8, padding: "10px 14px", borderLeft: "3px solid #1D9E75", borderRadius: "0 8px 8px 0" }}>
            <span style={{ fontSize: 12, color: "#0f6e56", fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>Why it transfers: </span>
            <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{c.transferNote}</span>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>All technical tools</div>
        <div style={{ background: "#fff", border: "1px solid #e8e4dc", borderRadius: 14, padding: 24 }}>
          {[
            ["Languages", "Python, C#, Java, PowerBuilder, PHP, VB.NET, SQL, PL/SQL, T-SQL, XSLT, HTML/CSS"],
            ["Data platforms", "Markit/Gresham EDM (V10→V22), Finbourne LUSID/Luminesce, Charles River IMS (V9→V22), SimCorp Dimension, ThinkFolio"],
            ["Databases", "SQL Server, Sybase, Oracle, PostgreSQL, MySQL, SQLAnywhere, MS Access, RavenDB"],
            ["Cloud & infra", "Azure (active), AWS, GCP, Azure DevOps, Docker basics"],
            ["Python libs", "Pandas, NumPy, SciPy, Matplotlib, Anaconda, Jupyter"],
            ["Messaging & integration", "IBM WebSphere MQ, FIX/FIXML, REST APIs, XML/XSLT, JSON"],
            ["Scheduling", "Control-M, SQL Server Agents"],
            ["Version control", "Git, Subversion, Perforce, Rational ClearCase, PVCS, MS TFVC"],
            ["Analysis", "Jira, UML, SSADM, PowerDesigner, Riverton HOW"],
            ["Market data", "Bloomberg batch feeds, LSEG/Refinitiv feeds, FXAll, Tradeflow"],
          ].map(([cat, items]) => (
            <div key={cat} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, padding: "10px 0", borderBottom: "1px solid #f3f0ea" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8", fontFamily: "'DM Mono', monospace", paddingTop: 3 }}>{cat}</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{items}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bridge() {
  const rows = [
    { from: "Markit / Gresham Opus EDM", to: "Finbourne LUSID · dbt · Databricks", note: "Investment data mastering & MDM" },
    { from: "Charles River IMS (OMS)", to: "Charles River SaaS · Aladdin · SimCorp One", note: "Order & portfolio management" },
    { from: "Control-M · SQL Server Agents", to: "Apache Airflow · Azure Data Factory · Prefect", note: "Workflow orchestration" },
    { from: "IBM WebSphere MQ", to: "Apache Kafka · Azure Service Bus · Pub/Sub", note: "Event streaming & messaging" },
    { from: "Bloomberg / LSEG batch files", to: "Real-time API feeds · OpenFIGI · PermID", note: "Market & reference data ingestion" },
    { from: "Sybase / Oracle T-SQL + PL/SQL", to: "Spark SQL · Snowflake · PostgreSQL · dbt", note: "Analytical data transformation" },
    { from: "FIX / FIXML message adapters (Java)", to: "REST / GraphQL APIs · event-driven microservices", note: "System integration patterns" },
    { from: "PowerBuilder / C# WinForms", to: "React · TypeScript · Streamlit · Python dashboards", note: "Front-end & analytics UIs" },
    { from: "SSADM · UML · HOW methodology", to: "Domain-driven design · event storming · Agile SAFe", note: "Systems analysis & design" },
    { from: "Bespoke Tableau extract pipelines", to: "Power BI · Tableau · Looker · Streamlit", note: "BI & analytics delivery" },
    { from: "On-prem SQL Server estates", to: "Azure SQL · Synapse Analytics · Databricks Lakehouse", note: "Cloud data platform migration" },
    { from: "Rational ClearCase · PVCS · Perforce", to: "Git · Azure DevOps · GitHub Actions CI/CD", note: "Version control & DevOps" },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>
      <div className="section-header">
        <h2>Legacy → modern</h2>
        <p>Every established technology in my background maps cleanly to a modern cloud-native counterpart. The engineering patterns, data modelling intuition and financial domain knowledge transfer completely — only the tooling changes.</p>
      </div>

      <div className="highlight-box" style={{ marginBottom: 32 }}>
        <h3>Why this matters for hiring managers</h3>
        <p>Firms migrating from Markit EDM or Charles River IMS to cloud-native stacks face a specific problem: their new cloud engineers don't understand the data. They don't know why the security master has 47 override levels, or why the OTC position feed arrives in three different formats depending on which counterparty confirmed. I do — and I can translate that knowledge into clean modern architecture. This is the profile of someone who accelerates migrations rather than causing them to stall.</p>
      </div>

      <div style={{ marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 32px 1fr", gap: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 16px 10px" }}>Established tool / platform</div>
        <div></div>
        <div style={{ fontSize: 10, fontWeight: 500, color: "#0f6e56", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 16px 10px" }}>Modern equivalent</div>
      </div>

      {rows.map(r => (
        <div key={r.from} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: "'DM Mono', monospace", marginBottom: 3, paddingLeft: 4 }}>{r.note}</div>
          <div className="bridge-row">
            <div className="bridge-from"><div className="bridge-value">{r.from}</div></div>
            <div className="bridge-sep">→</div>
            <div className="bridge-to"><div className="bridge-value">{r.to}</div></div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 36, background: "#fff", border: "1px solid #e8e4dc", borderRadius: 14, padding: "24px 28px" }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: COLORS.navy, marginBottom: 14 }}>Demonstrated migration experience</div>
        {[
          ["UBS (2025)", "Credit Suisse on-prem HOLT Lens → UBS Azure cloud estate — Gresham EDM, LSEG feeds, tight Federal deadline"],
          ["Janus Henderson (2021–24)", "Charles River IMS on-prem → Charles River SaaS — securities, analytics, prices, benchmarks, orders, risk data"],
          ["HSBC GSS (2018–19)", "Multi-client on-prem Markit EDM → extended cloud publishing for Riskmetrics and Solvency II"],
          ["Aberdeen AM (2005–07)", "DEAM legacy trading platforms → Charles River IMS — 3-phase programme including fund migration"],
          ["Hermes (2017–18)", "Markit EDM V10.5 → V17.1 upgrade alongside live MiFID II and OTC CDS regulatory delivery"],
        ].map(([client, detail]) => (
          <div key={client} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, padding: "10px 0", borderBottom: "1px solid #f3f0ea" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#b8892a", fontFamily: "'DM Mono', monospace" }}>{client}</div>
            <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>
      <div className="section-header">
        <h2>Current projects</h2>
        <p>Personal development projects applying the same engineering rigour used in financial platforms — real-time data pipelines, automated decision systems and analytics dashboards — now using modern Python tooling.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: 20, marginBottom: 36 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.navy, marginBottom: 4 }}>Polymarket trading bot</div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>Live · Python · Real-time</div>
            </div>
            <span style={{ background: "#E1F5EE", color: "#085041", border: "1px solid #9FE1CB", fontSize: 11, padding: "3px 10px", borderRadius: 999, fontFamily: "'DM Mono', monospace" }}>Live system</span>
          </div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>
            Automated prediction market trading system with full market-making, opportunity scoring, position management and backtesting. The architecture mirrors the same patterns used in production financial trading systems — real-time feed ingestion, signal generation, risk-controlled execution.
          </p>
          <ul className="bullet-list">
            <li>Market making and bond opportunity detection with configurable quality scoring</li>
            <li>Backtesting engine against historical order book data</li>
            <li>Streamlit dashboard for live monitoring and analytics</li>
            <li>SQLite persistence for position tracking and PnL reporting</li>
          </ul>
          <div style={{ marginTop: 14 }}>
            {["Python", "Polymarket CLOB API", "Pandas", "SQLite", "Streamlit", "Real-time feeds"].map(t => <span key={t} className="pill pill-teal">{t}</span>)}
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.navy, marginBottom: 4 }}>Crypto trading bot framework</div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>In development · Python · Multi-exchange</div>
            </div>
            <span style={{ background: "#FAEEDA", color: "#633806", border: "1px solid #FAC775", fontSize: 11, padding: "3px 10px", borderRadius: 999, fontFamily: "'DM Mono', monospace" }}>In development</span>
          </div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>
            Modular automated trading infrastructure drawing on 30 years of financial systems experience. The same separation of concerns used in EDM pipelines (ingest → validate → transform → execute) applied to crypto market microstructure.
          </p>
          <ul className="bullet-list">
            <li>Pluggable strategy framework — swap signal generators without touching infrastructure</li>
            <li>Risk management layer with position limits, drawdown controls and circuit breakers</li>
            <li>Multi-exchange support via normalised API abstraction layer</li>
            <li>Full backtesting engine with realistic slippage and fee modelling</li>
          </ul>
          <div style={{ marginTop: 14 }}>
            {["Python", "Pandas / NumPy", "REST APIs", "Backtesting engine", "Risk management"].map(t => <span key={t} className="pill pill-gold">{t}</span>)}
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e8e4dc", borderRadius: 14, padding: "24px 28px" }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: COLORS.navy, marginBottom: 6 }}>The relevance to data engineering and consultancy roles</div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>
          These aren't hobby projects — they're practical demonstrations that the engineering skills are current and active. Building a live trading system requires exactly the skills most valued in senior data engineering roles: real-time pipeline design, data quality assurance, state management, observability, and risk-aware execution logic. The tools (Python, Streamlit, APIs) are the same ones now expected in modern fintech data stacks.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const pages = { home: Home, experience: Experience, skills: Skills, bridge: Bridge, projects: Projects };
  const PageComponent = pages[page] || Home;

  return (
    <>
      <style>{css}</style>
      <Header page={page} setPage={setPage} />
      <PageComponent setPage={setPage} />
    </>
  );
}
