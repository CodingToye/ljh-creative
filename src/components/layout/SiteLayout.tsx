import { FaLinkedin } from "react-icons/fa";
import { FaSquareDribbble } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router";
import { Link } from "react-router";

import { ButtonLink } from "../ui/Button";

const navigation = [
  { label: "Work", to: "/work" },
  { label: "Thinking", to: "/thinking" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Design System", to: "/design-system" },
];

function getNavLinkClasses(isActive: boolean) {
  return [
    "transition-colors hover:text-slate-950",
    isActive ? "text-neutral-500" : "text-neutral-400",
  ].join(" ");
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-tertiary-400 bg-primary-200 mb-[72px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-6 h-[50px]">
          <div aria-hidden="true" />

          <NavLink
            to="/"
            end
            className="justify-self-center text-[24px] uppercase tracking-tight text-tertiary-500"
          >
            Lisa J. Hughes
          </NavLink>

          <nav aria-label="Main navigation" className="justify-self-end">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${getNavLinkClasses(isActive)} text-[12px] transition`
                    }
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

      <footer className="bg-neutral-500 text-white p-8">
        <div className="site-container flex justify-center">
          <div className="flex flex-row gap-16 justify-around">
            <div className="">
              <h2 className="text-4xl font-serif font-normal">
                Let’s create <em className="text-white">better</em> experiences
                together.
              </h2>
              <p className="text-sm">
                I partner with leaders who value clarity, creativity and systems
                that scale.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <ButtonLink
                to="/"
                variant="tertiary"
                className="w-[292px] h-[36px] rounded-none mr-1"
              >
                Get in touch
              </ButtonLink>
              <Link to="/" className="">
                <FaLinkedin size="42" className="text-tertiary-500" />
              </Link>
              <Link to="/" className="">
                <FaSquareDribbble size="42" className="text-tertiary-500" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
