import { NavLink, Outlet } from "react-router";

const navigation = [
  { label: "Work", to: "/work" },
  { label: "Thinking", to: "/thinking" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function getNavLinkClasses(isActive: boolean) {
  return [
    "transition-colors hover:text-slate-950",
    isActive ? "text-slate-950" : "text-slate-500",
  ].join(" ");
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" end className="text-xl font-semibold tracking-tight">
            Lisa’s Portfolio
          </NavLink>

          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => getNavLinkClasses(isActive)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lisa. All rights reserved.</p>

          <p>Creative portfolio</p>
        </div>
      </footer>
    </div>
  );
}
