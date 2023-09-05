"use server";
import Org from "@/lib/models/organization.model";
import User from "@/lib/models/user.models";
import { connectToDB } from "../mongoose";

export async function createOrg(
  clerkId: string,
  name: string,
  username: string,
  bio: string,
  createdById: string
) {
  try {
    connectToDB();

    // Find the user that created this Org
    const user = await User.findOne({ clerkId: createdById });

    if (!user) {
      throw new Error("User not found"); 
    }

    const newOrg = new Org({
      clerkId,
      name,
      username,
      bio,
      createdBy: user._id, // This connects the Org via the DB id, not the Clerk ID
      managers: [user._id]
    });

    const createdOrg = await newOrg.save();

    // Update User model
    user.orgId = createdOrg._id;

    await user.save();

    return createdOrg;

  } catch (error) {

    console.error("Error creating community:", error);
    throw error;
  }
}

export async function findOrg(clerkId: string) {
  try {

    connectToDB();

    const orgDetails = await Org.findOne({ clerkId })

  } catch (error: any) {
      throw new Error(`Failed to find Org: ${error.message}`);
    }
}