import useCvData from './hooks/useCvData';
import GeneralInfo from './components/GeneralInfo';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ContinuousLearning from './components/ContinuousLearning';
import Skills from './components/Skills';

function App() {
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

	return (
		<div className="cv-application">
			<aside className="sidebar-panel">
				<div className="header-controls">
					<h1>CV Application</h1>
					<div className="action-buttons">
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
					/>
					<Summary
						data={cvData.summary}
						onUpdateField={updateSectionField}
					/>
					<Experience
						items={cvData.experience}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
					/>
					<Skills
						categories={cvData.skills}
						onAddCategory={addSkillCategory}
						onUpdateCategory={updateSkillCategory}
						onDeleteCategory={deleteSkillCategory}
						onAddSkill={addSkillItem}
						onUpdateSkill={updateSkillItem}
						onDeleteSkill={deleteSkillItem}
					/>
					<Education
						items={cvData.education}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
					/>
					<Projects
						items={cvData.projects}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
					/>
					<ContinuousLearning
						items={cvData.continuousLearning}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
