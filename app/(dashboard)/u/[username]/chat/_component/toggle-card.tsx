"use client"

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import { updateStream } from "@/actions/stream";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
    label : string;
    value : boolean
    field :FieldTypes
}



const ToggleCard = ( { label , value = false , field } : ToggleCardProps ) => {


    const[isPending , startTransition] = useTransition();

    const onChange = () => {
        startTransition( ()=>{
            updateStream( { [field] : !value } ).then( () => toast.success( "Chat settings update!" ) ).catch( () => toast.error("Something wrong") )
        } )
    }

  return (
    <div className="rounded-xl bg-muted p-6">
        <div className="flex items-center justify-between">
            <p className="font-semibold shrink-0">
                 {label}
            </p>
            <div className="space-y-2">
                 <Switch checked = { value} disabled={isPending} onCheckedChange={onChange} >
                    { value ? "On" : "Off" }
                 </Switch>
            </div>
        </div>
    </div>
  )
}

export default ToggleCard;


export const ToggleCardSkeleton = () => {
   
    return (
        <Skeleton className="rounded-lg p-10 w-full" />
    )

}