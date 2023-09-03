import { getAllWorkers } from "@/lib/actions/worker.actions"
import WorkerCard from '@/components/cards/WorkerCard';
import { Button } from "@/components/ui/button" // Button to submit the form
import Link from 'next/link';

async function Page() {
    
    const result = await getAllWorkers()   
     
    return(
      <>
        <div className="flex flex-col space-y-6 ">
        {result.map((worker) => (

          
          
          <WorkerCard
            key={String(worker._id)}
            id = {String(worker._id)}
            firstname = {worker.firstname}
            lastname = {worker.lastname}
          />
        ))}
        </div>

        <div className='text-light-1'>
          <Button className=' bg-primary-500'>
            <Link href="/createemployee/">
              Create New Employee
            </Link>
          </Button>
        </div>
      </>
      
    )
}

export default Page;
