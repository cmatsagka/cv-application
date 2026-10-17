import { useEffect, useState } from 'react';
import { load, save } from '../storage';
import { SaveIcon } from '../assets/icons/SaveIcon';
import { EditIcon } from '../assets/icons/EditIcon';
import { DeleteIcon } from '../assets/icons/DeleteIcon';

const createEmptyCategory = () => {
	const emptyObj = {
		categoryTitle: '',
		skills: [],
	};

	return { ...emptyObj, id: crypto.randomUUID() };
};

const createEmptySkill = () => {
	const emptyObj = {
		skillName: '',
	};

	return { ...emptyObj, id: crypto.randomUUID() };
};

function SkillCategoryItem({
	item,
	index,
	onChange,
	onDelete,
	onAdd,
	onSkillChange,
	onDeleteSkill,
	isPreview,
}) {
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
				<div>
					<h3>{item.categoryTitle}</h3>
					{!isPreview && (
						<>
							<button type="button" onClick={handleEdit}>
								<EditIcon />
							</button>
							<button
								className="delete-btn"
								type="button"
								onClick={() => onDelete(item.id)}
							>
								<DeleteIcon />
							</button>
						</>
					)}
				</div>
				<div>
					{item.skills.map((skill, skillIndex) => (
						<SkillItem
							key={skill.id}
							skill={skill}
							categoryIndex={index}
							skillIndex={skillIndex}
							onSkillChange={onSkillChange}
							onDeleteSkill={onDeleteSkill}
							isPreview={isPreview}
						/>
					))}
				</div>

				{!isPreview && (
					<button type="button" onClick={() => onAdd(index)}>
						+ Skill
					</button>
				)}
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Category Title:</label>
				<input
					type="text"
					name="categoryTitle"
					value={item.categoryTitle}
					onChange={(e) => onChange(index, e)}
				/>
				<button type="submit">
					<SaveIcon />
				</button>
				<button
					className="delete-btn"
					type="button"
					onClick={() => onDelete(item.id)}
				>
					<DeleteIcon />
				</button>
			</div>
		</form>
	);
}

function SkillItem({
	skill,
	categoryIndex,
	skillIndex,
	onSkillChange,
	onDeleteSkill,
	isPreview,
}) {
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
				<span>{skill.skillName}</span>
				{!isPreview && (
					<>
						<button type="button" onClick={handleEdit}>
							<EditIcon />
						</button>
						<button
							className="delete-btn"
							type="button"
							onClick={() =>
								onDeleteSkill(categoryIndex, skill.id)
							}
						>
							<DeleteIcon />
						</button>
					</>
				)}
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="skillName"
				value={skill.skillName}
				onChange={(e) => onSkillChange(categoryIndex, skillIndex, e)}
				placeholder="e.g. React"
			/>
			<button type="submit">
				<SaveIcon />
			</button>
			<button
				className="delete-btn"
				type="button"
				onClick={() => onDeleteSkill(categoryIndex, skill.id)}
			>
				<DeleteIcon />
			</button>
		</form>
	);
}

function Skills({ isPreview, initialData }) {
	const [category, setCategory] = useState(load('categoryData', []));

	useEffect(() => {
		if (initialData && Array.isArray(initialData)) {
			setCategory(initialData);
		}
	}, [initialData]);

	useEffect(() => {
		save('categoryData', category);
	}, [category]);

	const handleChange = (index, e) => {
		const { name, value } = e.target;
		setCategory((prevCategories) => {
			const updated = [...prevCategories];
			updated[index] = {
				...updated[index],
				[name]: value,
			};
			return updated;
		});
	};

	const handleDelete = (idToDelete) => {
		setCategory((prevCategories) =>
			prevCategories.filter((cat) => cat.id !== idToDelete)
		);
	};

	const handleAddSkill = (categoryIndex) => {
		setCategory((prevCategories) => {
			const updated = [...prevCategories];
			updated[categoryIndex] = {
				...updated[categoryIndex],
				skills: [...updated[categoryIndex].skills, createEmptySkill()],
			};
			return updated;
		});
	};

	const handleDeleteSkill = (categoryIndex, skillId) => {
		setCategory((prevCategories) => {
			const updated = [...prevCategories];
			const updatedCategory = {
				...updated[categoryIndex],
			};

			updatedCategory.skills = updatedCategory.skills.filter(
				(skill) => skill.id !== skillId
			);

			updated[categoryIndex] = updatedCategory;
			return updated;
		});
	};

	const handleSkillChange = (categoryIndex, skillIndex, e) => {
		const { name, value } = e.target;
		setCategory((prevCategories) => {
			const updated = [...prevCategories];
			const updatedCategory = { ...updated[categoryIndex] };
			const updatedSkills = [...updatedCategory.skills];

			updatedSkills[skillIndex] = {
				...updatedSkills[skillIndex],
				[name]: value,
			};

			updatedCategory.skills = updatedSkills;
			updated[categoryIndex] = updatedCategory;
			return updated;
		});
	};

	return (
		<div className="skills">
			<h2>Skills</h2>

			{category.map((item, index) => (
				<SkillCategoryItem
					key={item.id}
					item={item}
					index={index}
					onChange={handleChange}
					onDelete={handleDelete}
					onAdd={handleAddSkill}
					onSkillChange={handleSkillChange}
					onDeleteSkill={handleDeleteSkill}
					isPreview={isPreview}
				/>
			))}

			{!isPreview && (
				<button
					onClick={() =>
						setCategory([...category, createEmptyCategory()])
					}
				>
					+ Skill
				</button>
			)}
		</div>
	);
}

export default Skills;
