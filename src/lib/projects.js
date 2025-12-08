// projects.js — Fetch public GitHub repos and render as tiles

const GITHUB_USERNAME = "aakash-01-1996";
const SELECTED_REPOS = [
  "AI-Mock-Interview",
  "StrategicTrio",
  "CineMind",
  "CodeSpark",
  "HarryPotter-Trivia",
  "PokeDex",
  "MLFlow",
]; // List specific repos to display, or leave empty to show all public repos

const CACHE_KEY = "github_projects_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const FALLBACK_PROJECTS = [
  {
    name: "Project 1",
    description: "This is a description of Project 1.",
    githubLink: "https://github.com/aakash-01-1996/project1",
    stars: 50,
    addedDate: "2025-12-01",
  },
  {
    name: "Project 2",
    description: "This is a description of Project 2.",
    githubLink: "https://github.com/aakash-01-1996/project2",
    stars: 30,
    addedDate: "2025-11-15",
  },
  {
    name: "Project 3",
    description: "This is a description of Project 3.",
    githubLink: "https://github.com/aakash-01-1996/project3",
    stars: 70,
    addedDate: "2025-12-05",
  },
];

function buildProjectFromRepo(repo) {
  return {
    name: repo.name,
    description: repo.description || "Work in progress..",
    githubLink: repo.html_url,
    stars: repo.stargazers_count || 0,
    addedDate: repo.created_at || repo.pushed_at || new Date().toISOString(),
  };
}

function renderProjects(sortBy = "stars") {
  const projectsList = document.getElementById("projects-list");
  if (!projectsList) return;

  projectsList.innerHTML = "";

  const allProjects =
    window.projectsData && Array.isArray(window.projectsData)
      ? window.projectsData
      : FALLBACK_PROJECTS;

  const sortedProjects = [...allProjects].sort((a, b) => {
    if (sortBy === "stars") return (b.stars || 0) - (a.stars || 0);
    if (sortBy === "az") return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "recent")
      return new Date(b.addedDate) - new Date(a.addedDate);
    return 0;
  });

  sortedProjects.forEach((project) => {
    const projectTile = document.createElement("div");
    projectTile.className = "project-tile";
    projectTile.innerHTML = `
      <div class="project-header">
        <span class="project-name">${escapeHtml(project.name)}</span>
        <a href="${escapeAttr(
          project.githubLink
        )}" target="_blank" rel="noopener" class="project-link" title="Open on GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <p class="project-description">${escapeHtml(
        project.description || ""
      )}</p>
      <div class="project-footer">
        <span class="project-stars">★ ${project.stars || 0}</span>
        <a href="${escapeAttr(
          project.githubLink
        )}" target="_blank" rel="noopener" class="view-github">&lt; View on GitHub &gt; </a>
      </div>
    `;
    projectsList.appendChild(projectTile);
  });

  const countEl = document.getElementById("repo-count");
  if (countEl) countEl.textContent = sortedProjects.length;

  const viewAll = document.querySelector(".view-all .view-all-btn");
  if (viewAll) viewAll.href = `https://github.com/${GITHUB_USERNAME}`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  if (!str) return "";
  return String(str).replace(/"/g, "&quot;");
}

async function fetchGithubRepos(username) {
  try {
    const url = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?per_page=100`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const raw = await res.json();
    const filtered = Array.isArray(raw) ? raw.filter((r) => !r.fork) : [];
    return filtered.map(buildProjectFromRepo);
  } catch (err) {
    console.warn("Could not fetch GitHub repos:", err);
    return null;
  }
}

// Cache management functions
function getCachedProjects() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache has expired
    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (err) {
    console.warn("Could not read cache:", err);
    return null;
  }
}

function setCachedProjects(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: data,
        timestamp: Date.now(),
      })
    );
  } catch (err) {
    console.warn("Could not cache projects:", err);
  }
}

async function initProjects() {
  const projectsList = document.getElementById("projects-list");
  if (projectsList) {
    projectsList.innerHTML = `<div class="project-loading">Loading projects…</div>`;
  }

  // Check cache first
  let cachedProjects = getCachedProjects();
  let fetched = null;

  if (cachedProjects) {
    console.log("Using cached projects");
    fetched = cachedProjects;
  } else {
    console.log("Fetching fresh projects from GitHub");
    fetched = await fetchGithubRepos(GITHUB_USERNAME);

    // Cache the fetched data if successful
    if (fetched) {
      setCachedProjects(fetched);
    }
  }

  let finalProjects = [];
  if (Array.isArray(fetched) && fetched.length) {
    if (Array.isArray(SELECTED_REPOS) && SELECTED_REPOS.length > 0) {
      const selectedSet = new Set(SELECTED_REPOS);
      finalProjects = fetched.filter((p) => selectedSet.has(p.name));
    } else {
      finalProjects = fetched;
    }
  } else {
    finalProjects = FALLBACK_PROJECTS;
  }

  window.projectsData = finalProjects;
  renderProjects(document.getElementById("sort")?.value || "stars");
}

const sortSelect = document.getElementById("sort");
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => renderProjects(e.target.value));
}

initProjects();
