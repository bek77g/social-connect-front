export const getImageUrl = (url = '') =>
	url ? process.env.NEXT_PUBLIC_BACK_URL + url : null;
