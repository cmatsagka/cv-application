import { useEffect, useState } from 'react';
import { load, save } from '../storage';
import { SaveIcon } from '../assets/icons/SaveIcon';
import { EditIcon } from '../assets/icons/EditIcon';

const fields = [
	{
		label: 'Professional Summary',
		name: 'summary',
		type: 'textarea',
	},
];

function Summary({ isPreview, initialData }) {
	const [summaryInfo, setSummary] = useState(
		load('summaryData', { summary: '' })
	);

	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		if (initialData) {
			setSummary(initialData);
		}
	}, [initialData]);

	useEffect(() => {
		save('summaryData', summaryInfo);
	}, [summaryInfo]);

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

	if (isSubmitted || isPreview) {
		return (
			<div>
				<h2>Professional Summary</h2>
				{fields.map(
					(field) =>
						summaryInfo[field.name] && (
							<p key={field.name}>{summaryInfo[field.name]}</p>
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
					{field.type === 'textarea' ? (
						<textarea
							name={field.name}
							value={summaryInfo[field.name]}
							onChange={handleChange}
						/>
					) : (
						<input
							type={field.type}
							name={field.name}
							value={summaryInfo[field.name]}
							onChange={handleChange}
						/>
					)}
				</div>
			))}
			<div className="form-actions">
				<button type="submit">
					<SaveIcon />
				</button>
			</div>
		</form>
	);
}

export default Summary;
