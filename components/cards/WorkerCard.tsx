"use client"

import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

import { deleteWorker } from "@/lib/actions/worker.actions";

interface Props{
    id: string;
    firstname: string;
    lastname: string;
 }

const WorkerCard = ({ id, firstname, lastname } : Props) => {
    

    const router = useRouter();
    
    return(
        <article className="text-light-1 flex flex-row">
            
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">{firstname} {lastname}</h4>
            </div>

            <Button className="" onClick={() => router.push(`/employees/${id}`)}>
                View
            </Button>

            <Button className="" onClick={() => deleteWorker(id)}>
                Delete
            </Button>

        </article>
    )
}

export default WorkerCard;