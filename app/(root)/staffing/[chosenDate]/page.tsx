import { ScheduleCard } from '@/components/cards/ScheduleCard';
import { fullSched } from '@/lib/actions/schedule.actions';
import { getUser } from '@/lib/actions/user.actions';
import { incrementDateBy1 } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs';

interface schedCard {
    id: any;
    role: string;
    name: string;
    start: string;
    end: string;
  }

interface schedCardInput {
    day: string,
    schedule: schedCard[]
}


export default async function Page({ params }: { params: { chosenDate: string } }) {

  
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await getUser(user.id);

    
    const startSched = await fullSched(String(params.chosenDate), userInfo.orgId)


    const dateList1 : schedCardInput[] = [ {
        day: params.chosenDate, 
        schedule: startSched
    }]
   
    //amount of extra days you want added
    for (let i = 0; i < 6; i++){

        const tmp = await incrementDateBy1(String(dateList1[i].day))
        const sched = await fullSched(tmp, userInfo.orgId)

        dateList1.push({
            day: tmp, 
            schedule: sched
        })
    }




    return (
        <>     
        <h1 className= "head-text pb-5">Staffing</h1>

        <section className="flex flex-wrap justify-between">
            
            {dateList1.map((input) => (
                <div className="">
                    <ScheduleCard day={input.day} sched={input.schedule}/>
                </div>
            ))}

        </section>        
 
        </>
    )
}