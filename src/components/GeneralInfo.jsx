import { useEffect, useState } from 'react';
import { load, save } from '../storage';

const fields = [
	{ label: 'First Name', name: 'firstName', type: 'text' },
	{ label: 'Last Name', name: 'lastName', type: 'text' },
	{ label: 'Email', name: 'email', type: 'text' },
	{ label: 'Phone', name: 'phone', type: 'text' },
];

function Person({ isPreview, initialData }) {
	const [person, setPerson] = useState(
		load('personData', {
			firstName: 'Nemo',
			lastName: 'Mone',
			email: '',
			phone: '',
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
			<div>
				{fields.map(
					(field) =>
						person[field.name] && (
							<p key={field.name}>
								<strong>{field.label}:</strong>{' '}
								{person[field.name]}
							</p>
						)
				)}

				{!isPreview && (
					<button type="button" onClick={handleEdit}>
						Edit
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
			{!isPreview && <button type="submit">Save</button>}
		</form>
	);
}

function GeneralInfo({ isPreview, initialData }) {
	return (
		<div className="general-info">
			<h2>General Information</h2>
			<Person isPreview={isPreview} initialData={initialData} />
		</div>
	);
}

export default GeneralInfo;
