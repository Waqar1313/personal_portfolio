"use client";

interface Education {
	year: string;
	degree: string;
	institution: string;
	description: string;
}

const educationData: Education[] = [
	{
		year: "2019 – 2025",
		degree: "High School Diploma",
		institution: "West Shore Jr./Sr. High School",
		description: "4.36 weighted GPA — AP Computer Science Principles, Cyber Security Club, Robotics."
	},
	{
		year: "2024 – 2025",
		degree: "Computer Science Coursework",
		institution: "Eastern Florida State College",
		description: "4.00 GPA — Intro to C++ Programming, Intro to Java Programming, System Analysis & Design, C# Programming."
	},
	{
		year: "Exp. Graduation Spring 2029",
		degree: "B.S. in Computer Science, Minor in Cybersecurity",
		institution: "University of Central Florida",
		description: "Focused on artificial intelligence, cybersecurity, and cryptology."
	}
];

export default function EducationSection() {
	const getYearFromText = (text: string): string | null => {
		const match = text.match(/\b\d{4}\b/);
		return match ? match[0] : null;
	};

	return (
		<section id="education" className="py-20 px-4 md:px-16 bg-white">
			<div className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-4">Education</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					A journey of learning and growth throughout my academic and professional education.
				</p>
			</div>

			<div className="relative border-l-2 border-indigo-300 ml-4 md:ml-12">
				{educationData.map((edu, idx) => (
					<div
						key={idx}
						className={`
							relative group overflow-hidden rounded-2xl border
							bg-white/70 backdrop-blur-md
							p-6 shadow-sm transition-all duration-500
							hover:-translate-y-1 hover:shadow-xl
							${
								getYearFromText(edu.year) &&
								parseInt(getYearFromText(edu.year)!) >= new Date().getFullYear()
									? "border-green-400 shadow-green-200/40"
									: "border-indigo-100"
							}
						`}
					>
						{/* Left accent bar */}
						<div
							className={`
								absolute left-0 top-0 h-full w-1 rounded-r
								${
									getYearFromText(edu.year) &&
									parseInt(getYearFromText(edu.year)!) >= new Date().getFullYear()
										? "bg-gradient-to-b from-green-400 to-emerald-500"
										: "bg-indigo-300"
								}
							`}
						/>

						{/* Glow overlay for current education */}
						{getYearFromText(edu.year) &&
							parseInt(getYearFromText(edu.year)!) >= new Date().getFullYear() && (
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-400/10 via-transparent to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							)}

						{/* Header */}
						<div className="flex items-start justify-between gap-4 mb-3">
							<div>
								<h3 className="text-xl font-semibold text-indigo-700 leading-tight">
									{edu.degree}
								</h3>
								<h4 className="text-sm text-gray-700 font-medium mt-1">
									{edu.institution}
								</h4>
							</div>

							<div className="flex flex-col items-end gap-2">
								<span className="text-xs font-medium text-gray-500 tracking-wide">
									{edu.year}
								</span>

								{/* Current badge */}
								{getYearFromText(edu.year) &&
									parseInt(getYearFromText(edu.year)!) >= new Date().getFullYear() && (
										<span className="relative inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
											<span className="relative flex h-2 w-2">
												<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
												<span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
											</span>
											Currently Enrolled
										</span>
									)}
							</div>
						</div>

						{/* Description */}
						<p className="text-sm leading-relaxed text-gray-600">
							{edu.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}