import { useState } from 'react';

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
}) {
	const [isSubmitted, setIsSubmitted] = useState(false);

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
				<div>
					<h3>{item.categoryTitle}</h3>
					<button type="button" onClick={handleEdit}>
						Edit
					</button>
					<button type="button" onClick={() => onDelete(item.id)}>
						X
					</button>
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
						/>
					))}
				</div>

				<button type="button" onClick={() => onAdd(index)}>
					+ Skill
				</button>
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
				<button type="submit">Save</button>
				<button type="button" onClick={() => onDelete(item.id)}>
					X
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
}) {
	const [isSubmitted, setIsSubmitted] = useState(false);

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
				<span>{skill.skillName}</span>
				<button type="button" onClick={handleEdit}>
					Edit
				</button>
				<button
					type="button"
					onClick={() => onDeleteSkill(categoryIndex, skill.id)}
				>
					X
				</button>
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
			<button type="submit">Save</button>
			<button
				type="button"
				onClick={() => onDeleteSkill(categoryIndex, skill.id)}
			>
				X
			</button>
		</form>
	);
}

function Skills() {
	const [category, setCategory] = useState([]);

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
				/>
			))}

			<button
				onClick={() =>
					setCategory([...category, createEmptyCategory()])
				}
			>
				+ Category
			</button>
		</div>
	);
}

export default Skills;
