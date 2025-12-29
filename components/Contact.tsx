"use client";

export default function ContactSection() {
	const githubLogo = "/logos/github.svg";
	const linkedinLogo = "/logos/linkedin.svg";
	const gmailLogo = "/logos/gmail.svg";
	const contactLogo = "/logos/contact.svg"; // MIT-licensed icon

	const contacts = [
		{
			logo: githubLogo,
			title: "GitHub",
			description: "Check out my projects",
			link: "https://github.com/321BadgerCode/"
		},
		{
			logo: linkedinLogo,
			title: "LinkedIn",
			description: "Connect professionally",
			link: "https://www.linkedin.com/in/dylan-gerhard/"
		},
		{
			logo: gmailLogo,
			title: "Email",
			description: "Send me an email",
			link: "mailto:contact@dylangerhard.com"
		},
		{
			logo: contactLogo,
			title: "vCard",
			description: "Add to contacts",
			link: "/dylan_gerhard.vcf",
			download: true
		}
	];

	return (
		<section id="contact" className="py-16 bg-gray-50">
			<h2 className="text-5xl font-bold text-center mb-12">Get in Touch</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8 lg:px-16">
				{contacts.map((c, idx) => (
					<a
						key={idx}
						href={c.link}
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
					>
						<img src={c.logo} alt={`${c.title} logo`} className="w-16 h-16 mb-4" />
						<h3 className="text-lg font-semibold mb-2">{c.title}</h3>
						<p className="text-gray-600 text-center">{c.description}</p>
					</a>
				))}
			</div>
		</section>
	);
}