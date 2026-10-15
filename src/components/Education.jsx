import { useState } from 'react';

const fields = [
	{ label: 'Degree', name: 'degree', type: 'text' },
	{ label: 'Institution', name: 'institution', type: 'text' },
	{ label: 'Start Date', name: 'startDate', type: 'number' },
	{ label: 'Graduation Date', name: 'graduationDate', type: 'number' },
];

const createEmptyEducation = () => {
	const emptyObj = fields.reduce((acc, field) => {
		acc[field.name] = '';
		return acc;
	}, {});

	return { ...emptyObj, id: crypto.randomUUID() };
};

function EducationItem({ item, index, onChange, onDelete }) {
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

function Education() {
	const [educations, setEducations] = useState([]);

	const handleChange = (index, e) => {
		const { name, value } = e.target;
		setEducations((prevEducations) => {
			const updated = [...prevEducations];
			updated[index] = {
				...updated[index],
				[name]: value,
			};
			return updated;
		});
	};

	const handleDelete = (idToDelete) => {
		setEducations((prevEducations) =>
			prevEducations.filter((edu) => edu.id !== idToDelete)
		);
	};

	return (
		<div className="education">
			<h2>Education</h2>
			{educations.map((edu, index) => (
				<EducationItem
					key={edu.id}
					item={edu}
					index={index}
					id={edu.id}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			))}

			<button
				onClick={() =>
					setEducations([...educations, createEmptyEducation()])
				}
			>
				+ Education
			</button>
		</div>
	);
}

export default Education;
