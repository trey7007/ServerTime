import CreateWorker from '@/components/forms/CreateWorker';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import dayjs, { Dayjs } from "dayjs";
import { getWorker } from '@/lib/actions/worker.actions';



async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if(!user) return null;


    const workerData = {
        firstname: "",
        lastname: "",
    }


    return (
        <>
            <h1 className= "head-text">Create Employee</h1>
            <CreateWorker 
                worker={workerData}  
            />

        </>

    )

}

export default Page;