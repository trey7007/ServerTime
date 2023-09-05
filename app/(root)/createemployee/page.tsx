import CreateWorker from '@/components/forms/CreateWorker';
import { currentUser, useOrganization } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import dayjs, { Dayjs } from "dayjs";
import { getWorker } from '@/lib/actions/worker.actions';
import { getUser } from '@/lib/actions/user.actions';

//import { useRouter } from "next/navigation";



async function Page() {

    //const router = useRouter();

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await getUser(user.id);

    console.log(userInfo);

    const workerData = {
        orgId: userInfo.orgId,
        firstname: "",
        lastname: "",
    };

    console.log(workerData);


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