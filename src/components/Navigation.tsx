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
				"z-20 mx-auto rounded-md bg-gray-100/25 px-6 py-3 backdrop-blur-xs motion-safe:transition-all sm:fixed md:px-10 dark:bg-black/25",
				isScrolled ? "mt-6 md:mt-5" : "mt-6 md:mt-10",
			)}
		>
			<ul className="m-0 flex list-none flex-wrap items-center justify-start gap-5 p-0 sm:justify-center">
				{PAGES?.map(({ title, href }) => {
					const isActive = pathname === href;
					return (
						<li key={href} className="relative">
							<a
								className={clsx(
									"peer relative z-10 border-0 p-0.5 text-black no-underline decoration-0 focus:outline-2 focus:outline-red-400 focus:outline-offset-6 active:border-b-red-400 active:font-semibold motion-safe:transition-all motion-safe:duration-15 motion-safe:ease-in-out dark:text-light dark:active:border-b-red-300 dark:focus:outline-red-300",
									isActive && "font-semibold",
								)}
								href={href}
								aria-current={isActive ? "page" : undefined}
							>
								{title}
							</a>
							<span
								className={clsx(
									"absolute bottom-0 xs:bottom-2 -left-1 z-0 block h-[5px] w-[calc(100%+8px)] rounded-md bg-linear-90 from-red-gradient to-purple-gradient peer-hover:h-full peer-focus:h-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out dark:from-dark-blue-gradient dark:to-dark-purple-gradient",
									isActive && "h-full! opacity-50",
								)}
							></span>
						</li>
					);
				})}
				<li>
					<button
						type="button"
						onClick={handleModeSwitch}
						className="flex cursor-pointer rounded-md bg-linear-90 p-1 hover:from-red-gradient hover:to-purple-gradient motion-safe:transition-colors dark:text-light dark:hover:from-dark-blue-gradient dark:hover:to-dark-purple-gradient"
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
