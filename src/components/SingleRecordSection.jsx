import { useState } from 'react';

function SingleRecordSection({
	sectionKey,
	title,
	fields = [],
	data = {},
	onUpdateField,
	isPreview = false,
	renderView,
}) {
	const [isEditing, setIsEditing] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		onUpdateField(sectionKey, name, value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsEditing(false);
	};

	const showForm = !isPreview && isEditing;

	return (
		<section className="section-card">
			{(title || !isPreview) && (
				<div className="section-header">
					{title && <h2>{title}</h2>}
					{!isPreview && (
						<button
							type="button"
							onClick={() => setIsEditing((prev) => !prev)}
						>
							{isEditing ? 'Done' : 'Edit'}
						</button>
					)}
				</div>
			)}

			{showForm ? (
				<form onSubmit={handleSubmit} className="section-form">
					{fields.map((field) => {
						const fieldValue = data[field.name] ?? '';
						const inputId = `${sectionKey}-${field.name}`;

						return (
							<div key={field.name} className="form-group">
								<label htmlFor={inputId}>{field.label}</label>
								{field.type === 'textarea' ? (
									<textarea
										id={inputId}
										name={field.name}
										value={fieldValue}
										placeholder={field.placeholder || ''}
										onChange={handleChange}
										rows={field.rows || 4}
									/>
								) : (
									<input
										id={inputId}
										name={field.name}
										type={field.type || 'text'}
										value={fieldValue}
										placeholder={field.placeholder || ''}
										onChange={handleChange}
									/>
								)}
							</div>
						);
					})}

					<button type="submit">Save</button>
				</form>
			) : renderView ? (
				renderView(data)
			) : (
				<div className="section-view">
					{fields.map((field) => (
						<p key={field.name}>
							<strong>{field.label}:</strong>{' '}
							{data[field.name] || '-'}
						</p>
					))}
				</div>
			)}
		</section>
	);
}

export default SingleRecordSection;
