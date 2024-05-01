/** @type {import('next').NextConfig} */

const nextConfig = {
    env:{
       NEXT_PUBLIC_HOSTNAME:"http://localhost:3000/api/",
       mongodb_Url:"mongodb+srv://mostafaelkhatib26:LZyo54A2Yrtqknzc@cluster0.rjbmkjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
       NEXT_SECRET:"asdfghjkl",
       NEXTAUTH_URL:"http://localhost:3000",
       SECRET:"MOSTAFA12345"
   
    },
    images:{
   
         remotePatterns: [
           {
             protocol: 'https',
             hostname: 'lh3.googleusercontent.com',
             port: '',
           },
           {
             protocol: 'https',
             hostname: 'res.cloudinary.com',
             port: '',
           },
           {
             protocol: 'https',
             hostname: 'localhost:1338',
             port: '',
           },
         ],
    },
    experimental:{
     serverActions:true
    }
   };
   
   export default nextConfig;
   