import { useState } from 'react';

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
			<div>
				<label>First Name:</label>
				<input
					type="text"
					name="firstName"
					value={person.firstName}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label>Last Name:</label>
				<input
					type="text"
					name="lastName"
					value={person.lastName}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label>Email:</label>
				<input
					type="text"
					name="email"
					value={person.email}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label>Phone:</label>
				<input
					type="text"
					name="phone"
					value={person.phone}
					onChange={handleChange}
				/>
			</div>
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
