import { create } from "zustand";

interface CreatorSidebatStore {
    collapsed : boolean;
    onExpand: () => void;
    onCollapse : () => void;
};

export const useCreatorSidebar = create<CreatorSidebatStore> ( (set) =>  ( {
    collapsed : false,
    onExpand : ()=> set( () => ({ collapsed : false }) ),
    onCollapse : ()=> set( () => ( { collapsed : true } ) )
} ) )