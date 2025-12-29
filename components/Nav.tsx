"use client";

import { useEffect, useState } from "react";

const navItems = [
	{ id: "home", label: "Home" },
	{ id: "education", label: "Education" },
	{ id: "awards", label: "Awards" },
	{ id: "activities", label: "Activities" },
	{ id: "projects", label: "Projects" },
	{ id: "skills", label: "Skills" },
	{ id: "contact", label: "Contact" }
];

export default function Nav() {
	const [activeSection, setActiveSection] = useState("home");
	const [menuOpen, setMenuOpen] = useState(false);
	const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Home"]);

	// Scrollspy logic
	useEffect(() => {
		const headings = Array.from(
			document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6")
		) as HTMLElement[];

		const handleScroll = () => {
			const midpoint = window.innerHeight / 2;
			let activeHeading: HTMLElement | null = null;

			for (const h of headings) {
				const rect = h.getBoundingClientRect();
				if (rect.top <= midpoint) {
					activeHeading = h;
				}
			}

			if (!activeHeading || window.scrollY === 0) {
				setActiveSection("home");
				setBreadcrumbs(["Home"]);
				return;
			}

			// Track the active section for underline
			const sectionEl = activeHeading.closest("section");
			if (sectionEl?.id) setActiveSection(sectionEl.id);

			const trail: string[] = [];
			let currentLevel = parseInt(activeHeading.tagName[1], 10);

			// Add active heading
			trail.unshift(activeHeading.textContent?.trim() || "");

			// Traverse backwards for parents
			for (let i = headings.indexOf(activeHeading) - 1; i >= 0; i--) {
				const h = headings[i];
				const level = parseInt(h.tagName[1], 10);

				if (level < currentLevel && sectionEl?.id === h.closest("section")?.id) {
					trail.unshift(h.textContent?.trim() || "");
					currentLevel = level;
				}
			}

			setBreadcrumbs([...trail]);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="sticky top-0 z-50 bg-[rgb(var(--color-surface))] backdrop-blur-sm border-b border-[rgb(var(--color-border))]">
			<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex flex-col leading-tight">
					{/* Name */}
					<span className="text-2xl sm:text-3xl font-semibold tracking-tight">
						Dylan Gerhard
					</span>
					<span className="text-xs uppercase tracking-wide text-[rgb(var(--color-muted))]">
						AI · Cybersecurity · Cryptology
					</span>
				</div>

				{/* Desktop nav */}
				<nav className="hidden sm:flex gap-8 text-sm">
					{navItems.map((item) => {
						const isActive = activeSection === item.id;

						return (
							<a
								key={item.id}
								href={`#${item.id}`}
								className={`
									relative px-3 py-2 transition-transform duration-200
									${
										isActive
											? "text-[rgb(var(--color-text))]"
											: "text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-text))] hover:scale-105"
									}
								`}
							>
								{item.label}
								<span
									className={`
										absolute left-0 bottom-0 h-[2px] bg-[rgb(var(--color-primary))]
										transition-all duration-300
										${isActive ? "w-full" : "w-0"}
									`}
								/>
							</a>
						);
					})}
				</nav>

				{/* Hamburger button */}
				<button
					className="sm:hidden p-2 rounded-md focus:outline-none focus:ring focus:ring-[rgb(var(--color-primary))]"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<span className="sr-only">Toggle menu</span>
					<div className={`w-6 h-0.5 bg-[rgb(var(--color-text))] mb-1 transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
					<div className={`w-6 h-0.5 bg-[rgb(var(--color-text))] mb-1 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
					<div className={`w-6 h-0.5 bg-[rgb(var(--color-text))] transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
				</button>
			</div>

			{/* Mobile nav */}
			{menuOpen && (
				<div className="sm:hidden border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]">
					<nav className="flex flex-col px-6 py-4 gap-4">
						{navItems.map((item) => {
							const isActive = activeSection === item.id;

							return (
								<a
									key={item.id}
									href={`#${item.id}`}
									onClick={() => setMenuOpen(false)}
									className={`
										relative px-3 py-2
										${
											isActive
												? "text-[rgb(var(--color-text))]"
												: "text-[rgb(var(--color-muted))]"
										}
									`}
								>
									{item.label}
								</a>
							);
						})}
					</nav>
				</div>
			)}

			{/* Breadcrumb */}
			<div className="max-w-6xl mx-auto px-6 py-2 text-xs text-[rgb(var(--color-muted))]">
				{breadcrumbs.map((crumb, index) => (
					<span key={index}>
						{crumb}
						{index < breadcrumbs.length - 1 && " > "}
					</span>
				))}
			</div>
		</header>
	);
}