import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectMongoDB from "@/data/connectMongoose";
import clientPromise from "@/libs/config/connect";
export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    // Set it as jwt instead of database
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        const email = credentials?.email;
        const password = credentials?.password;
        
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
};
// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await userInfo.findOne({email:userEmail});
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
