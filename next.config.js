/** @type {import('next').NextConfig} */
const nextConfig = {
	NEXT_PUBLIC_API_URL: process.env.API_URL,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

module.exports = nextConfig;
