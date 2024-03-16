/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "c.saavncdn.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "c.saavncdn.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www.jiosaavn.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "pli.saavncdn.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
