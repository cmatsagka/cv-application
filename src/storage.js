export function save(key, data) {
	const jsonData = JSON.stringify(data);
	localStorage.setItem(key, jsonData);
}

export function load(key, fallback) {
	const rawJSON = localStorage.getItem(key);
	if (!rawJSON) return fallback;

	return JSON.parse(rawJSON);
}
