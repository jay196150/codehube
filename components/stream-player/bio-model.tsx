"use client"

import { Dialog ,
         DialogClose , 
         DialogTitle , 
         DialogTrigger , 
         DialogContent ,
         DialogHeader } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import React, { ElementRef, useRef, useState, useTransition } from "react"
import { updateUser } from "@/actions/user"
import { toast } from "sonner"
         
interface BioModelProps {
    initialValue:string | null
}
const BioModel = ( { initialValue } : BioModelProps) => {

    const closeRef = useRef<ElementRef<"button">>(null)
    const [value , setValue] = useState(initialValue || "");
    const [isPending , startTransition] = useTransition();

    const onSubmit = (e:React.FocusEvent<HTMLFormElement>)=> {
        e.preventDefault();
        startTransition( () => {
            updateUser({bio : value}).then( () =>
             {
                toast.success("user bio updated");
                closeRef.current?.click();
            } )
            .catch( () => toast.error( "Something went wrong" ) );
        } )
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
           <Button variant= "ghost" size= "sm" className="ml-auto" >
            Edit
           </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Edit user bio </DialogTitle>
            </DialogHeader>

            <form onSubmit={ onSubmit } className="space-y-4">
                <Textarea 
                placeholder="User bio"
                onChange={ (e)=> setValue( e.target.value ) }
                value={value}
                disabled ={isPending}
                className="resize-none" />
            </form>
            <div className="flex justify-between">
              <DialogClose asChild ref={closeRef}>
                  <Button type="button" variant= "ghost"  >
                      Cancel
                  </Button>
              </DialogClose>
              <Button disabled = {isPending} type="submit" variant= "primary"  >
                Save
              </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default BioModel