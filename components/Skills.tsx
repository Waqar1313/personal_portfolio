"use client";

import { useEffect, useState } from "react";

interface SkillNode {
	name: string;
	level: "Beginner" | "Intermediate" | "Advanced";
	category: "Frontend" | "Backend" | "DevOps" | "Soft Skills" | "Security";
	connections: string[];
}

const skillsGraph: SkillNode[] = [
	{ name: "Python", level: "Advanced", category: "Backend", connections: ["Docker"] },
	{ name: "C++", level: "Advanced", category: "Backend", connections: [] },
	{ name: "C", level: "Advanced", category: "Backend", connections: ["C++"] },
	{ name: "C#", level: "Advanced", category: "Backend", connections: [] },
	{ name: "Java", level: "Intermediate", category: "Backend", connections: [] },
	{ name: "JavaScript", level: "Intermediate", category: "Frontend", connections: ["React", "TypeScript"] },
	{ name: "HTML", level: "Advanced", category: "Frontend", connections: ["CSS", "JavaScript"] },
	{ name: "CSS", level: "Advanced", category: "Frontend", connections: ["TailwindCSS"] },
	{ name: "Bash", level: "Advanced", category: "DevOps", connections: [] },
	{ name: "Perl", level: "Intermediate", category: "DevOps", connections: [] },
	{ name: "LaTeX", level: "Advanced", category: "DevOps", connections: [] },
	{ name: "Git", level: "Advanced", category: "DevOps", connections: [] },
	{ name: "React", level: "Intermediate", category: "Frontend", connections: ["Next.js", "TypeScript"] },
	{ name: "Next.js", level: "Intermediate", category: "Frontend", connections: ["React", "TailwindCSS"] },
	{ name: "TailwindCSS", level: "Intermediate", category: "Frontend", connections: ["Next.js"] },
	{ name: "TypeScript", level: "Intermediate", category: "Frontend", connections: ["React"] },
	{ name: "Docker", level: "Intermediate", category: "DevOps", connections: [] },
	{ name: "CI/CD", level: "Intermediate", category: "DevOps", connections: ["Docker", "GitHub Actions", "Jenkins"] },
	{ name: "GitHub Actions", level: "Intermediate", category: "DevOps", connections: [] },
	{ name: "Jenkins", level: "Beginner", category: "DevOps", connections: [] },
	{ name: "Communication", level: "Advanced", category: "Soft Skills", connections: ["Teamwork"] },
	{ name: "Teamwork", level: "Advanced", category: "Soft Skills", connections: [] },
	{ name: "Problem Solving", level: "Advanced", category: "Soft Skills", connections: [] },
	{ name: "Steganography", level: "Intermediate", category: "Security", connections: [] },
	{ name: "UFW", level: "Advanced", category: "Security", connections: [] },
	{ name: "Wireshark", level: "Beginner", category: "Security", connections: [] },
	{ name: "Ghidra", level: "Beginner", category: "Security", connections: [] },
	{ name: "Nmap", level: "Intermediate", category: "Security", connections: [] },
	{ name: "WireGuard", level: "Advanced", category: "Security", connections: [] },
	{ name: "LUKS", level: "Advanced", category: "Security", connections: [] }
];

// Base category colors
const categoryColors: Record<string, [number, number, number]> = {
	Frontend: [59, 130, 246],		// blue
	Backend: [16, 185, 129],		 // green
	DevOps: [245, 158, 11],			// amber
	"Soft Skills": [236, 72, 153], // pink
	"Security": [129, 140, 248],  // violet
};

// Convert RGB to string
const rgb = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

// Interpolate two colors
function blendColors(c1: [number, number, number], c2: [number, number, number]) {
	return [
		Math.floor((c1[0] + c2[0]) / 2),
		Math.floor((c1[1] + c2[1]) / 2),
		Math.floor((c1[2] + c2[2]) / 2),
	] as [number, number, number];
}

// Map level to border color: red (Beginner) → green (Advanced)
function levelToBorder(level: string) {
	switch (level) {
		case "Beginner": return "rgb(220, 38, 38)"; // red-600
		case "Intermediate": return "rgb(252, 211, 77)"; // yellow-300
		case "Advanced": return "rgb(34,197,94)"; // green-500
		default: return "#fff";
	}
}

// Category clusters
const categories = [
	{ name: "Frontend", x: 250, y: 200, radius: 150 },
	{ name: "Backend", x: 650, y: 200, radius: 150 },
	{ name: "DevOps", x: 250, y: 450, radius: 150 },
	{ name: "Soft Skills", x: 650, y: 450, radius: 150 },
	{ name: "Security", x: 450, y: 325, radius: 150 }
];

