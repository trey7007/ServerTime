import CreateWorker from '@/components/forms/CreateWorker';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Dayjs } from "dayjs";
import { getAllWorkers } from "@/lib/actions/worker.actions"
import WorkerCard from '@/components/cards/WorkerCard';

// interface Params {
//     id: string;
//     firstname: string;
//     lastname: string;

//     mondaystart: Dayjs;
//     mondayend: Dayjs;
//     path: string,
//   }

async function Page() {
    
    const result = await getAllWorkers()
    console.log(result)
    
    return(
        
    <>
        <div className="flex flex-col space-y-6 ">
        {result.map((worker) => (
          
          <WorkerCard
            id = {worker.id}
            firstname = {worker.firstname}
            lastname = {worker.lastname}
          />
        ))}
        </div>
      </>
      
    )
}

export default Page;
