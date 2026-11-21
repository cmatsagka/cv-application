import SingleRecordSection from './SingleRecordSection';

const SUMMARY_FIELDS = [
	{
		name: 'summary',
		label: 'Professional Summary',
		type: 'textarea',
		placeholder: 'Write a brief overview of your background and goals...',
		rows: 4,
	},
];

function Summary({ data, onUpdateField, isPreview = false }) {
	return (
		<SingleRecordSection
			sectionKey="summary"
			title="Summary"
			fields={SUMMARY_FIELDS}
			data={data}
			onUpdateField={onUpdateField}
			isPreview={isPreview}
			renderView={(summaryData) => (
				<p className="summary-text">
					{summaryData.summary || 'No summary added yet.'}
				</p>
			)}
		/>
	);
}

export default Summary;
