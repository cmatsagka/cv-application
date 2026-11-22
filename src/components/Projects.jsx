import ListSection from './ListSection';

const PROJECTS_FIELDS = [
	{ label: 'Project Title', name: 'title', type: 'text' },
	{ label: 'Project link', name: 'link', type: 'url' },
	{ label: 'Technologies Used', name: 'technologies', type: 'text' },
	{ label: 'Date', name: 'date', type: 'text' },
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		placeholder: 'This project is about...',
		rows: 3,
	},
];

function Projects({
	items,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	isPreview = false,
}) {
	return (
		<ListSection
			sectionKey="projects"
			title="Projects"
			addLabel="Add project"
			fields={PROJECTS_FIELDS}
			items={items}
			onAddItem={onAddItem}
			onUpdateItem={onUpdateItem}
			onDeleteItem={onDeleteItem}
			isPreview={isPreview}
			renderItem={(item) => (
				<div>
					<h3>{item.title || 'Project Title'} </h3>
					{item.link && <p>{item.link}</p>}

					{item.technologies && (
						<p>
							{item.technologies
								.split(',')
								.map((tech) => tech.trim())
								.filter(Boolean)
								.join(' • ')}
						</p>
					)}

					{item.date && <p className="date-range">{item.date}</p>}
					{item.description && <p>{item.description}</p>}
				</div>
			)}
		/>
	);
}

export default Projects;
