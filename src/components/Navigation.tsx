import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

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
  }
];

// Custom hook to track scroll position
function useScrolled(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}

export default function Navigation() {
  const [theme, setTheme] = useState(typeof window !== 'undefined' ? localStorage.getItem("theme") : "light");
  const isScrolled = useScrolled(75);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = localStorage.getItem("theme") || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    
    // Apply dark class to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav
      className={clsx(
        "bg-gray-100/25 dark:bg-black/25 py-3 px-6 md:px-10 rounded-md mx-auto backdrop-blur-xs sm:fixed z-20 motion-safe:transition-all",
        isScrolled ? "mt-6 md:mt-5" : "mt-6 md:mt-10",
      )}
      >
      <ul className="flex flex-wrap gap-5 justify-start items-center sm:justify-center">
        {PAGES.map(({ title, href }) => (
          <li key={href} className="relative">
            <a 
              className="peer z-10 p-0.5 border-0 motion-safe:transition-all motion-safe:ease-in-out motion-safe:duration-15 text-black dark:text-light relative decoration-0 no-underline focus:outline-2 focus:outline-red-400 dark:focus:outline-red-300 focus:outline-offset-4 active:bg-gray-100 dark:active:bg-black/25 active:border-b-red-400 dark:active:border-b-red-300 active:font-semibold" 
              href={href}
            >
              {title}
            </a>
            <span className="bottom-0 xs:bottom-2 absolute z-0 block h-[6px] w-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out peer-focus:w-full peer-focus:h-full peer-hover:h-full peer-hover:w-full bg-linear-90 from-red-gradient to-purple-gradient dark:from-dark-blue-gradient dark:to-dark-purple-gradient"></span>
          </li>
        ))}
        <li>
          <button 
            onClick={handleModeSwitch}
            className="cursor-pointer p-1 rounded-md bg-linear-90 hover:from-red-gradient hover:to-purple-gradient dark:hover:from-dark-blue-gradient dark:hover:to-dark-purple-gradient motion-safe:transition-colors dark:text-light"
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