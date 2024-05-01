import connectMongoDB from "@/data/connectMongoose";
import Cooking from "@/models/Cooking";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  // add products
  export async function POST(req) {
    const data = await req.json();
    await connectMongoDB();
    await Cooking.create(data);
    return NextResponse.json({ massge: "created successful" }, { status: 201 });
  }
  // Updated products
  export async function PUT(req) {
    const { _id, ...data } = await req.json();
    await connectMongoDB();
    await Cooking.findByIdAndUpdate(_id, data);
    return NextResponse.json({ massge: "Updated successful" }, { status: 200 });
  }
  // get all products
  export async function GET() {
    await connectMongoDB();
    const items = await Cooking.find();
    return NextResponse.json({ items });
  }
  // delete Product
  export async function DELETE(req) {
    await connectMongoDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get("id");
    await Cooking.deleteOne({_id});
    return NextResponse.json({ massge: "Deleted successful" }, { status: 200 });
  }