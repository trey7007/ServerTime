import WorkerCard from "@/components/cards/WorkerCard"
import { getUser } from "@/lib/actions/user.actions";
import {  getWorkersByDay } from "@/lib/actions/worker.actions"
import { currentUser } from "@clerk/nextjs";
import dayjs from 'dayjs';

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


    return(
        <>
        <div className="text-white text-center font-semibold">
            
            {formattedDate}

        </div>
        <section className="flex flex-row p-4 ">
            <div className="w-8/12 text-white">
                Making the Schedule
            </div>
            <div className="w-4/12 text-white">
                
                
                Workers

                <div className="flex flex-col space-y-6 ">
                    {result.map((worker) => (          
                    <WorkerCard
                        key={String(worker._id)}
                        id = {String(worker._id)}
                        firstname = {worker.firstname}
                        lastname = {worker.lastname}
                    />
                    ))}
                </div>

            </div>
        </section>
        </>
    )
}