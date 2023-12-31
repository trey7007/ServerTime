"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from 'zod';
import { Textarea } from "@/components/ui/textarea";

import { createAndUpdateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    user: {
        clerkId: string;
        username: string;
        name: string;
        bio: string;
    };
}

const UserProfile = ( { user } : Props) => {
    

    const router = useRouter();
    const pathname = usePathname();


    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            name: user?.name || "" ,
            username: user?.username || "" ,
            bio: user?.bio || "" 
        }
    })


    const onSubmit = async(values: z.infer<typeof UserValidation>) => {
    
        await createAndUpdateUser({
            clerkId: user.clerkId,
            username: values.username,
            name: values.name,
            bio: values.bio,
            path: pathname 
        });

        router.push('/')
    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex gap-3 w-full flex-col">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>
                            <FormControl >
                                <Input 
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex gap-3 w-full flex-col">
                            <FormLabel className="text-base-semibold text-light-2">
                                Username
                            </FormLabel>
                            <FormControl >
                                <Input 
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex gap-3 w-full flex-col">
                            <FormLabel className="text-base-semibold text-light-2">
                               Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    )
    
}

export default UserProfile;