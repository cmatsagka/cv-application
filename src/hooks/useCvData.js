import { useEffect, useState } from 'react';
import { emptyCvData } from '../utils/emptyCvData';
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

	return { cvData, updateSectionField };
}
