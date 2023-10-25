import { currentUser } from '@clerk/nextjs';

async function Page() {

    const user = await currentUser();

    if(!user) return null;

    return (
        <>     
        <h1 className= "head-text">Staffing</h1>
        <div className= "text-heading3 text-white">
            Place a component here that shows each day
        </div>
        </>
    )
}

export default Page;