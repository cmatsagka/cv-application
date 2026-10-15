import { useEffect, useState } from 'react';

const fields = [
	{ label: 'Project Title', name: 'title', type: 'text' },
	{ label: 'Project link', name: 'link', type: 'url' },
	{ label: 'Technologies Used', name: 'technologies', type: 'text' },
	{ label: 'Description', name: 'description', type: 'text' },
	{ label: 'Date', name: 'date', type: 'number' },
];

const createEmptyProject = () => {
	const emptyObj = fields.reduce((acc, field) => {
		acc[field.name] = '';
		return acc;
	}, {});

	return { ...emptyObj, id: crypto.randomUUID() };
};

function ProjectItem({ item, index, onChange, onDelete, isPreview }) {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	const handleEdit = () => {
		setIsSubmitted(false);
	};

	if (isSubmitted || isPreview) {
		return (
			<div>
				{fields.map(
					(field) =>
						item[field.name] && (
							<p key={field.name}>
								<strong>{field.label}:</strong>{' '}
								{item[field.name]}
							</p>
						)
				)}
				{!isPreview && (
					<>
						<button type="button" onClick={handleEdit}>
							Edit
						</button>
						<button type="button" onClick={() => onDelete(item.id)}>
							X
						</button>
					</>
				)}{' '}
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			{fields.map((field) => (
				<div key={field.name}>
					<label>{field.label}: </label>
					<input
						type={field.type}
						name={field.name}
						value={item[field.name]}
						onChange={(e) => onChange(index, e)}
					/>
				</div>
			))}
			<button type="submit">Save</button>
			<button type="button" onClick={() => onDelete(item.id)}>
				X
			</button>
		</form>
	);
}

function Projects({ isPreview, initialData }) {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		if (initialData) {
			setProjects(initialData);
		}
	}, [initialData]);

	const handleChange = (index, e) => {
		const { name, value } = e.target;
		setProjects((prevProjects) => {
			const updated = [...prevProjects];
			updated[index] = {
				...updated[index],
				[name]: value,
			};
			return updated;
		});
	};

	const handleDelete = (idToDelete) => {
		setProjects((prevProjects) =>
			prevProjects.filter((proj) => proj.id !== idToDelete)
		);
	};

	return (
		<div className="projects">
			<h2>Projects</h2>

			{projects.map((proj, index) => (
				<ProjectItem
					key={proj.id}
					item={proj}
					index={index}
					id={proj.id}
					onChange={handleChange}
					onDelete={handleDelete}
					isPreview={isPreview}
				/>
			))}

			{!isPreview && (
				<button
					onClick={() =>
						setProjects([...projects, createEmptyProject()])
					}
				>
					+ Project
				</button>
			)}
		</div>
	);
}

export default Projects;
