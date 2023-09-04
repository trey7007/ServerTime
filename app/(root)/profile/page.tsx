
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page() {

    const user = await currentUser();
    
    if(!user) return null;
    
    const userInfo = await getUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    redirect(`/profile/${userInfo.id}`);

}

export default Page;