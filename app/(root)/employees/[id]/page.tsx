import CreateWorker from '@/components/forms/CreateWorker';
import { getWorker } from '@/lib/actions/worker.actions';



async function Page( { params } : {params: {id: string}} ) {

    const curWorker = await getWorker(params.id);

    const workerData = {
        firstname: curWorker?.firstname,
        lastname: curWorker?.lastname,
        mondaystart: curWorker?.mondaystart,
        mondayend: curWorker?.mondayend,
    }

    return (
        <>
            <h1 className= "head-text">Create Employee</h1>
            <CreateWorker 
                key = {params.id}
                worker={workerData}
            />

        </>

    )

}

export default Page;