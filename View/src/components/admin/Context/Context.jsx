import { createContext, useState } from "react";
export const modelContext= createContext(null);
export const ModelProvider=(props)=>{
    const [model,setModel]=useState(
        {
            modelName:'',
            factName:'',
            image:'',
            component:[],
        miscellinous:[]  
        }
    );
    

    return <modelContext.Provider value={{model,setModel}}>{props.children}</modelContext.Provider>
}
