/** @type {import('next').NextConfig} */
const nextConfig = {
	API_URL: process.env.API_URL,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

module.exports = nextConfig;
