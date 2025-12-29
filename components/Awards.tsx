"use client";

import { useEffect, useRef, useState } from "react";

interface Award {
	title: string;
	description: string;
	date: string;
}

const awards: Award[] = [
	{
		title: "AP Scholar",
		description: "Scoring 3 or higher on three or more AP Exams.",
		date: "2023-07-03"
	},
	{
		title: "Eagle Scout",
		description: "Achieved the rank of Eagle Scout.",
		date: "2024-01-00"
	},
	{
		title: "AP Scholar with Distinction Award",
		description: "Requires average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more exams.",
		date: "2024-07-03"
	},
	{
		title: "President's List: Fall Semester",
		description: "4.00 GPA for at least 12 credits during the semester.",
		date: "2024-12-00"
	},
	{
		title: "Good Citizenship Award",
		description: "Issued by Marine Corps League and American Legion Post 344.",
		date: "2025-01-00"
	},
	{
		title: "Florida Bright Futures Academic Scholarship",
		description: "Issued by Fleet Reserve Association.",
		date: "2025-01-00"
	},
	{
		title: "President's List: Spring Semester",
		description: "4.00 GPA for at least 12 credits during the semester.",
		date: "2025-05-00"
	},
	{
		title: "AP Capstone Diploma",
		description: "Successfully completed AP Seminar, AP Research, and a minimum of four additional AP courses and exams with scores of 3 or higher.",
		date: "2025-07-03"
	},
	{
		title: "AP Scholar with Distinction Award",
		description: "Requires average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more exams.",
		date: "2025-07-03"
	}
];

interface Orb {
	x: number;
	y: number;
	z: number;
	radius: number;
	gradient: [string, string];
}

export default function AwardsConstellation3D() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [orbs, setOrbs] = useState<Orb[]>([]);
	const [hovered, setHovered] = useState<number | null>(null);
	const [tooltip, setTooltip] = useState<{
		x: number;
		y: number;
		award: Award;
	} | null>(null);

	const width = 1100;
	const height = 520;

	useEffect(() => {
		const sorted = [...awards].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		const spacing = width / (sorted.length + 1);
		const baseRadius = Math.max(28, 56 - sorted.length * 2);

		const generated = sorted.map((_, i) => ({
			x: spacing * (i + 1),
			y: height / 2 + (Math.random() - 0.5) * 260,
			z: Math.random(),
			radius: baseRadius + i * 2,
			gradient: [
				`hsl(${Math.random() * 360}, 80%, 60%)`,
				`hsl(${Math.random() * 360}, 80%, 50%)`
			] as [string, string]
		}));

		setOrbs(generated);
	}, []);

	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

	return (
		<section
			id="awards"
			ref={containerRef}
			className="relative py-24 md:py-32 overflow-x-hidden"
		>
			<div className="text-center mb-24">
				<h2 className="text-5xl font-bold mb-4">Awards & Accomplishments</h2>
				<p className="text-gray-400 max-w-2xl mx-auto">
					A spatial timeline of milestones.
				</p>
			</div>

			<div className="relative w-full max-w-screen overflow-x-hidden">
				{orbs.length > 0 ? (
					<div className="origin-top">
						<svg
							viewBox={`0 0 ${width} ${height}`}
							preserveAspectRatio="xMidYMid meet"
							className="w-full max-w-full h-auto mx-auto overflow-visible"
						>
							<defs>
								{orbs.map((orb, i) => (
									<linearGradient
										key={i}
										id={`grad-${i}`}
										gradientTransform="rotate(45)"
									>
										<stop offset="0%" stopColor={orb.gradient[0]} />
										<stop offset="100%" stopColor={orb.gradient[1]} />
									</linearGradient>
								))}
							</defs>

							{/* Timeline */}
							<path
								d={`M ${orbs.map(o => `${o.x},${o.y}`).join(" L ")}`}
								fill="none"
								stroke="rgba(255,255,255,0.25)"
								strokeWidth={3}
							/>

							{/* Pulse line */}
							{hovered !== null && (
								<path
									d={`M ${orbs.map(o => `${o.x},${o.y}`).join(" L ")}`}
									fill="none"
									stroke={orbs[hovered].gradient[0]}
									strokeWidth={4}
									strokeDasharray="10 20"
									className="animate-linePulseFast"
								/>
							)}

							{/* Orbs */}
							{orbs.map((orb, i) => {
								const award = [...awards].sort(
									(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
								)[i];

								const depthScale = 0.8 + orb.z * 0.5;
								const isHovered = hovered === i;

								return (
									<g
										key={i}
										transform={`translate(${orb.x}, ${orb.y}) scale(${depthScale})`}
										onMouseEnter={e => {
											setHovered(i);

											setTooltip({
												x: e.clientX,
												y: e.clientY,
												award,
											});
										}}
										onMouseLeave={() => {
											setHovered(null);
											setTooltip(null);
										}}
										className="cursor-pointer transition-all duration-500"
										style={{
											filter: `blur(${(1 - orb.z) * 1.2}px)`,
										}}
									>
										{/* Glow */}
										<circle
											r={orb.radius + (isHovered ? 14 : 8)}
											fill={`url(#grad-${i})`}
											opacity={0.25}
											className="animate-gradientSlow"
										/>

										{/* Core */}
										<circle
											r={orb.radius}
											fill={`url(#grad-${i})`}
											className="animate-gradientSlow"
										/>

										{/* Border */}
										<circle
											r={orb.radius}
											fill="none"
											stroke="rgba(255,255,255,0.8)"
											strokeWidth={isHovered ? 3.5 : 2}
										/>
									</g>
								);
							})}
						</svg>
					</div>
				) : null}

				{/* Floating tooltip */}
				{tooltip && (
					<div
						className="fixed z-50 pointer-events-none"
						style={{
							left: isMobile ? "50%" : tooltip.x,
							top: isMobile ? "80%" : tooltip.y,
							transform: isMobile ? "translate(-50%, -100%)" : "translate(-50%, -110%)"
						}}
					>
						<div className="bg-white text-gray-900 p-4 rounded-xl shadow-2xl border border-purple-300 w-72">
							<h3 className="font-bold text-lg">{tooltip.award.title}</h3>
							<p className="text-sm text-gray-600 mt-2">
								{tooltip.award.description}
							</p>
							<span className="block text-xs text-gray-400 mt-2">
								{(() => {
									const [year, month, day] = tooltip.award.date.split("-").map(Number);
									const localDate = new Date(year, month - 1, day);

									if (tooltip.award.date.endsWith("-00")) {
										return localDate.toLocaleDateString(undefined, {
											month: "long",
											year: "numeric",
										});
									} else {
										return localDate.toLocaleDateString(undefined, {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}
								})()}
							</span>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}