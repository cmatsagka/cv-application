import ListSection from './ListSection';

const EDUCATION_FIELDS = [
	{ label: 'Degree', name: 'degree', type: 'text' },
	{ label: 'Institution', name: 'institution', type: 'text' },
	{ label: 'Location', name: 'location', type: 'text' },
	{ label: 'Start Date', name: 'startDate', type: 'text' },
	{ label: 'Graduation Date', name: 'graduationDate', type: 'text' },
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		placeholder: 'Some info about this...',
		rows: 3,
	},
];

function Education({
	items,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	isPreview = false,
}) {
	return (
		<ListSection
			sectionKey="education"
			title="Education"
			fields={EDUCATION_FIELDS}
			items={items}
			onAddItem={onAddItem}
			onUpdateItem={onUpdateItem}
			onDeleteItem={onDeleteItem}
			isPreview={isPreview}
			renderItem={(item) => {
				const dateRange = [
					item.startDate?.trim(),
					item.graduationDate?.trim() ||
						(item.startDate?.trim() ? 'Present' : ''),
				]
					.filter(Boolean)
					.join(' - ');

				return (
					<div>
						<h3>
							{item.degree || 'Degree'}
							{item.institution ? `, ${item.institution}` : ''}
						</h3>
						{item.location && <p>{item.location}</p>}
						{dateRange && <p className="date-range">{dateRange}</p>}
						{item.description && <p>{item.description}</p>}
					</div>
				);
			}}
		/>
	);
}

export default Education;
