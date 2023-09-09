"use client"

//General Form Imports Start
import * as z from 'zod'; // Zod for validation
import { useForm } from "react-hook-form"; //Form
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
import { WorkerValidation } from '@/lib/validations/worker';
import { createWorker, updateWorker } from '@/lib/actions/worker.actions';
import { Input } from '@/components/ui/input';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeToDayjs, dayjsToString } from '@/lib/utils';

interface Props {
    worker: {
        _id?: string;
        orgId: string
        firstname: string;
        lastname: string;
        monday?: string[];
        tuesday?: string[];
    };
    
}

function CreateWorker({ worker } : Props) {

    const router = useRouter();
    const pathname = usePathname();
    
    const form = useForm({
        resolver: zodResolver(WorkerValidation),
        defaultValues: {
            orgId: worker?.orgId || "used Default",
            firstname: worker?.firstname || "",
            lastname: worker?.lastname || "",
            mondaystart: worker && worker.monday ? TimeToDayjs(worker?.monday[0]) : dayjs('2000-01-01T16:00'),
            mondayend: worker && worker.monday ? TimeToDayjs(worker?.monday[1]) : dayjs('2000-01-01T22:00'),
            tuesdaystart: worker && worker.tuesday ? TimeToDayjs(worker?.tuesday[0]) : dayjs('2000-01-01T16:00'),
            tuesdayend: worker && worker.tuesday ? TimeToDayjs(worker?.tuesday[1]) : dayjs('2000-01-01T22:00'),
            timeoff: "",
        }
    })

 

    const onSubmit = async (values: z.infer<typeof WorkerValidation>) => {


        if(!worker?._id) {
                await createWorker( {
                    orgId: worker.orgId, 
                    firstname: values.firstname,
                    lastname: values.lastname,
                    monday: [dayjsToString(values.mondaystart) , dayjsToString(values.mondayend)],
                    tuesday: [dayjsToString(values.tuesdaystart) , dayjsToString(values.tuesdayend)],
                    path: pathname,
                });
        } else {


            await updateWorker( {
                id: String(worker._id),
                orgId: values.orgId,
                firstname: values.firstname,
                lastname: values.lastname,
                monday: [dayjsToString(values.mondaystart) , dayjsToString(values.mondayend)],
                tuesday: [dayjsToString(values.tuesdaystart) , dayjsToString(values.tuesdayend)],
                path: pathname,

            });



        }
            //update user

        

        router.push("/employees")

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

                <LocalizationProvider  dateAdapter={AdapterDayjs}>

                    <div className="flex flex-row gap-2">
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
                    </div>

                    <div className="flex flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="tuesdaystart"
                            render={({ field }) => (
                            <FormItem className="flex gap-3 w-3/6 flex-col" >
                                <FormLabel className="text-base-semibold text-light-2 flex flex-row justify-center">
                                Tuesday Start
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
                            name="tuesdayend"
                            render={({ field }) => (
                            <FormItem className="flex gap-3 w-3/6 flex-col" >
                                <FormLabel className="text-base-semibold text-light-2 flex flex-row justify-center">
                                Tuesday End
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
                    </div>
                </LocalizationProvider>
            
                <Button type="submit" className="bg-primary-500">
                    {worker._id ? ("Update Employee") : ("Create Employee")}
                </Button>
                
               
            </form>
        </Form>
    )
}

export default CreateWorker;