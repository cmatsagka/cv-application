import { useState } from 'react';

const fields = [
	{
		label: 'Professional Summary',
		name: 'summary',
		type: 'textarea',
	},
];

function Summary() {
	const [summaryInfo, setSummary] = useState({
		summary: '',
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSummary((prev) => ({
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
						summaryInfo[field.name] && (
							<p key={field.name}>{summaryInfo[field.name]}</p>
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
					{field.type === 'textarea' ? (
						<textarea
							name={field.name}
							value={summaryInfo[field.name]}
							onChange={handleChange}
						/>
					) : (
						<input
							type="{field.type"
							name={field.name}
							value={summaryInfo[field.name]}
							onChange={handleChange}
						/>
					)}
				</div>
			))}
			<button type="submit">Save</button>
		</form>
	);
}

export default Summary;
