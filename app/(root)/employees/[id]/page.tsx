import CreateWorker from '@/components/forms/CreateWorker';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Dayjs } from "dayjs";
import { getWorker } from '@/lib/actions/worker.actions';



async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if(!user) return null;

    //Get worker data if already exists

    //getWorker
    const curWorker = await getWorker(params.id);
    console.log(curWorker)
    console.log('\n\n')
    console.log(params.id)

    const workerData = {
        id: curWorker?.id,
        firstname: curWorker?.firstname,
        lastname: curWorker?.lastname,
        mondaystart: curWorker?.mondaystart,
        mondayend: curWorker?.mondayend,

    }


    return (
        <>
        
            <h1 className= "head-text">Create Employee</h1>
            <CreateWorker 
                worker={workerData}  
                btnTitle="" />

        </>

    )

}

export default Page;