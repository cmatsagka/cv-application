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
		handleLoadExample,
		handleClearAll,
	};
}
