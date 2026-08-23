// Interações da página. Mantido pequeno e sem dependências —
// se um dia migrar para um framework, essa lógica vira componentes.

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupMobileNav();
  setupScrollReveal();
  setupThemeToggle();
  setupLogoScrollTop();
  setYear();
});

const THEME_KEY = "theme";

function setupThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Preferência salva manualmente tem prioridade; sem ela, segue o sistema
  // (a troca de tema do SO já é respeitada via CSS prefers-color-scheme).
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }

  toggle.addEventListener("click", () => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = document.documentElement.getAttribute("data-theme") || (systemPrefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  });
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = PROJECTS.map((project) => {
    const badgeClass = project.status === "pass" ? "badge--pass" : "badge--pending";
    const badgeLabel = project.status === "pass" ? "PASS" : "PENDING";

    const tags = (project.stack || [])
      .map((item) => `<span class="tag">${item}</span>`)
      .join("");

    const tag = project.link ? "a" : "article";
    const linkAttrs = project.link ? `href="${project.link}" target="_blank" rel="noopener"` : "";

    return `
      <${tag} class="project-card" ${linkAttrs}>
        <div class="project-card-head">
          <h3>${project.name}</h3>
          <span class="badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <p>${project.description}</p>
        <div class="tag-list">${tags}</div>
      </${tag}>
    `;
  }).join("");
}

function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-nav");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

function setupLogoScrollTop() {
  // O alvo "#top" fica logo abaixo do header sticky, então a âncora nativa
  // não sobe até o topo real da página — força o scroll manualmente.
  const logo = document.querySelector(".logo");
  if (!logo) return;

  logo.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#top");
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
