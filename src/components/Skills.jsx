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

function SkillCategoryItem({ item, index, onChange, onDelete, onAdd }) {
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
				<h3>{item.categoryTitle}</h3>

				{item.skills.map((skill, skillIndex) => (
					<p key={skill.id}>{skill.skillName}</p>
				))}

				<button type="button" onClick={() => onAdd(index)}>
					Add Skill
				</button>
				<button type="button" onClick={handleEdit}>
					Edit
				</button>
				<button type="button" onClick={() => onDelete(item.id)}>
					X
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
			</div>

			<button type="submit">Save</button>
			<button type="button" onClick={() => onDelete(item.id)}>
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
				/>
			))}

			<button
				onClick={() =>
					setCategory([...category, createEmptyCategory()])
				}
			>
				Add Skill Category
			</button>
		</div>
	);
}

export default Skills;
