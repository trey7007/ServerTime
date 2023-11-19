
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text text-left pb-10">
        Welcome to my project!
      </h1>

      <h2 className="body-text text-left pb-5">
        This is an early prototype for a scheduling app. The idea behind this project was to learn nextjs13 and create an app that a business owner could use to appropriately schedule staff for upcoming shifts. The product would alert the manager if they weren't properly staffed and warn the manager that if one particular employee left, they would have no-one to fill in for their shifts.
      </h2>

      <h2 className="body-text text-left pb-10">
        This is still in the early stages and was built by me to learn the basics of the MERN stack.
      </h2>

      <h3 className="body-text text-left">
        You'll need to first create some employees on the employees tab, then you can schedule them to later view your upcoming week on the staffing tab.
      </h3>


    </>
      
    
  )
}