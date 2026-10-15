import { useState } from 'react';

const fields = [
	{ label: 'First Name', name: 'firstName', type: 'text' },
	{ label: 'Last Name', name: 'lastName', type: 'text' },
	{ label: 'Email', name: 'email', type: 'text' },
	{ label: 'Phone', name: 'phone', type: 'text' },
];

function Person() {
	const [person, setPerson] = useState({
		firstName: 'Nemo',
		lastName: 'Mone',
		email: '',
		phone: '',
	});

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

	if (isSubmitted) {
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

				<button type="button" onClick={handleEdit}>
					Edit
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
						value={person[field.name]}
						onChange={handleChange}
					/>
				</div>
			))}
			<button type="submit">Save</button>
		</form>
	);
}

function GeneralInfo() {
	return (
		<div className="general-info">
			<h2>General Information</h2>
			<Person />
		</div>
	);
}

export default GeneralInfo;
