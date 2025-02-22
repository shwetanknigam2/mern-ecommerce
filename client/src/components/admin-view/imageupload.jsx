import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { useRef } from 'react'
import { Label } from '../ui/label'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'



function Productimageupload({iseditmode, file,isloadingstate, setfile, uploadedimage, setuploadedimage,setisloadingstate }){
    const inputRef=useRef(null)

    function handleImageChange(e){
        
        const file=e.target.files[0]
        if(file){
            setfile(file)
         
        }

    }

    function handledragover(e){
        e.preventDefault()
        


    }
    function handledrop(e){
        e.preventDefault()
        const file=e.dataTransfer.files?.[0]
        if(file){
            setfile(file)
        }
    }
    function handleimageremove(){
        setfile(null)
        if(inputRef.current){
            inputRef.current.value=''
        }
    }

    async function uploadtocloudinary() {
        setisloadingstate(true); // Start loading
        try {
            const data = new FormData();
            data.append('image', file);
    
            // Debugging log for FormData content
            for (let [key, value] of data.entries()) {
                console.log(`${key}:`, value);
            }
    
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);
    
            console.log(res, "Response");
    
            if (res && res.data?.url) {
                setuploadedimage(res.data.url);
                

                console.log(res.data.url) 
            } else {
                console.log("Error: URL not found in response");
            }
        } catch (error) {
            console.error("Error uploading image:", error.response?.data || error.message);
        } finally {
            setisloadingstate(false); // Stop loading, regardless of success or failure
        }
    }
    

    useEffect(() => {
        if (file !== null) {
            uploadtocloudinary();
        }
    
    }, [file]);


  return (
    <div className='w-full max-w-md mx-auto mt-4 '>
        <label className='text-lg font-semibold mb-2 block '>Product Image</label>
        <div onDragOver={handledragover} onDrop={handledrop} className={`${iseditmode?"opacity-60":""}border-2 border-dashed rounded-lg p-4`}>
        <Input id='productimage' type='file' className='hidden' ref={inputRef}  onChange={handleImageChange} 
        disabled={iseditmode}/>
            {
                !file ? (
                    <Label htmlFor='productimage' className={`${iseditmode?'cursor-not-allowed':''}flex flex-col items-center justify-center h-32 cursor-pointer `}>
                        <UploadCloudIcon className='w-10 h-10 text-muted mb-2'/>
                        <span>Drag & Drop or click to upload</span>
                    </Label>
                ) : (
                    isloadingstate?
                    <Skeleton className='h-10 bg-gray-400'/>:
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 text-primary mr-2 h-8'/>

                        </div>
                        <p className='text-sm font-medium '>{file.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted" hover:text-foreground onClick={handleimageremove}>
                            <XIcon className='w-4 h-4'/>
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Productimageupload