import { useEffect, useState } from 'react';
import { load, save } from '../storage';
import { SaveIcon } from '../assets/icons/SaveIcon';
import { EditIcon } from '../assets/icons/EditIcon';
import { DeleteIcon } from '../assets/icons/DeleteIcon';

const fields = [
	{ label: 'Company Name', name: 'companyName', type: 'text' },
	{ label: 'Position', name: 'position', type: 'text' },
	{ label: 'Location', name: 'location', type: 'text' },
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

function ExperienceItem({ item, index, onChange, onDelete, isPreview }) {
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
							<EditIcon />
						</button>
						<button
							className="delete-btn"
							type="button"
							onClick={() => onDelete(item.id)}
						>
							<DeleteIcon />
						</button>
					</>
				)}
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
			{!isPreview && (
				<div className="form-actions">
					<button type="submit">
						{' '}
						<SaveIcon />
					</button>
					<button
						className="delete-btn"
						type="button"
						onClick={() => onDelete(item.id)}
					>
						<DeleteIcon />
					</button>
				</div>
			)}
		</form>
	);
}

function Experience({ isPreview, initialData }) {
	const [experience, setExperience] = useState(load('experienceData', []));

	useEffect(() => {
		if (initialData) {
			setExperience(initialData);
		}
	}, [initialData]);

	useEffect(() => {
		save('experienceData', experience);
	}, [experience]);

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
					isPreview={isPreview}
				/>
			))}

			{!isPreview && (
				<button
					onClick={() =>
						setExperience([...experience, createEmptyExperience()])
					}
				>
					+ Experience
				</button>
			)}
		</div>
	);
}

export default Experience;
