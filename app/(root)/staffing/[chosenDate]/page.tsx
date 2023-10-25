import { getUser } from "@/lib/actions/user.actions";
import {  getWorkersByDay } from "@/lib/actions/worker.actions"
import { currentUser } from "@clerk/nextjs";
import dayjs from 'dayjs';
import {StaffingDay} from "@/components/forms/StaffingDay"
import { getSched } from "@/lib/actions/schedule.actions";

interface worker {
        key: string;
        _id: string;
        firstname: string;
        lastname: string;
        start: string;
  }

export default async function Page({ params }: { params: { chosenDate: string } }) {

    const user = await currentUser();
    if(!user) return null;
    const userInfo = await getUser(user.id);


    const curDate = dayjs(params.chosenDate)
    const formattedDate = curDate.format('dddd, MMMM DD, YYYY');

    // Use a regular expression to extract the day of the week
    const dayOfWeekMatch = formattedDate.match(/^[A-Za-z]+/);
    if(!dayOfWeekMatch) return null
    // Check if a match was found and get the first match (day of the week)
    const dayOfWeek = dayOfWeekMatch[0]
    
    const result = await getWorkersByDay(userInfo.orgId, dayOfWeek)

    const availworkers: worker[] = result.map(item => ({ 
            key: String(item._id),
            _id: String(item._id),
            firstname: String(item.firstname),
            lastname: String(item.lastname),
            start: String(item.start)    
    }));
  

    const defVal = await getSched(params.chosenDate, userInfo.orgId);

    return( 
        <>
        <div className="text-white text-center text-heading2-bold font-semibold">
            
            {formattedDate}

        </div>
        <section className="flex flex-row py-8 "> 
            <div className="text-heading3-bold text-white">

                Morning Shift
                <StaffingDay availworkers={availworkers} date={params.chosenDate} orgId={userInfo.orgId} defVal={defVal}/>
            
            </div> 
        </section>
        </>
    )
}