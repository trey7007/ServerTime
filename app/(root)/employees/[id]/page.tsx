import CreateWorker from '@/components/forms/CreateWorker';
import { getWorker } from '@/lib/actions/worker.actions';
import dayjs, { Dayjs } from 'dayjs';




async function Page( { params } : {params: {id: string}} ) {

    const curWorker = await getWorker(params.id);

    const workerData = {
        _id: String(curWorker?._id),
        orgId: String(curWorker?.orgId),
        firstname: curWorker?.firstname,
        lastname: curWorker?.lastname,
        mondaystart: curWorker?.mondaystart,
        mondayend: curWorker?.mondayend,
        monday: curWorker?.monday
    }

    return (
        <>
            <div>
                <h1 className= "head-text">Create Employee</h1>
                <CreateWorker 
                    key = {params.id}
                    worker={workerData}
                />
            </div>
        </>


    )

}

export default Page;