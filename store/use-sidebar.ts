import { create } from "zustand";

interface SidebatStore {
    collapsed : boolean;
    onExpand: () => void;
    onCollapse : () => void;
};

export const useSidebar = create<SidebatStore> ( (set) =>  ( {
    collapsed : false,
    onExpand : ()=> set( () => ({ collapsed : false }) ),
    onCollapse : ()=> set( () => ( { collapsed : true } ) )
} ) )