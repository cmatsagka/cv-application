import useCvData from './hooks/useCvData';
import GeneralInfo from './components/GeneralInfo';
import Summary from './components/Summary';

function App() {
	const { cvData, updateSectionField, handleLoadExample, handleClearAll } =
		useCvData();

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
					<label htmlFor="test-first-name">First Name (test)</label>
					<input
						id="test-first-name"
						type="text"
						value={cvData.generalInfo?.firstName || ''}
						onChange={(e) =>
							updateSectionField(
								'generalInfo',
								'firstName',
								e.target.value
							)
						}
					/>
				</div>

				<pre>{JSON.stringify(cvData, null, 2)}</pre>
			</main>
		</div>
	);
}

export default App;
