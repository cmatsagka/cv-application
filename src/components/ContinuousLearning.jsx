import ListSection from './ListSection';

const LEARNING_FIELDS = [
	{ label: 'Title', name: 'title', type: 'text' },
	{ label: 'Provider / Platform', name: 'platform', type: 'text' },
	{ label: 'Date', name: 'date', type: 'text' },
	{ label: 'Credential Link', name: 'link', type: 'url' },
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		placeholder: 'Extra info...',
		rows: 3,
	},
];

function ContinuousLearning({
	items,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	isPreview = false,
}) {
	return (
		<ListSection
			sectionKey="continuousLearning"
			title="Continuous Learning"
			addLabel="Add Learning"
			fields={LEARNING_FIELDS}
			items={items}
			onAddItem={onAddItem}
			onUpdateItem={onUpdateItem}
			onDeleteItem={onDeleteItem}
			isPreview={isPreview}
			renderItem={(item) => (
				<div>
					<h3>
						{item.title || 'Title'}
						{item.platform ? ` @ ${item.platform}` : ''}
						{item.date && (
							<span className="date-range">, {item.date}</span>
						)}
					</h3>
					{item.link && <p>{item.link}</p>}
					{item.description && <p>{item.description}</p>}
				</div>
			)}
		/>
	);
}

export default ContinuousLearning;
