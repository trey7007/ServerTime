import { ChooseDate } from '@/components/forms/ChooseDate';
import { currentUser } from '@clerk/nextjs';

async function Page() {

    const user = await currentUser();

    if(!user) return null;

    return (
        <>     
        <h1 className= "head-text">Scheduling</h1>
        <ChooseDate page = "scheduling" />
        </>

    )

}

export default Page;