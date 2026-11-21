import { useEffect, useState } from 'react';
import { emptyCvData } from '../utils/emptyCvData';
import { sampleData } from '../utils/exampleData';
import { save, load } from '../utils/storage';

const STORAGE_KEY = 'cv_data';

export default function useCvData() {
	const [cvData, setCvData] = useState(() => load(STORAGE_KEY, emptyCvData));

	useEffect(() => {
		save(STORAGE_KEY, cvData);
	}, [cvData]);

	function updateSectionField(sectionKey, fieldName, value) {
		setCvData((prev) => ({
			...prev,
			[sectionKey]: {
				...(prev[sectionKey] || {}),
				[fieldName]: value,
			},
		}));
	}

	const addListItem = (sectionKey, fieldsTemplate = {}) => {
		const newItem = {
			...fieldsTemplate,
			id: crypto.randomUUID(),
		};

		setCvData((prev) => ({
			...prev,
			[sectionKey]: [...(prev[sectionKey] || []), newItem],
		}));

		return newItem.id;
	};

	const updateListItem = (sectionKey, itemId, fieldName, value) => {
		setCvData((prev) => ({
			...prev,
			[sectionKey]: (prev[sectionKey] || []).map((item) =>
				item.id === itemId ? { ...item, [fieldName]: value } : item
			),
		}));
	};

	const deleteListItem = (sectionKey, itemId) => {
		setCvData((prev) => ({
			...prev,
			[sectionKey]: (prev[sectionKey] || []).filter(
				(item) => item.id !== itemId
			),
		}));
	};

	const addSkillCategory = (categoryTitle = '') => {
		const newCategory = {
			id: crypto.randomUUID(),
			categoryTitle,
			skills: [],
		};

		setCvData((prev) => ({
			...prev,
			skills: [...(prev.skills || []), newCategory],
		}));

		return newCategory.id;
	};

	const updateSkillCategory = (categoryId, categoryTitle) => {
		setCvData((prev) => ({
			...prev,
			skills: (prev.skills || []).map((category) =>
				category.id === categoryId
					? { ...category, categoryTitle }
					: category
			),
		}));
	};

	const deleteSkillCategory = (categoryId) => {
		setCvData((prev) => ({
			...prev,
			skills: (prev.skills || []).filter(
				(category) => category.id !== categoryId
			),
		}));
	};

	const addSkillItem = (categoryId, skillName = '') => {
		const newSkill = {
			id: crypto.randomUUID(),
			skillName,
		};

		setCvData((prev) => ({
			...prev,
			skills: (prev.skills || []).map((category) =>
				category.id === categoryId
					? {
							...category,
							skills: [...(category.skills || []), newSkill],
						}
					: category
			),
		}));

		return newSkill.id;
	};

	const updateSkillItem = (categoryId, skillId, skillName) => {
		setCvData((prev) => ({
			...prev,
			skills: (prev.skills || []).map((category) =>
				category.id === categoryId
					? {
							...category,
							skills: (category.skills || []).map((skill) =>
								skill.id === skillId
									? { ...skill, skillName }
									: skill
							),
						}
					: category
			),
		}));
	};

	const deleteSkillItem = (categoryId, skillId) => {
		setCvData((prev) => ({
			...prev,
			skills: (prev.skills || []).map((category) =>
				category.id === categoryId
					? {
							...category,
							skills: (category.skills || []).filter(
								(skill) => skill.id !== skillId
							),
						}
					: category
			),
		}));
	};

	const handleLoadExample = () => {
		setCvData(sampleData);
	};

	const handleClearAll = () => {
		const confirmClear = window.confirm(
			'Are you sure you want to clear your entire CV? This cannot be undone.'
		);

		if (confirmClear) {
			save(STORAGE_KEY, emptyCvData);
			setCvData(emptyCvData);
		}
	};

	return {
		cvData,
		updateSectionField,
		addListItem,
		updateListItem,
		deleteListItem,
		addSkillCategory,
		updateSkillCategory,
		deleteSkillCategory,
		addSkillItem,
		updateSkillItem,
		deleteSkillItem,
		handleLoadExample,
		handleClearAll,
	};
}
