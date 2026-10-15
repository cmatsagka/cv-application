import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ContinuousLearning from './components/ContinuousLearning';
import Projects from './components/Projects';
import Summary from './components/Summary';

function App() {
	return (
		<div>
			<h1>CV Application</h1>
			<GeneralInfo />
			<Summary />
			<Skills />
			<Projects />
			<Experience />
			<Education />
			<ContinuousLearning />
		</div>
	);
}

export default App;
