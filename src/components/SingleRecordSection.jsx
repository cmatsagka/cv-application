import { useState } from 'react';
import { EditIcon } from '../assets/icons/EditIcon';
import { SaveIcon } from '../assets/icons/SaveIcon';
import { UndoIcon } from '../assets/icons/UndoIcon';

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
	const [draftSnapshot, setDraftSnapshot] = useState(null);
	const sectionLabel = title || 'section';

	const startEditing = () => {
		const snapshot = fields.reduce((acc, field) => {
			acc[field.name] = data[field.name] ?? '';
			return acc;
		}, {});
		setDraftSnapshot(snapshot);
		setIsEditing(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		onUpdateField(sectionKey, name, value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setDraftSnapshot(null);
		setIsEditing(false);
	};

	const handleCancel = () => {
		if (draftSnapshot) {
			fields.forEach((field) => {
				const previousValue = draftSnapshot[field.name] ?? '';
				if ((data[field.name] ?? '') !== previousValue) {
					onUpdateField(sectionKey, field.name, previousValue);
				}
			});
		}
		setDraftSnapshot(null);
		setIsEditing(false);
	};

	const showForm = !isPreview && isEditing;

	return (
		<section className="section-card">
			{(title || !isPreview) && (
				<div className="section-header">
					{title && <h2>{title}</h2>}
					{!isPreview && (
						<div className="section-actions">
							{isEditing && (
								<button
									type="button"
									aria-label={`Undo changes to ${sectionLabel}`}
									onClick={handleCancel}
								>
									<UndoIcon />
								</button>
							)}
							<button
								type="button"
								aria-label={
									isEditing
										? `Save ${title || 'section'}`
										: `Edit ${title || 'section'}`
								}
								onClick={
									isEditing
										? () => {
												setDraftSnapshot(null);
												setIsEditing(false);
											}
										: startEditing
								}
							>
								{isEditing ? <SaveIcon /> : <EditIcon />}
							</button>
						</div>
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
