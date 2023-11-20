export const actions = {
	default: async ({ request }) => {
		console.log('Event: ' + JSON.stringify((await request.formData()).get('name')));
	}
};
