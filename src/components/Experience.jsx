import { useState } from 'react';

const fields = [
	{ label: 'Company Name', name: 'companyName', type: 'text' },
	{ label: 'Position', name: 'position', type: 'text' },
	{ label: 'Description', name: 'description', type: 'text' },
	{ label: 'Start Date', name: 'startDate', type: 'number' },
	{ label: 'End Date', name: 'endDate', type: 'number' },
];

const createEmptyExperience = () => {
	const emptyObj = fields.reduce((acc, field) => {
		acc[field.name] = '';
		return acc;
	}, {});

	return { ...emptyObj, id: crypto.randomUUID() };
};

function ExperienceItem({ item, index, onChange, onDelete }) {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	const handleEdit = () => {
		setIsSubmitted(false);
	};

	if (isSubmitted) {
		return (
			<div>
				{fields.map((field) => (
					<p key={field.name}>
						<strong>{field.label}:</strong> {item[field.name]}
					</p>
				))}

				<button type="button" onClick={handleEdit}>
					Edit
				</button>
				<button type="button" onClick={() => onDelete(item.id)}>
					X
				</button>
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

function Experience() {
	const [experience, setExperience] = useState([]);

	const handleChange = (index, e) => {
		const { name, value } = e.target;
		setExperience((prevExperience) => {
			const updated = [...prevExperience];
			updated[index] = {
				...updated[index],
				[name]: value,
			};
			return updated;
		});
	};

	const handleDelete = (idToDelete) => {
		setExperience((prevExperience) =>
			prevExperience.filter((exp) => exp.id !== idToDelete)
		);
	};

	return (
		<div className="experience">
			<h2>Experience</h2>
			{experience.map((exp, index) => (
				<ExperienceItem
					key={exp.id}
					item={exp}
					index={index}
					id={exp.id}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			))}

			<button
				onClick={() =>
					setExperience([...experience, createEmptyExperience()])
				}
			>
				+ Experience
			</button>
		</div>
	);
}

export default Experience;
