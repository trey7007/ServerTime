//To use this
  {/*               
  <FormField
      control={form.control}
      name="mondaystart"
      defaultValue={curdate}
      render={({ field }) => (
          <FormItem className="flex gap-3 w-3/6 flex-col" >
              <FormLabel className="text-base-semibold text-light-2 flex flex-row justify-center">
              Monday Start
              </FormLabel>
              <TimePickerInput name="mondaystart" control={form.control} sx={{ fontSize: '16px', margin: '10px', backgroundColor: 'white' }}  />
          </FormItem>
      )}
  />
 */}



import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


interface TimePickerInputProps {
  name: string;
  sx?: any;
  control?: any;
  value?: any
}

const curdate = new Date("2020-08-01T09:00:00")


const TimePickerInput: React.FC<TimePickerInputProps> = ({ name, sx, control}) => {
   

    return (
    

    <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <Controller
            name={name}
            control={control}
            defaultValue={curdate}
            render={({ field }) => (
                <TimePicker 
                    sx={sx}
                    slotProps={{
                        textField: {
                          size: "small",
                          error: false,
                          
                        },
                      }}
                    {...field}
               />
   
            )}
        />

        

</LocalizationProvider>
  );
};

export default TimePickerInput;


