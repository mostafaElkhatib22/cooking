
import User from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectMongoDB from "@/data/connectMongoose";
import { userInfo } from "@/models/userInfo";

export async function PUT(request) {
  await connectMongoDB();
  const data = await request.json();
  const {name,password,...otherUserInfo} = data
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  await User.updateOne({ email }, {name,password});
  await userInfo.findOneAndUpdate({email},otherUserInfo,{upsert:true}) 
  return Response.json(true)
}
export async function GET() {
  await connectMongoDB();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
 if (!email) {
  return Response.json({})
 }
 const user = await User.findOne({email}).lean()
 const UserInfo = await userInfo.findOne({email}).lean()
  return Response.json(
    {...user,...UserInfo}
  )
}
