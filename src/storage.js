export function save(key, data) {
	try {
		const jsonData = JSON.stringify(data);
		localStorage.setItem(key, jsonData);
	} catch {}
}

export function load(key, fallback) {
	try {
		const rawJSON = localStorage.getItem(key);
		if (!rawJSON) return fallback;
		return JSON.parse(rawJSON);
	} catch {
		return fallback;
	}
}
