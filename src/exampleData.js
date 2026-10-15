// src/exampleData.js
export const sampleData = {
	generalInfo: {
		firstName: 'Alex',
		lastName: 'Morgan',
		email: 'alex.morgan@example.com',
		phone: '+1 (555) 234-5678',
	},
	summary: {
		summary:
			'Passionate frontend developer with 3+ years of experience building responsive, user-centric web applications using React, JavaScript, and modern CSS frameworks.',
	},
	skills: [
		{
			id: 'cat-1',
			categoryTitle: 'Frontend Development',
			skills: [
				{ id: 's-1', skillName: 'React' },
				{ id: 's-2', skillName: 'JavaScript (ES6+)' },
				{ id: 's-3', skillName: 'HTML5 / CSS3' },
			],
		},
		{
			id: 'cat-2',
			categoryTitle: 'Tools & Workflow',
			skills: [
				{ id: 's-4', skillName: 'Git / GitHub' },
				{ id: 's-5', skillName: 'Vite' },
			],
		},
	],
	projects: [
		{
			id: 'p-1',
			title: 'E-Commerce Dashboard',
			link: 'https://github.com/example/dashboard',
			technologies: 'React, Tailwind CSS, Chart.js',
			description:
				'Built a fully responsive admin dashboard featuring real-time data visualization and product inventory management.',
			date: '2025',
		},
	],
	experience: [
		{
			id: 'e-1',
			companyName: 'TechCorp Solutions',
			position: 'Junior Frontend Developer',
			location: 'San Francisco, CA',
			description:
				'Collaborated with UI/UX designers to implement accessible landing pages and optimized component reusability.',
			startDate: '2024',
			endDate: '2026',
		},
	],
	education: [
		{
			id: 'edu-1',
			degree: 'B.S. in Computer Science',
			institution: 'State University',
			location: 'Boston, MA',
			startDate: '2020',
			graduationDate: '2024',
			description:
				'Graduated with honors. Focused on software engineering principles and human-computer interaction.',
		},
	],
	continuousLearning: [
		{
			id: 'cl-1',
			title: 'Advanced React Patterns',
			platform: 'Frontend Masters',
			date: '2025',
			link: 'https://frontendmasters.com',
			description:
				'Completed deep-dive coursework on custom hooks, compound components, and state management architectures.',
		},
	],
};
