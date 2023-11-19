import { ChooseDate } from '@/components/forms/ChooseDate';
import { currentUser } from '@clerk/nextjs';

async function Page() {

    const user = await currentUser();

    if(!user) return null;

    return (
        <> 

        <h1 className="head-text pb-5">
            Next Steps for this project
        </h1>

        <h3 className="px-5 pb-10 text-heading3 text-light-2">
            Details are in the github, but for a quick overview...
            <li>
                Add job role to worker concept
            </li>
            <li>
                Display number of hours each employee works
            </li>
            <li>
                Add option to invite employees to see the schedule (but not edit)
            </li>
                    
        </h3>    

        <h1 className= "head-text pb-5">About me</h1>

            <h3 className="body-text px-5 flex flex-col space-y-4">
                <a href="https://www.linkedin.com/in/timothy-vincent-0b4a37189/">LinkedIn</a>

                <a href="https://github.com/trey7007">Github</a>
            </h3>

        </>

    )

}

export default Page;