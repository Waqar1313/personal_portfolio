import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404 Page — Not Found",
	description: "The page you are looking for does not exist."
};

export default function NotFound() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
			<h1 className="text-6xl font-bold">404</h1>
			<p className="mt-4 text-lg text-gray-500">
				Page not found
			</p>

			<Link
				href="/"
				className="mt-6 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
			>
				Go home
			</Link>
		</main>
	);
}