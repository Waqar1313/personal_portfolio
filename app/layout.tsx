import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
	title: "Dylan Gerhard — Software Engineer",
	description: "Personal website of a software engineer."
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body id="home" className="min-h-screen flex flex-col bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]">
				{/* Header */}
				<Nav />

				{/* Main */}
				<main className="flex-1">
					<div className="max-w-6xl mx-auto">
						{children}
					</div>
				</main>

				{/* Footer */}
				<footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]">
					<div className="max-w-6xl mx-auto px-6 py-6 text-sm text-center text-[rgb(var(--color-muted))]">
						© {new Date().getFullYear()} Dylan Gerhard. All rights reserved.
					</div>
				</footer>
			</body>
		</html>
	);
}