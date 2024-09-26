export const user0 = {
	email: 'hanzalaj380@gmail.com',
	username: 'Hanzala',
	password: 'Hanzala211',
	id: '346147',
};
export const user1 = {
	email: 'hanzalaoc211@gmail.com',
	username: 'Javed',
	password: 'Hanzala311',
	id: '174722',
};

export let users = [user0, user1];
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // it looks for the value if it contains @. and at last ${string} ^: This asserts the start of the string.
// $: This asserts the end of the string.
export function limitInput(element) {
	if (element.value.length > 15) {
		element.value = element.value.slice(0, 15);
	}
}
export function limitEmail(element) {
	if (element.value.length > 30) {
		element.value = element.value.slice(0, 30);
	}
}
export function limitCode(element) {
	if (element.value.length > 6) {
		element.value = element.value.slice(0, 6);
	}
}
