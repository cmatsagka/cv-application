import { useState, useEffect } from 'react';
import { load, save } from './storage';
import { sampleData } from './exampleData';

import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ContinuousLearning from './components/ContinuousLearning';
import Projects from './components/Projects';
import Summary from './components/Summary';

function App() {
	const [isPreviewMode, setIsPreviewMode] = useState(false);
	const [cvData, setCvData] = useState({});

	const handleLoadExample = () => {
		setCvData(sampleData);
	};

	const [activeSections, setActiveSections] = useState(
		load('activeSectionsData', {
			generalInfo: true,
			summary: true,
			skills: true,
			projects: true,
			experience: true,
			education: true,
			continuousLearning: true,
		})
	);

	useEffect(() => {
		save('activeSectionsData', activeSections);
	}, [activeSections]);

	const toggleSection = (sectionKey) => {
		setActiveSections((prev) => ({
			...prev,
			[sectionKey]: !prev[sectionKey],
		}));
	};

	const handleClearAll = () => {
		const confirmClear = window.confirm(
			'Are you sure you want to clear your entire CV? This cannot be undone.'
		);

		if (confirmClear) {
			localStorage.clear();
			window.location.reload();
		}
	};

	return (
		<div className="cv-application">
			<div className="header-controls">
				<h1>CV Application</h1>
				<button onClick={() => setIsPreviewMode(!isPreviewMode)}>
					{isPreviewMode ? 'Edit CV' : 'Preview CV'}
				</button>

				<button onClick={handleLoadExample}>Load Example Data</button>
				<button onClick={handleClearAll}>Clear CV</button>

				{isPreviewMode && (
					<button onClick={() => window.print()}>
						Print / Save PDF
					</button>
				)}
			</div>

			{!isPreviewMode && (
				<div className="section-controls">
					<h3>Manage Sections:</h3>

					{Object.keys(activeSections).map((key) => (
						<label key={key}>
							<input
								type="checkbox"
								checked={activeSections[key]}
								onChange={() => toggleSection(key)}
							/>
							{key.charAt(0).toUpperCase() + key.slice(1)}
						</label>
					))}
				</div>
			)}

			<hr />

			{activeSections.generalInfo && (
				<GeneralInfo
					isPreview={isPreviewMode}
					initialData={cvData.generalInfo}
				/>
			)}
			{activeSections.summary && (
				<Summary
					isPreview={isPreviewMode}
					initialData={cvData.summary}
				/>
			)}
			{activeSections.skills && (
				<Skills isPreview={isPreviewMode} initialData={cvData.skills} />
			)}
			{activeSections.projects && (
				<Projects
					isPreview={isPreviewMode}
					initialData={cvData.projects}
				/>
			)}
			{activeSections.experience && (
				<Experience
					isPreview={isPreviewMode}
					initialData={cvData.experience}
				/>
			)}
			{activeSections.education && (
				<Education
					isPreview={isPreviewMode}
					initialData={cvData.education}
				/>
			)}
			{activeSections.continuousLearning && (
				<ContinuousLearning
					isPreview={isPreviewMode}
					initialData={cvData.continuousLearning}
				/>
			)}
		</div>
	);
}

export default App;
