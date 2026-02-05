import { Linkedin, Instagram, GitHub, Mail, Book } from "react-feather";

const SOCIAL_SITES = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/sarka.codes",
    icon: <Instagram />,
  },
  {
    name: "GitHub",
    url: "https://github.com/sarkaaa/",
    icon: <GitHub />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sarkachwastkova/",
    icon: <Linkedin />,
  },
  {
    name: "Medium",
    url: "https://medium.com/@sarkachwastkova",
    icon: <Book />,
  },
  {
    name: "Email",
    url: "mailto:chwastkova.s@gmail.com",
    icon: <Mail />,
  },
];

export default function SocialSites() {
  return (
    <>
      {SOCIAL_SITES?.map(({ name, url, icon }) => (
        <a key={name} href={url} target="_blank" className="relative w-[24px] h-[24px] focus:outline-red-400 dark:focus:outline-red-300 focus:outline-2 focus:outline-offset-2">
          <span className="sr-only">
            {name === "Email"
              ? "Write me an email"
              : `Check my ${name} profile.`}
          </span>
          <span className="relative">{icon}</span>
        </a>
      ))}
    </>
  );
}
