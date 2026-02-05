import clsx from "clsx";
import { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";

const PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Shorts",
    href: "/shorts",
  },
];

// Custom hook to track scroll position
function useScrolled(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}

interface NavigationProps {
  currentPath?: string;
}

export default function Navigation({ currentPath = "/" }: NavigationProps) {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("large");
  const [pathname, setPathname] = useState(currentPath);
  const isScrolled = useScrolled(75);

  // Sync with client-side path on hydration and on navigation (e.g. View Transitions)
  useEffect(() => {
    setPathname(window.location.pathname);
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme =
      localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);

    // Apply dark class to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage if not already saved
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", initialTheme);
    }
  }, []);

  const handleModeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Update state
    setTheme(newTheme);

    // Update localStorage
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav
      className={clsx(
        "bg-gray-100/25 dark:bg-black/25 py-3 px-6 md:px-10 rounded-md mx-auto backdrop-blur-xs sm:fixed z-20 motion-safe:transition-all",
        isScrolled ? "mt-6 md:mt-5" : "mt-6 md:mt-10",
      )}
    >
      <ul className="flex flex-wrap gap-5 justify-start items-center sm:justify-center list-none p-0 m-0">
        {PAGES?.map(({ title, href }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="relative">
              <a
                className={clsx(
                  "peer z-10 p-0.5 border-0 motion-safe:transition-all motion-safe:ease-in-out motion-safe:duration-15 text-black dark:text-light relative decoration-0 no-underline focus:outline-2 focus:outline-red-400 dark:focus:outline-red-300 focus:outline-offset-6 active:border-b-red-400 dark:active:border-b-red-300 active:font-semibold",
                  isActive && "font-semibold",
                )}
                href={href}
                aria-current={isActive ? "page" : undefined}
              >
                {title}
              </a>
              <span
                className={clsx(
                  "bottom-0 xs:bottom-2 -left-1 absolute z-0 block h-[5px] w-[calc(100%+8px)] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out peer-focus:h-full peer-hover:h-full bg-linear-90 from-red-gradient to-purple-gradient dark:from-dark-blue-gradient dark:to-dark-purple-gradient rounded-md",
                  isActive && "h-full! opacity-50",
                )}
              ></span>
            </li>
          );
        })}
        <li>
          <button
            onClick={handleModeSwitch}
            className="cursor-pointer p-1 rounded-md bg-linear-90 hover:from-red-gradient hover:to-purple-gradient dark:hover:from-dark-blue-gradient dark:hover:to-dark-purple-gradient motion-safe:transition-colors dark:text-light flex"
            aria-label="Toggle dark mode"
            id="theme-selector"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
