import './App.css';
import './styles/ListSection.css';
import useCvData from './hooks/useCvData';
import GeneralInfo from './components/GeneralInfo';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ContinuousLearning from './components/ContinuousLearning';
import Skills from './components/Skills';
import { DownloadIcon } from './assets/icons/DownloadIcon';
import { ExampleIcon } from './assets/icons/ExampleIcon';
import { ClearAllIcon } from './assets/icons/ClearAllIcon';

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

	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="container">
			<aside className="editor-pane">
				<header className="editor-topbar">
					<h1>CV Builder</h1>
					<div className="editor-actions">
						<button type="button" onClick={handleLoadExample}>
							<ExampleIcon />
						</button>
						<button type="button" onClick={handleClearAll}>
							<ClearAllIcon />
						</button>
						<button type="button" onClick={handlePrint}>
							<DownloadIcon />
						</button>
					</div>
				</header>

				<div className="editor-sections">
					<GeneralInfo
						data={cvData.generalInfo}
						onUpdateField={updateSectionField}
						isPreview={false}
					/>
					<Summary
						data={cvData.summary}
						onUpdateField={updateSectionField}
						isPreview={false}
					/>
					<Experience
						items={cvData.experience}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={false}
					/>
					<Skills
						categories={cvData.skills}
						onAddCategory={addSkillCategory}
						onUpdateCategory={updateSkillCategory}
						onDeleteCategory={deleteSkillCategory}
						onAddSkill={addSkillItem}
						onUpdateSkill={updateSkillItem}
						onDeleteSkill={deleteSkillItem}
						isPreview={false}
					/>
					<Education
						items={cvData.education}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={false}
					/>
					<Projects
						items={cvData.projects}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={false}
					/>
					<ContinuousLearning
						items={cvData.continuousLearning}
						onAddItem={addListItem}
						onUpdateItem={updateListItem}
						onDeleteItem={deleteListItem}
						isPreview={false}
					/>
				</div>
			</aside>

			<main className="preview-pane">
				<div className="cv-sheet">
					<GeneralInfo
						data={cvData.generalInfo}
						onUpdateField={updateSectionField}
						isPreview={true}
					/>
					{cvData.summary?.summary?.trim() && (
						<Summary
							data={cvData.summary}
							onUpdateField={updateSectionField}
							isPreview={true}
						/>
					)}
					{cvData.experience.length > 0 && (
						<Experience
							items={cvData.experience}
							onAddItem={addListItem}
							onUpdateItem={updateListItem}
							onDeleteItem={deleteListItem}
							isPreview={true}
						/>
					)}
					{cvData.skills.length > 0 && (
						<Skills
							categories={cvData.skills}
							onAddCategory={addSkillCategory}
							onUpdateCategory={updateSkillCategory}
							onDeleteCategory={deleteSkillCategory}
							onAddSkill={addSkillItem}
							onUpdateSkill={updateSkillItem}
							onDeleteSkill={deleteSkillItem}
							isPreview={true}
						/>
					)}
					{cvData.education.length > 0 && (
						<Education
							items={cvData.education}
							onAddItem={addListItem}
							onUpdateItem={updateListItem}
							onDeleteItem={deleteListItem}
							isPreview={true}
						/>
					)}
					{cvData.projects.length > 0 && (
						<Projects
							items={cvData.projects}
							onAddItem={addListItem}
							onUpdateItem={updateListItem}
							onDeleteItem={deleteListItem}
							isPreview={true}
						/>
					)}
					{cvData.continuousLearning.length > 0 && (
						<ContinuousLearning
							items={cvData.continuousLearning}
							onAddItem={addListItem}
							onUpdateItem={updateListItem}
							onDeleteItem={deleteListItem}
							isPreview={true}
						/>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
