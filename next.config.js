/** @type {import('next').NextConfig} */
const nextConfig = {
	NEXT_PUBLIC_BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	images: {
		domains: ['127.0.0.1', '192.168.0.185'],
	},
};

module.exports = nextConfig;
