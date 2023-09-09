import WorkerCard from "@/components/cards/WorkerCard"
import { getAllWorkers } from "@/lib/actions/worker.actions"

export default async function Page({ params }: { params: { chosenDate: string } }) {

    const result = await getAllWorkers()
    const curDate = new Date(params.chosenDate)


    const formattedDate = curDate.toLocaleDateString(undefined, { weekday: 'long' , year: 'numeric', month: 'long', day: 'numeric' });






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