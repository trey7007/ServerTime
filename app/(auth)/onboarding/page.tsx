import UserProfile from "@/components/forms/UserProfile";
import { getUser } from "@/lib/actions/user.actions";

import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";


async function Page() {
    const clerkUser = await currentUser();

    if(!clerkUser) return null

    const user = await getUser(clerkUser.id);

    if(user?.onboarded) redirect('/')

    const userData = {
        clerkId: clerkUser?.id,
        id: user?.id,
        username: user ? user?.username: clerkUser?.username,
        name: user ?  user?.name : clerkUser.firstName || "",
        bio: user ? user?.bio : "",
    }

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text"> Onboarding</h1>
            <p className="mt text-base-regular text-light-2">
                Complete your profile to start using Server Time
            </p>

            <section className="mt-9 bg-dark p-10">
                <UserProfile 
                    user={userData} 
                />
            </section>
        </main>
    )
}

export default Page