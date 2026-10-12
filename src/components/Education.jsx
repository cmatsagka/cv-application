import { useState } from 'react';

const fields = [
	{ label: 'Degree', name: 'degree', type: 'text' },
	{ label: 'Institution', name: 'institution', type: 'text' },
	{ label: 'Start Date', name: 'startDate', type: 'number' },
	{ label: 'Graduation Date', name: 'graduationDate', type: 'number' },
];

function EducationItem() {
	const [study, setStudy] = useState({
		degree: '',
		institution: '',
		startDate: '',
		graduationDate: '',
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setStudy((prev) => ({
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
				<h2>Degree: {study.degree}</h2>
				<p>School Name: {study.institution}</p>
				<p>Start Date: {study.startDate}</p>
				<p>Graduation Date: {study.graduationDate}</p>

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
						value={study[field.name]}
						onChange={handleChange}
					/>
				</div>
			))}
			<button type="submit">Save</button>
		</form>
	);
}

function Education() {
	return (
		<div className="education">
			<h2>Education</h2>
			<EducationItem />
		</div>
	);
}

export default Education;
