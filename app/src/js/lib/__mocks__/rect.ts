
const base = {top: 0, left: 0, width: 600, height: 600};

export const getRect = (id: string) =>{
    return base;
} 

export const getScreenRect = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    return { ...base, width: w, height: h };
};