import { useState } from 'react';

function Skills({
	categories = [],
	onAddCategory,
	onUpdateCategory,
	onDeleteCategory,
	onAddSkill,
	onUpdateSkill,
	onDeleteSkill,
	isPreview,
}) {
	const [editingCategoryId, setEditingCategoryId] = useState(null);

	const handleAddCategory = () => {
		const newCategoryId = onAddCategory('');
		if (newCategoryId) {
			setEditingCategoryId(newCategoryId);
		}
	};

	const handleDeleteCategory = (categoryId) => {
		if (editingCategoryId === categoryId) {
			setEditingCategoryId(null);
		}
		onDeleteCategory(categoryId);
	};

	return (
		<section className="section-card">
			<div className="section-header">
				<h2>Skills</h2>
				{!isPreview && (
					<button type="button" onClick={handleAddCategory}>
						+ Add Category
					</button>
				)}
			</div>

			{categories.length === 0 ? (
				<p className="empty-state">No skill categories added yet.</p>
			) : (
				<div className="section-list">
					{categories.map((category) => {
						const categorySkills = category.skills || [];
						const isEditing =
							!isPreview && editingCategoryId === category.id;

						if (isEditing) {
							return (
								<div key={category.id} className="item-form">
									<div className="form-group">
										<label
											htmlFor={`category-title-${category.id}`}
										>
											Category Name
										</label>
										<input
											id={`category-title-${category.id}`}
											type="text"
											value={category.categoryTitle ?? ''}
											placeholder="e.g., Frontend Development"
											onChange={(e) =>
												onUpdateCategory(
													category.id,
													e.target.value
												)
											}
										/>
									</div>

									<div className="form-group">
										<span className="form-label">
											Skills
										</span>
										{categorySkills.length === 0 ? (
											<p className="empty-state">
												No skills in the category yet.
											</p>
										) : (
											categorySkills.map((skill) => (
												<div
													key={skill.id}
													className="skill-input-row"
												>
													<input
														type="text"
														aria-label="Skill name"
														value={
															skill.skillName ??
															''
														}
														placeholder="e.g., React"
														onChange={(e) =>
															onUpdateSkill(
																category.id,
																skill.id,
																e.target.value
															)
														}
													/>
													<button
														type="button"
														onClick={() =>
															onDeleteSkill(
																category.id,
																skill.id
															)
														}
													>
														Remove
													</button>
												</div>
											))
										)}

										<button
											type="button"
											onClick={() =>
												onAddSkill(category.id, '')
											}
										>
											+ Add Skill
										</button>
									</div>

									<div className="form-actions">
										<button
											type="button"
											onClick={() =>
												setEditingCategoryId(null)
											}
										>
											Done
										</button>
										<button
											type="button"
											onClick={() =>
												handleDeleteCategory(
													category.id
												)
											}
										>
											Delete Category
										</button>
									</div>
								</div>
							);
						}

						const skillNames = categorySkills
							.map((skill) => skill.skillName?.trim())
							.filter(Boolean);

						return (
							<div key={category.id} className="list-item-card">
								<div className="list-item-content">
									<h3>
										{category.categoryTitle ||
											'Untitled Category'}
									</h3>
									<p>
										{skillNames.length > 0
											? skillNames.join(' • ')
											: 'No skills listed'}
									</p>
								</div>

								{!isPreview && (
									<div className="item-actions">
										<button
											type="button"
											onClick={() =>
												setEditingCategoryId(
													category.id
												)
											}
										>
											Edit
										</button>
										<button
											type="button"
											onClick={() =>
												handleDeleteCategory(
													category.id
												)
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

export default Skills;
