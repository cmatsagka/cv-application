import useCvData from './hooks/useCvData';
import GeneralInfo from './components/GeneralInfo';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ContinuousLearning from './components/ContinuousLearning';
import Skills from './components/Skills';
import { useState } from 'react';

function App() {
	const [isPreview, setIsPreview] = useState(false);

	const {
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
	} = useCvData();

	const handlePrint = () => {
		setIsPreview(true);
		setTimeout(() => {
			window.print();
		}, 50);
	};

	return (
		<div className={`cv-application ${isPreview ? 'preview-mode' : ''}`}>
			<aside className="sidebar-panel">
				<div className="header-controls">
					<h1>CV Application</h1>
					<div className="action-buttons">
						<button
							type="button"
							onClick={() => setIsPreview((prev) => !prev)}
						>
							{isPreview ? 'Back to Edit' : 'Preview CV'}
						</button>
						<button type="button" onClick={handlePrint}>
							Print / Save PDF
						</button>
						<button type="button" onClick={handleLoadExample}>
							Load Example Data
						</button>
						<button type="button" onClick={handleClearAll}>
							Clear CV
						</button>
					</div>
				</div>
			</aside>

			<main className="cv-area">
				<div className="cv-content">
					<GeneralInfo
						data={cvData.generalInfo}
						onUpdateField={updateSectionField}
						isPreview={isPreview}
					/>
					<Summary
						data={cvData.summary}
						onUpdateField={updateSectionField}
						isPreview={isPreview}
					/>
					<Experience
						items={cvData.experience}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={isPreview}
					/>
					<Skills
						categories={cvData.skills}
						onAddCategory={addSkillCategory}
						onUpdateCategory={updateSkillCategory}
						onDeleteCategory={deleteSkillCategory}
						onAddSkill={addSkillItem}
						onUpdateSkill={updateSkillItem}
						onDeleteSkill={deleteSkillItem}
						isPreview={isPreview}
					/>
					<Education
						items={cvData.education}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={isPreview}
					/>
					<Projects
						items={cvData.projects}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={isPreview}
					/>
					<ContinuousLearning
						items={cvData.continuousLearning}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={isPreview}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
