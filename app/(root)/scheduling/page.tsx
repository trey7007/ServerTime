import { CalendarCard } from '@/components/cards/Schedule';
import WorkerCard from '@/components/cards/WorkerCard';
import { ChooseDate } from '@/components/forms/ChooseDate';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page() {

    const user = await currentUser();

    if(!user) return null;

    return (
        <>     
        <h1 className= "head-text">Scheduling</h1>
        <ChooseDate/>
        </>

    )

}

export default Page;