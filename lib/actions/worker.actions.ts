
  "use server";

import { revalidatePath } from "next/cache";
import Worker from "../models/worker.model";

import Counter from "../models/counter.model"
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

      let count =  await Counter.findOne({db: "workers"})

      var id = Number(count.seq_value)
      id = id + 1

      const createdWorker = await Worker.create({
        id,
        firstname,
        lastname,
        mondaystart,
        mondayend,
      });

      await Counter.findOneAndUpdate({"db" : "workers"}, { $inc: {"seq_value" : 1}})

      revalidatePath(path);

    } catch (error: any) {
      throw new Error(`Failed to create Employee: ${error.message}`);
    }
  }


export async function getAllWorkers() {
    
    connectToDB();

    try {
      const workers = await Worker.find({});
      return workers;

    } catch (error: any) {
      throw new Error('Error fetching workers: ' + error.message);
    }
  }

export async function getWorker(id: string) {

  connectToDB();

  try {
    const worker = await Worker.findOne({ id });
    console.log("this is in worker actions")
    console.log(worker)
    console.log("\n")

    return worker;

  } catch (error: any) {
    throw new Error('Error fetching worker: ' + error.message);
  }
}


  

