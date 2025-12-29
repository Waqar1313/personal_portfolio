"use client";

interface Project {
	title: string;
	description: string;
	skills: string[];
	link?: string;
	image?: string;
}

const projects: Project[] = [
	{
		title: "Personal Portfolio",
		description: "You are currently viewing this! It's a modern portfolio website with CI/CD so that it automatically deploys to dylangerhard.com with Vercel when any changes are made.",
		skills: ["Next.js", "TypeScript", "TailwindCSS", "React", "Git"],
		link: "https://github.com/DropBearz/personal_portfolio"
	},
	{
		title: "Uniconverter",
		description: "Uniconverter is a program that allows users to convert files of one type to another using a simple web interface. It is designed to be user-friendly and efficient, making it easy for anyone to convert their files without any technical knowledge.",
		skills: ["JavaScript", "HTML", "CSS", "Python", "Docker", "Flask", "PWA", "FFmpeg", "Bash", "REST APIs", "Git", "GitHub Actions"],
		link: "https://github.com/321BadgerCode/uniconverter",
		image: "/projects/uniconverter.png"
	},
	{
		title: "LOLA",
		description: "Localized Offline Language Agent that uses Flask (WebUI), Ollama (LLMs), pyttsx3 (TTS), and OpenAI Whisper (STT).",
		skills: ["AI", "LLMs", "Ollama", "Docker", "Python", "TTS", "STT"],
		link: "https://github.com/321BadgerCode/lola"
	},
	{
		title: "Encrypt Web",
		description: "Encrypt plaintext using crypto-js for AES encryption and zxcvbn for getting password strength with entropy.",
		skills: ["HTML", "CSS", "JavaScript", "AES"],
		link: "https://github.com/321BadgerCode/encrypt_web",
		image: "/projects/encrypt_web.png"
	},
	{
		title: "Pixel Pirate",
		description: "Download images on a web page!",
		skills: ["HTML", "JavaScript", "CSS", "Browser Extension"],
		link: "https://github.com/321BadgerCode/pixel_pirate"
	},
	{
		title: "Screen Capture OCR",
		description: "Get text from screen select!",
		skills: ["HTML", "JavaScript", "Web Application"],
		link: "https://github.com/321BadgerCode/screen_capture_ocr"
	}
];

export default function ProjectsSection() {
	return (
		<section id="projects" className="py-24 px-4 md:px-16">
			<div className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-4">Projects</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Some of the most exciting projects I've worked on, highlighting my skills and creativity.
				</p>
			</div>

			<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project, idx) => (
					<a key={idx} href={project.link} target="_blank" rel="noopener noreferrer">
						<div
							className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-3 hover:shadow-3xl"
						>
							{/* Optional Image */}
							<div className="h-48 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
								{project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover"/> : project.title}
							</div>

							{/* Project Details */}
							<div className="p-6">
								<h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
								<p className="text-gray-700 mb-4">{project.description}</p>

								{/* Skills */}
								<div className="flex flex-wrap gap-2">
									{project.skills.map((skill, sIdx) => (
										<span
											key={sIdx}
											className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Floating accent circles */}
							<div className="absolute top-0 left-0 w-12 h-12 bg-purple-200 rounded-full mix-blend-multiply opacity-30 animate-floating-slow"></div>
							<div className="absolute bottom-4 right-4 w-6 h-6 bg-pink-200 rounded-full mix-blend-multiply opacity-30 animate-floating-fast"></div>
						</div>
					</a>
				))}
			</div>
		</section>
	);
}
