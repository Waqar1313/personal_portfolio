import type { Metadata } from "next";
import Home from "@/components/Home";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import Activities from "@/components/Activities";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from  "@/components/Contact";

export const metadata: Metadata = {
	title: "Dylan Gerhard — Software Engineer",
	description: "Software engineer specializing in artificial intelligence, cyber security, and cryptology."
};

export default function Page() {
	return (
		<>
			<Home />

			<Education />

			<Awards />

			<Activities />

			<Projects />

			<Skills />

			<Contact />
		</>
	);
}