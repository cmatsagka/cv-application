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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPerson((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div>
			<h1>
				Full Name: {person.firstName} {person.lastName}
			</h1>
			<p>Email: {person.email}</p>
			<p>Phone: {person.phone}</p>

			{fields.map((field) => (
				<div key={field.name}>
					<label>{field.label}:</label>
					<input
						type={field.type}
						name={field.name}
						value={person[field.name]}
						onChange={handleChange}
					/>
				</div>
			))}
		</div>
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
