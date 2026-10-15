import { useEffect, useState } from 'react';

const fields = [
	{ label: 'Title', name: 'title', type: 'text' },
	{ label: 'Provider / Platform', name: 'platform', type: 'text' },
	{ label: 'Date', name: 'date', type: 'text' },
	{ label: 'Credential Link', name: 'link', type: 'url' },
	{ label: 'Description', name: 'description', type: 'text' },
];

const createEmptyLearning = () => {
	const emptyObj = fields.reduce((acc, field) => {
		acc[field.name] = '';
		return acc;
	}, {});
	return { ...emptyObj, id: crypto.randomUUID() };
};

function LearningItem({ item, index, onChange, onDelete, isPreview }) {
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
							Edit
						</button>

						<button type="button" onClick={() => onDelete(item.id)}>
							X
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
			<button type="submit">Save</button>
			<button type="button" onClick={() => onDelete(item.id)}>
				X
			</button>
		</form>
	);
}

function ContinuousLearning({ isPreview, initialData }) {
	const [learning, setLearning] = useState([]);

	useEffect(() => {
		if (initialData && Array.isArray(initialData)) {
			setLearning(initialData);
		}
	}, [initialData]);

	const handleChange = (index, e) => {
		const { name, value } = e.target;
		setLearning((prevLearning) => {
			const updated = [...prevLearning];
			updated[index] = {
				...updated[index],
				[name]: value,
			};
			return updated;
		});
	};

	const handleDelete = (idToDelete) => {
		setLearning((prevLearning) =>
			prevLearning.filter((exp) => exp.id !== idToDelete)
		);
	};

	return (
		<div className="continuous-learning">
			<h2>Continuous Learning</h2>

			{learning.map((learn, index) => (
				<LearningItem
					key={learn.id}
					item={learn}
					index={index}
					id={learn.id}
					onChange={handleChange}
					onDelete={handleDelete}
					isPreview={isPreview}
				/>
			))}

			{!isPreview && (
				<button
					onClick={() =>
						setLearning([...learning, createEmptyLearning()])
					}
				>
					+ New
				</button>
			)}
		</div>
	);
}

export default ContinuousLearning;
