import { ScheduleCard } from '@/components/cards/ScheduleCard';
import { ChooseDate } from '@/components/forms/ChooseDate';
import { fullSched } from '@/lib/actions/schedule.actions';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';

async function Page() {

    const user = await currentUser();
    if(!user) return null;
    const userInfo = await getUser(user.id);


    return (
        <>     
        <h1 className= "head-text">Staffing</h1>

        <section>
            <ChooseDate page = "staffing" />
        </section>
       
 
        </>
    )
}

export default Page;