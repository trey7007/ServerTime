"use server";
import { revalidatePath } from "next/cache";
import Worker from "../models/worker.model";
import Schedule from "../models/schedule.model";
import { connectToDB } from "../mongoose";
import { getUser } from "./user.actions";
import { currentUser } from "@clerk/nextjs";

interface Schedule {
    workerId: string;
}

export async function getSched(date: string, orgId: string) {

    try {
      connectToDB();
  
  
      // Check if a schedule with the same orgId and date exists
        const Sched = await Schedule.findOne({ orgId, date });
        
        const res = []
        if (Sched){
            for (let i = 0; i < Sched.shifts.length; i++){
                const entry = Sched.shifts[i]
                res.push(entry.workerId);
            }
        }
        return res;
     
  
    } catch (error: any)  {
      throw new Error(`Failed to get Schedule: ${error.message}`);
    }
  }

export async function addWorkerShift(workerId: string, date: string, orgId: string, start: string, end: string) {

    try {
      connectToDB();
  
  
      // Check if a schedule with the same orgId and date exists
      const existingSchedule = await Schedule.findOne({ orgId, date });
  
      if (existingSchedule) {
  
        // If a schedule exists, append the new shift
  
        await Schedule.updateOne( 
          {_id: existingSchedule._id}, 
  
          {$addToSet: {
            shifts:{workerId, start, end}
            }
          }
        );
  
        return 'Shift added to an existing schedule';
  
  
      } else {
        // If no schedule exists, create a new one
        
        await Schedule.create({
          orgId: orgId,
          date: date,
          shifts: {workerId, start, end },
        });
  
        return 'New schedule with shift created';
      }
  
    } catch (error: any)  {
      throw new Error(`Failed to add or update schedule: ${error.message}`);
    }
  }

export async function clearShift(date: string, orgId: string){
    try{
        connectToDB();
  
  
      // Check if a schedule with the same orgId and date exists
        const existingSchedule = await Schedule.findOne({ orgId, date });
        
        if (existingSchedule) {await Schedule.findByIdAndDelete(existingSchedule._id)};


    } catch (error: any)  {
        throw new Error(`Failed to clear schedule: ${error.message}`);
      }
}