export default function SkillsGalaxyIntelligent() {
	const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
	const [hovered, setHovered] = useState<string | null>(null);

	const width = 900;
	const height = 650;

	useEffect(() => {
		const newPositions: Record<string, { x: number; y: number }> = {};

		categories.forEach(cat => {
			const nodes = skillsGraph.filter(s => s.category === cat.name);
			const angleStep = (2 * Math.PI) / nodes.length;

			nodes.forEach((node, i) => {
				const r = cat.radius * (0.5 + 0.5 * Math.min(node.connections.length / 3, 1)); // more connections → farther
				const angle = i * angleStep;
				newPositions[node.name] = {
					x: cat.x + r * Math.cos(angle),
					y: cat.y + r * Math.sin(angle),
				};
			});
		});

		setPositions(newPositions);
	}, []);

	return (
		<section id="skills" className="py-24 px-4 md:px-16">
			<div className="text-center mb-12">
				<h1 className="text-5xl font-bold mb-4">Skills Galaxy</h1>
				<p className="text-black-300 max-w-2xl mx-auto">
					Skills organized by categories with intelligent spacing and colored connections.
				</p>
				{/* Colored box legend: green = Advanced, yellow = Intermediate, red = Beginner */}
				<div className="flex justify-center space-x-4 mt-4">
					<div className="flex items-center">
						<div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
						<span className="text-gray-600">Advanced</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 bg-yellow-300 rounded-full mr-2"></div>
						<span className="text-gray-600">Intermediate</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
						<span className="text-gray-600">Beginner</span>
					</div>
				</div>
			</div>

			<div className="relative w-full overflow-x-auto">
				<svg width={width} height={height} className="mx-auto">
					{Object.keys(positions).length === 0 ? (
						<text
							x={width / 2}
							y={height / 2}
							textAnchor="middle"
							fill="#888"
							fontSize="16"
						>
							Loading skills...
						</text>
					) : (

					<>

						{/* Category circles */}
						{categories.map(cat => (
							<circle
								key={cat.name}
								cx={cat.x}
								cy={cat.y}
								r={cat.radius}
								fill="rgba(0,0,0,0.05)"
								stroke="rgba(0,0,0,0.1)"
								strokeWidth={1.5}
							/>
						))}

						{/* Edges */}
						{skillsGraph.map(skill =>
							skill.connections.map((conn, idx) => {
								if (!positions[skill.name] || !positions[conn]) return null;
								const isActive = hovered === skill.name || hovered === conn;
								return (
									<line
										key={`${skill.name}-${conn}-${idx}`}
										x1={positions[skill.name].x}
										y1={positions[skill.name].y}
										x2={positions[conn].x}
										y2={positions[conn].y}
										stroke={isActive ? "#FBBF24" : "#888888"}
										strokeWidth={isActive ? 3 : 1.5}
										strokeLinecap="round"
									/>
								);
							})
						)}

						{/* Nodes */}
						{skillsGraph.map(skill => {
							const pos = positions[skill.name];

							// Node fill color: blend of own category color and connected nodes
							let fillColor = categoryColors[skill.category];
							if (skill.connections.length > 0) {
								const connColors = skill.connections.map(cn => {
									const connNode = skillsGraph.find(s => s.name === cn)!;
									return categoryColors[connNode.category];
								});
								const avgColor = connColors.reduce(
									(acc, c) => [acc[0]+c[0], acc[1]+c[1], acc[2]+c[2]] as [number,number,number],
									[fillColor[0], fillColor[1], fillColor[2]]
								).map(v => Math.floor(v/(connColors.length+1))) as [number,number,number];
								fillColor = avgColor;
							}

							return (
								<g
									key={skill.name}
									transform={`translate(${pos.x}, ${pos.y})`}
									onMouseEnter={() => setHovered(skill.name)}
									onMouseLeave={() => setHovered(null)}
									className="cursor-pointer transition-transform duration-300"
								>
									<circle
										r={30 + skill.connections.length * 5}
										fill={rgb(fillColor)}
										stroke={levelToBorder(skill.level)}
										strokeWidth={3}
									/>
									<text
										textAnchor="middle"
										y={4}
										fontSize="12"
										fill="#000"
										className="pointer-events-none font-semibold"
									>
										{skill.name}
									</text>
								</g>
							);
						})}

						{/* Category labels */}
						{categories.map(cat => (
							<text
								key={cat.name}
								x={cat.x}
								y={cat.y - cat.radius - 15}
								fontSize="18"
								fill="#000"
								fontWeight="bold"
								textAnchor="middle"
							>
								{cat.name}
							</text>
						))}

					</>
					)}
				</svg>
			</div>
		</section>
	);
}