"use client"

//General Form Imports Start
import * as z from 'zod'; // Zod for validation
import { Controller, useForm } from "react-hook-form"; //Form
import { Button } from "@/components/ui/button" // Button to submit the form
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";


import { Textarea } from "@/components/ui/textarea"; //Text for the form
import { zodResolver } from '@hookform/resolvers/zod'; // Zod for validation
//General Form Imports End


import { usePathname, useRouter } from "next/navigation";
import { formatDateString } from "@/lib/utils";

import { useOrganization } from '@clerk/nextjs';
import { WorkerValidation } from '@/lib/validations/worker';
import { createWorker } from '@/lib/actions/worker.actions';
import { Input } from '@/components/ui/input';


import TimePickerInput from '../ui/timepicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';



interface Props {
    worker: {
        id: string;
        firstname: string;
        lastname: string;
        mondaystart: Dayjs | string |  null;
        mondayend: Dayjs | string| null;
    };

    btnTitle: string;
}

function CreateWorker({ worker, btnTitle } : Props) {

   
    

    const router = useRouter();
    const pathname = usePathname();
    //const curdate = dayjs('2000-01-01T15:30');


   
    //const { organization } = useOrganization();

    const form = useForm({
        resolver: zodResolver(WorkerValidation),
        defaultValues: {
            firstname: worker?.firstname || "",
            lastname: worker?.lastname || "",
            mondaystart: worker?.mondaystart || null,
            mondayend: worker?.mondayend || null,
            timeoff: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof WorkerValidation>) => {
      
        if(worker.id === null) {
            await createWorker( { 
                firstname: values.firstname,
                lastname: values.lastname,
                mondaystart: values.mondaystart,
                mondayend:  values.mondayend,
                path: pathname,
            });
        } else {
            //update user

        }

        router.push("/")

    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="mt-10 flex flex-col justify-start gap-10">
                
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                    <FormItem className="flex gap-3 w-full flex-col">
                        <FormLabel className="text-base-semibold text-light-1 " >
                            First Name
                        </FormLabel>
                        <FormControl >
                            <Input 
                                type="text"
                                className="account-form_input no-focus"
                                {...field}
                            />
                        </FormControl>

                        <FormMessage className="text-light-1" />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                    <FormItem className="flex gap-3 w-full flex-col">
                        <FormLabel className="text-base-semibold text-light-2">
                            Last Name
                        </FormLabel>
                        <FormControl >
                            <Input 
                                type="text"
                                className="account-form_input no-focus"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="text-light-1"/>
                    </FormItem>
                    )}
                />

                <div className="flex flex-row gap-2">
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                        <FormField
                            control={form.control}
                            name="mondaystart"
                            render={({ field }) => (
                            <FormItem className="flex gap-3 w-3/6 flex-col" >
                                <FormLabel className="text-base-semibold text-light-2 flex flex-row justify-center">
                                Monday Start
                                </FormLabel>
                                <TimePicker
                                    sx={{fontSize: '16px', margin: '10px', backgroundColor: 'white' }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                    }}
                                    {...field}
                                />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mondayend"
                            render={({ field }) => (
                            <FormItem className="flex gap-3 w-3/6 flex-col" >
                                <FormLabel className="text-base-semibold text-light-2 flex flex-row justify-center">
                                Monday End
                                </FormLabel>
                                <TimePicker
                                    sx={{fontSize: '16px', margin: '10px', backgroundColor: 'white' }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                    }}
                                    {...field}
                                />
                            </FormItem>
                            )}
                        />
                    </LocalizationProvider>
                </div>

                <Button type="submit" className="bg-primary-500">
                    Create Employee
                </Button>
                
            </form>
        </Form>
    )
}

export default CreateWorker;