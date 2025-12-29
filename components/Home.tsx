"use client";

export default function HomeSection() {
	return (
		<section className="flex flex-col gap-12">
			{/* Hero */}
			<main className="relative z-10 flex items-center gap-6 justify-center py-12">
				<a href="mailto:contact@dylangerhard.com" className="flex-shrink-0">
					<img
						src="/profile.png"
						alt="Profile picture"
						className="
							w-48 h-48 sm:w-48 sm:h-48 
							rounded-full object-cover 
							border-2 border-[rgb(var(--color-primary))] 
							transition-transform duration-200 shadow-md 
							hover:scale-105 hover:shadow-[0_0_20px_rgb(var(--color-primary)/0.6)]
						"
					/>
				</a>

				<div className="flex flex-col">
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
						Software Engineer
					</h1>
					<p className="text-lg text-[rgb(var(--color-muted))] leading-relaxed">
						I am an undergraduate Computer Science major at UCF. In high school, I completed research projects in cryptography, cybersecurity, and artificial intelligence, earning the AP Capstone Diploma. As an Eagle Scout, I developed strong teamwork and leadership skills, which I applied in Lockheed Martin Code Quest and Cyber Quest competitions with my high school Cyber Security Club.
					</p>
				</div>
			</main>
		</section>
	);
}