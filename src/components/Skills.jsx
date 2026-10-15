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
		SkillName: '',
	};

	return { ...emptyObj, id: crypto.randomUUID() };
};

function Skills() {
	const [category, setCategory] = useState([]);

	return (
		<div className="skills">
			<h2>Skills</h2>

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
