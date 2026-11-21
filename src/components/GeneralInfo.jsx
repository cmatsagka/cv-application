import SingleRecordSection from './SingleRecordSection';

const GENERALINFO_FIELDS = [
	{ label: 'First Name', name: 'firstName', type: 'text' },
	{ label: 'Last Name', name: 'lastName', type: 'text' },
	{ label: 'Location', name: 'location', type: 'text' },
	{ label: 'Phone', name: 'phone', type: 'tel' },
	{ label: 'Email', name: 'email', type: 'email' },
];

function GeneralInfo({ data, onUpdateField, isPreview = false }) {
	const fullName = [data?.firstName, data?.lastName]
		.filter(Boolean)
		.join(' ');

	const contactLine = [data?.email, data?.phone, data?.location]
		.filter(Boolean)
		.join(' • ');

	return (
		<SingleRecordSection
			sectionKey="generalInfo"
			title={isPreview ? null : 'General Information'}
			fields={GENERALINFO_FIELDS}
			data={data}
			onUpdateField={onUpdateField}
			isPreview={isPreview}
			renderView={(generalInfoData) => (
				<div className="general-info-view">
					{isPreview ? (
						<h1>{fullName || 'Your Name'}</h1>
					) : (
						<h3>{fullName || 'Your Name'}</h3>
					)}
					{(contactLine || !isPreview) && (
						<p>{contactLine || 'Add contact details'}</p>
					)}
				</div>
			)}
		/>
	);
}

export default GeneralInfo;
