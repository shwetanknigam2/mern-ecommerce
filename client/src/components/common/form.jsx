
import React from 'react'
import { SelectContent,SelectItem, SelectTrigger, SelectValue  } from '../ui/select'
import {Select} from '../ui/select'
import { Button } from '../ui/button'


function CommonForm({ formControls, formdata = {}, setformdata, onsubmit, buttontext, isbuttondisabled }) {
    function renderInput(controlItem) {
 
        let element = null
        const value = formdata[controlItem.name]
        switch (controlItem.componenttype) {
                case 'input':
                    element = (<input className='rounded-md' type={controlItem.type} name={controlItem.name} placeholder={controlItem.placeholder} id={controlItem.name} value={value}
                    onChange={event=>setformdata({
                        ...formdata,
                        [controlItem.name]:event.target.value
                    })} />)
                    break
                    case 'select':
                      element = (
                        <Select   className='overflow-visible'
                          onValueChange={(value) =>
                            setformdata({
                              ...formdata,
                              [controlItem.name]: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={controlItem.placeholder} />
                          </SelectTrigger>
                          <SelectContent side='top' className="z-50 absolute top-full mt-1 bg-white rounded-md shadow-md "
>

                            {controlItem.options && controlItem.options.length > 0 ? (
                              controlItem.options.map((option) => (
                                <SelectItem className='hover:bg-slate-300 rounded-md ' key={option.id} value={option.id}>
                                  {option.label}
                                </SelectItem>
                              ))
                            ) : (
                              <p>No options available</p>
                            )}
                          </SelectContent>
                        </Select>
                      );
                      break;
                    
                    
                case 'textarea':
                    element = (<textarea className='rounded-md' name={controlItem.name} placeholder={controlItem.placeholder} id={controlItem.name} value={value}
                    onChange={event=>setformdata({
                        ...formdata,
                        [controlItem.name]:event.target.value
                    })} />
                )
                    break



                default:
                    element =( <input type={controlItem.type} name={controlItem.name} placeholder={controlItem.placeholder} id={controlItem.name}  />)
                    break

        }
        return element
    }
  return (
    <form onSubmit={onsubmit} className="p-6 bg-gray-50 rounded-lg shadow-md">
    <div className="flex flex-col gap-4">
      {formControls.map((controlItem) => (
        <div className="grid w-full gap-1.5" key={controlItem.name}>
          <label className="mb-1 text-sm font-medium text-gray-700">
            {controlItem.label}
          </label>
          {renderInput(controlItem)}
        </div>
      ))}
    </div>
    <Button
      type="submit"
      disabled={isbuttondisabled}
      onClick={onsubmit}
      className="mt-4 w-full rounded-md bg-gradient-to-r from-gray-800 to-black px-4 py-2 text-white font-semibold shadow hover:from-black hover:to-gray-700 focus:outline-none active:scale-95 transition-transform"
    >
      {buttontext || "Submit"}
    </Button>
  </form>
  
    
  )
}

export default CommonForm