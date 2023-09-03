
  "use server";

import { revalidatePath } from "next/cache";
import Worker from "../models/worker.model";


import { connectToDB } from "../mongoose";

interface Params {
  firstname: string,
  lastname: string,
  mondaystart: string | null,
  mondayend: string | null,
  path: string,
}

export async function createWorker({ firstname, lastname, mondaystart, mondayend, path }: Params
  ) {
    try {
      connectToDB();


      const createdWorker = await Worker.create({
        firstname,
        lastname,
        mondaystart,
        mondayend,
      });

      revalidatePath(path);

    } catch (error: any) {
      throw new Error(`Failed to create Employee in createWorker: ${error.message}`);
    }
  }


export async function getAllWorkers() {
    
    connectToDB();

    try {
      const workers = await Worker.find({}).lean();

      return workers;

    } catch (error: any) {
      throw new Error('Error fetching workers: ' + error.message);
    }
  }

export async function getWorker(id: string) {

  connectToDB();

  try {
   
    const worker = await Worker.findById( id );
    
    return worker;

  } catch (error: any) {
    throw new Error('Error fetching worker: ' + error.message);
  }
}

export async function deleteWorker(id: string, path: string) {
  

  try {
    connectToDB();

    // Find the thread to be deleted (the main thread)
    const worker = await Worker.findByIdAndDelete(id);

    if (!worker) {
      throw new Error("Worker not found");
    }
   
    // TODO: Delete the worker from the org they are part of
    
    revalidatePath(path);

  } catch (error: any) {
    throw new Error(`Failed to delete worker: ${error.message}`);
  }
}

  

