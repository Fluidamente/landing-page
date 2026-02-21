/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Block direct access to ebooks folder
        source: "/ebooks/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Redirect any direct access to ebooks to 404
        source: "/ebooks/:path*",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
