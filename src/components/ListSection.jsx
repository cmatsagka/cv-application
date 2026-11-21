import { useState } from 'react';

function ListSection({
	sectionKey,
	title,
	addLabel = 'Add Item',
	fields = [],
	items = [],
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	isPreview = false,
	renderItem,
}) {
	const [editingId, setEditingId] = useState(null);

	const emptyTemplate = fields.reduce((acc, field) => {
		acc[field.name] = '';
		return acc;
	}, {});

	const handleAdd = () => {
		const newId = onAddItem(sectionKey, emptyTemplate);
		if (newId) {
			setEditingId(newId);
		}
	};

	const handleDelete = (itemId) => {
		if (editingId === itemId) {
			setEditingId(null);
		}
		onDeleteItem(sectionKey, itemId);
	};

	return (
		<section className="section-card">
			<div className="section-header">
				{title && <h2>{title}</h2>}
				{!isPreview && (
					<button type="button" onClick={handleAdd}>
						+ {addLabel}
					</button>
				)}
			</div>

			{items.length === 0 ? (
				<p className="empty-state">No entries added yet.</p>
			) : (
				<div className="section-list">
					{items.map((item) => {
						const isItemEditing =
							!isPreview && editingId === item.id;

						if (isItemEditing) {
							return (
								<form
									key={item.id}
									className="item-form"
									onSubmit={(e) => {
										e.preventDefault();
										setEditingId(null);
									}}
								>
									{fields.map((field) => {
										const inputId = `${sectionKey}-${item.id}-${field.name}`;
										const value = item[field.name] ?? '';

										return (
											<div
												key={field.name}
												className="form-group"
											>
												<label htmlFor={inputId}>
													{field.label}
												</label>
												{field.type === 'textarea' ? (
													<textarea
														id={inputId}
														name={field.name}
														value={value}
														placeholder={
															field.placeholder ||
															''
														}
														rows={field.rows || 3}
														onChange={(e) =>
															onUpdateItem(
																sectionKey,
																item.id,
																field.name,
																e.target.value
															)
														}
													/>
												) : (
													<input
														id={inputId}
														name={field.name}
														type={
															field.type || 'text'
														}
														value={value}
														placeholder={
															field.placeholder ||
															''
														}
														onChange={(e) =>
															onUpdateItem(
																sectionKey,
																item.id,
																field.name,
																e.target.value
															)
														}
													/>
												)}
											</div>
										);
									})}

									<div className="form-actions">
										<button type="submit">Done</button>
										<button
											type="button"
											onClick={() =>
												handleDelete(item.id)
											}
										>
											Delete
										</button>
									</div>
								</form>
							);
						}

						return (
							<div key={item.id} className="list-item-card">
								<div className="list-item-content">
									{renderItem
										? renderItem(item)
										: fields.map((field) => (
												<p key={field.name}>
													<strong>
														{field.label}:
													</strong>{' '}
													{item[field.name] || '-'}
												</p>
											))}
								</div>

								{!isPreview && (
									<div className="item-actions">
										<button
											type="button"
											onClick={() =>
												setEditingId(item.id)
											}
										>
											Edit
										</button>
										<button
											type="button"
											onClick={() =>
												handleDelete(item.id)
											}
										>
											Delete
										</button>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}

export default ListSection;
