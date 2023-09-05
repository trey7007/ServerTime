"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import Org from "../models/organization.model";


interface Params {
    clerkId: string;
    username: string;
    name: string;
    bio: string;
    path: string;
  }

export async function createAndUpdateUser({
    clerkId,
    username,
    name,
    bio,
    path,
    
  }: Params): Promise<void> {
    try {
      connectToDB();
  
      await User.findOneAndUpdate(
        { clerkId: clerkId },
        {
          username: username.toLowerCase(),
          name,
          bio,
          onboarded: true,
        },
        { upsert: true }
      );
  
      revalidatePath(path);

    } catch (error: any) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }


export async function getUser(clerkId: string) {
  try {
    connectToDB();

    return await User.findOne({ clerkId });

  } catch (error: any) {

    throw new Error(`Failed to fetch user: ${error.message}`);

  }
}