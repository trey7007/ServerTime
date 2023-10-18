"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { addWorkerShift, clearShift } from "@/lib/actions/schedule.actions"

interface worker {
  key: string;
  _id: string;
  firstname: string;
  lastname: string;
}

interface Props { 
  availworkers: worker[], 
  date: string,
  orgId: string
}

const FormSchema = z.object({

  availworkers: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
    
  }),
})

export function StaffingDay( {availworkers, date, orgId}  : Props) {


  

  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      availworkers: [availworkers[0]._id]
      }
    })
  


  function onSubmit(data: any) {
    toast({
      title: "Updated the schedule",
    })

    clearShift(date , orgId);

    data.availworkers.map((worker: string) => addWorkerShift(worker, date, orgId, "11:00", "5:00"))

   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="availworkers"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Morning Shift</FormLabel>
                <FormDescription>
                 
                </FormDescription>
              </div>
              {availworkers.map((item) => (
                <FormField
                  key={item._id}
                  control={form.control}
                  name="availworkers"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item._id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== item._id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.firstname} {item.lastname}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
