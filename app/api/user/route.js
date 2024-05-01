
import connectMongoDB from "@/data/connectMongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    await connectMongoDB();
    const { name, email, password } = await request.json();
    const exists = await User.findOne({ $or: [{ email }, { name }] });
    if (exists) {
      return NextResponse.json(
        { message: "هذاالحساب او اسم المتسخدم  موجود بالفغل" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "User reqistered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "User Error." }, { status: 500 });
  }
}
export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ massage: "succss" }, { status: 200 });
}
