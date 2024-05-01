import connectMongoDB from "@/data/connectMongoose";
import Cooking from "@/models/Cooking";
import { NextResponse } from "next/server";
export async function GET(requset, { params }) {
    const { id } = params;
    await connectMongoDB();
    const items = await Cooking.findOne({ _id: id });
    return NextResponse.json({ items }, { status: 200 });
  }
  