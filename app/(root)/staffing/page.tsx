import WorkerCard from '@/components/cards/WorkerCard';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page() {

    const user = await currentUser();

    if(!user) return null;

    return (
        <>
        
        <h1 className= "head-text">Staffing</h1>
        <WorkerCard
            key={"64f4ca7eda1ed5f9cd185c35"}
            id = {"64f4ca7eda1ed5f9cd185c35"}
            firstname = {"Trey"}
            lastname = {"Vincent"}
          />

        </>

    )

}

export default Page;