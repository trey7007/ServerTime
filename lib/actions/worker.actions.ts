"use server";
import { revalidatePath } from "next/cache";
import Worker from "../models/worker.model";
import { connectToDB } from "../mongoose";


interface Params {
  id?: string,
  orgId: string,
  firstname: string,
  lastname: string,
  monday?: string[],
  tuesday?: string[],
  wednesday?: string[],
  thursday?: string[],
  friday?: string[],
  saturday?: string[],
  sunday?: string[],
  path: string,
}

export async function createWorker({ orgId, firstname, lastname,  monday, tuesday, wednesday, thursday, friday, saturday, sunday, path }: Params ) {
    try {
      connectToDB();

      const createdWorker = await Worker.create({
        orgId,
        firstname,
        lastname,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      });

      revalidatePath(path);

    } catch (error: any) {
      throw new Error(`Failed to create Employee in createWorker: ${error.message}`);
    }
  }


export async function updateWorker( { id, firstname, lastname, monday, tuesday, wednesday, thursday, friday, saturday, sunday, path }: Params) {
  
  connectToDB();

  try {
    

    const worker = await Worker.findByIdAndUpdate(id, {
      firstname,
      lastname,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    })

    revalidatePath(path);

  } catch (error: any) {
    throw new Error('Error updating worker: ' + error.message);
  }
  }

export async function getAllWorkers() {
    
    try {
      
      connectToDB();
      const workers = await Worker.find().lean();

      return workers;

    } catch (error: any) {
      throw new Error('Error fetching workers: ' + error.message);
    }
  }

export async function getWorkersByDay(orgId: string, dayname: string) {

  try {
      
    connectToDB();

    const query = {
      orgId,
      [dayname.toLowerCase()]: { $ne: null, $not: { $size: 0 } }
    }

    const workers = await Worker.find(query).lean();
 
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
   
    // TODO: Delete the worker from the org they are part of and their schedule
    
    revalidatePath(path);

  } catch (error: any) {
    throw new Error(`Failed to delete worker: ${error.message}`);
  }
}

