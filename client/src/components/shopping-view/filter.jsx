import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'






function Productfilter({filters, handlefilter}) {
  return (
    <div className='rounded-lg shadow-md   '>
        <div className='p-4 border-b '>
            <h2 className='text-lg font-extrabold'>Filters</h2>

        </div>
        <div className='p-4 space-y-4 '> 
          {
            Object.keys(filterOptions).map((filterOption) =>(<Fragment>
                <div>
                    <h3 className='text-base font-bold'>{filterOption}</h3>
                    <div className='grid gap-2 mt-2 '>
                        {
                            filterOptions[filterOption].map(option =>( <label className='flex items-center gap-2 font-normal'>
                                  <Checkbox checked={
                                    filters && 
                                    Object.keys(filters).length>0 &&
                                    filters[filterOption]&&
                                    filters[filterOption].indexOf(option.id)>-1
                                  }
                                  
                                  onCheckedChange={()=>handlefilter(filterOption,option.id)}/>
                                  {option.label}
                            </label>))
                        }
                    </div>
                </div>
                <Separator/>
            
            </Fragment>))
          }
        </div>
    </div>
  )
}

export default Productfilter