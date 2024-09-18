/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
          {
              // matching all API routes
              source: '/api/:path*',
              headers: [
                  { key: 'Access-Control-Allow-Credentials', value: 'true' },
                  { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
                  {
                      key: 'Access-Control-Allow-Methods',
                      value: 'GET,DELETE,PATCH,POST,PUT'
                  },
                  {
                      key: 'Access-Control-Allow-Headers',
                      value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
                  }
              ]
          }
      ]
    },
      images: {
          remotePatterns: [
              {
                  protocol: 'https',
                  hostname: 'placehold.co',
                  pathname: '/**'
              },
              {
                  protocol: 'https',
                  hostname: 'retruequenocountry.s3.us-east-2.amazonaws.com',
                  pathname: '/**'
              },
              {
                  protocol: 'https',
                  hostname: 'drive.google.com',
                  pathname: '/**'
              }
          ]
      },
  }
  
  export default nextConfig
  