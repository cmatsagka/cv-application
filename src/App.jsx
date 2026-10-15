import { useState } from 'react';

import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ContinuousLearning from './components/ContinuousLearning';
import Projects from './components/Projects';
import Summary from './components/Summary';

function App() {
	const [activeSections, setActiveSections] = useState({
		generalInfo: true,
		summary: true,
		skills: true,
		projects: true,
		experience: true,
		education: true,
		continuousLearning: true,
	});

	const toggleSection = (sectionKey) => {
		setActiveSections((prev) => ({
			...prev,
			[sectionKey]: !prev[sectionKey],
		}));
	};

	return (
		<div className="cv-application">
			<h1>CV Application</h1>

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

			<hr />

			{activeSections.generalInfo && <GeneralInfo />}
			{activeSections.summary && <Summary />}
			{activeSections.skills && <Skills />}
			{activeSections.projects && <Projects />}
			{activeSections.experience && <Experience />}
			{activeSections.education && <Education />}
			{activeSections.continuousLearning && <ContinuousLearning />}
		</div>
	);
}

export default App;
