import ListSection from './ListSection';

const EXPERIENCE_FIELDS = [
	{ label: 'Company Name', name: 'company', type: 'text' },
	{ label: 'Role', name: 'role', type: 'text' },
	{ label: 'Location', name: 'location', type: 'text' },
	{ label: 'Start Date', name: 'startDate', type: 'text' },
	{ label: 'End Date', name: 'endDate', type: 'text' },
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		placeholder: 'Key responsibilities and achievements...',
		rows: 3,
	},
];

function Experience({
	items,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	isPreview = false,
}) {
	return (
		<ListSection
			sectionKey="experience"
			title="Experience"
			addLabel="Add Experience"
			fields={EXPERIENCE_FIELDS}
			items={items}
			onAddItem={onAddItem}
			onUpdateItem={onUpdateItem}
			onDeleteItem={onDeleteItem}
			isPreview={isPreview}
			renderItem={(item) => (
				<div>
					<h3>
						{item.role || 'Role'}{' '}
						{item.company ? ` @ ${item.company}` : ''}
					</h3>
					{item.location && <p>{item.location}</p>}
					{(item.startDate || item.endDate) && (
						<p className="date-range">
							{item.startDate} - {item.endDate || 'Present'},
						</p>
					)}
					{item.description && <p>{item.description}</p>}
				</div>
			)}
		/>
	);
}

export default Experience;
