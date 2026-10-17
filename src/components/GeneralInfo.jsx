import { useEffect, useState } from 'react';
import { load, save } from '../storage';
import { SaveIcon } from '../assets/icons/SaveIcon';
import { EditIcon } from '../assets/icons/EditIcon';

const fields = [
	{ label: 'First Name', name: 'firstName', type: 'text' },
	{ label: 'Last Name', name: 'lastName', type: 'text' },
	{ label: 'Location', name: 'location', type: 'text' },
	{ label: 'Phone', name: 'phone', type: 'tel' },
	{ label: 'Email', name: 'email', type: 'email' },
];

function Person({ isPreview, initialData }) {
	const [person, setPerson] = useState(
		load('personData', {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			location: '',
		})
	);

	useEffect(() => {
		if (initialData) {
			setPerson(initialData);
		}
	}, [initialData]);

	useEffect(() => {
		save('personData', person);
	}, [person]);

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPerson((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	const handleEdit = () => {
		setIsSubmitted(false);
	};

	if (isSubmitted || isPreview) {
		return (
			<div className="cv-header">
				<h1>
					{person.firstName} {person.lastName}
				</h1>
				{fields
					.filter(
						(field) =>
							field.name !== 'firstName' &&
							field.name !== 'lastName'
					)
					.map(
						(field) =>
							person[field.name] && (
								<p key={field.name}>{person[field.name]}</p>
							)
					)}

				{!isPreview && (
					<button type="button" onClick={handleEdit}>
						<EditIcon />
					</button>
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
						value={person[field.name]}
						onChange={handleChange}
					/>
				</div>
			))}
			{!isPreview && (
				<div className="form-actions">
					<button type="submit">
						<SaveIcon />
					</button>
				</div>
			)}
		</form>
	);
}

function GeneralInfo({ isPreview, initialData }) {
	return (
		<div className="general-info">
			<Person isPreview={isPreview} initialData={initialData} />
		</div>
	);
}

export default GeneralInfo;
