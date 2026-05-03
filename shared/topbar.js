// ── DCC — Topbar template ────────────────────────────────────────
export function renderTopbar(activePage) {
  const pages = [
    { id: 'projects', label: 'Projects', href: '/projects/' },
    { id: 'samples',  label: 'Samples',  href: '/samples/' },
    { id: 'models',   label: 'Models',   href: '/models/' },
    { id: 'publish',  label: 'Publish',  href: '/publish/' },
  ];
  return `
    <div id="topbar">
      <a href="/projects/" class="topbar-brand">DCC <span>Pro</span></a>
      <nav class="nav">
        ${pages.map(p => `
          <a href="${p.href}" class="nav-item${activePage===p.id?' active':''}">${p.label}</a>
        `).join('')}
      </nav>
      <div class="topbar-right">
        <div class="topbar-user">
          <div class="topbar-avatar" id="t-av">—</div>
          <div>
            <div class="topbar-uname" id="t-name">—</div>
            <div class="topbar-role"  id="t-role">—</div>
          </div>
        </div>
        <button class="btn-topbar" id="btn-logout">Déconnexion</button>
      </div>
    </div>
    <div id="toast"></div>
  `;
}
