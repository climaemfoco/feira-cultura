
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem("clima-theme");
  const preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = saved || (preferredDark ? "dark" : "light");

  function updateThemeButtons(){
    document.querySelectorAll(".theme-toggle").forEach(btn=>{
      const dark = root.dataset.theme === "dark";
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", dark ? "Ativar tema claro" : "Ativar tema escuro");
      btn.title = dark ? "Tema claro" : "Tema escuro";
    });
  }
  updateThemeButtons();
  document.querySelectorAll(".theme-toggle").forEach(btn=>{
    btn.addEventListener("click",()=>{
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("clima-theme", root.dataset.theme);
      updateThemeButtons();
    });
  });

  const obs = new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add("show")
  }),{threshold:.1});
  document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
})();
