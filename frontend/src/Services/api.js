export async function get({ url, params, headers }) {
	const response = await fetch(url + "?" + new URLSearchParams(params), {
		method: "GET",
		headers,
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

export async function post({ url, params, headers }) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: JSON.stringify(params ?? {}),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}
