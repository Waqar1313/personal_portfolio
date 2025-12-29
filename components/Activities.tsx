"use client";

import { FaCode, FaLaptopCode, FaProjectDiagram, FaRocket } from "react-icons/fa";

interface Activity {
	title: string;
	description: string;
	icon: React.ReactNode;
}

const activities: Activity[] = [
	{
		title: "AI@UCF",
		description: "AI@UCF offers a plethora of resources to help UCF students pursue interests in artificial intelligence, data science, and machine learning. We host introductory-level general body meetings, research paper discussions, and some project teams anyone can join to get hands-on experience. Anyone can join! No prior knowledge necessary.",
		icon: <FaLaptopCode size={32} className="text-indigo-500" />
	},
	{
		title: "Game Dev Knights",
		description: "Game Dev Knights (GDK) is a club all about preparing students with the skills they need to make games outside of the classroom. We hold one general body meeting at the beginning of the year, but overall we are an events-based club, hosting things such as workshops, socials, and speaker panels for our members to attend.",
		icon: <FaCode size={32} className="text-green-500" />
	},
	{
		title: "Hack@UCF",
		description: "We are the University of Central Florida's only defensive and offensive Cybersecurity student organization. We learn, we teach, and we hack all the things.",
		icon: <FaProjectDiagram size={32} className="text-yellow-500" />
	},
	{
		title: "Red Hat User Group",
		description: "Join our community of developers and open source enthusiasts that gather regularly and informally to share experiences and common interests, learn more about Red Hat solutions and network with peers.",
		icon: <FaRocket size={32} className="text-pink-500" />
	}
];

export default function ActivitiesSection() {
	return (
		<section id="activities" className="py-20 px-4 md:px-16">
			<div className="text-center mb-12">
				<h1 className="text-5xl font-bold mb-4">What I Do</h1>
				<p className="text-gray-600 max-w-xl mx-auto">
					A glimpse into the activities and clubs I focus on as a software developer.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				{activities.map((activity, index) => (
					<div
						key={index}
						className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
					>
						<div className="mb-4">{activity.icon}</div>
						<h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
						<p className="text-gray-600">{activity.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}