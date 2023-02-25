
const base = {top: 0, left: 0, width: 0, height: 0};

export const getRect = (id: string) =>{
    return document.getElementById(id)?.getBoundingClientRect() ?? base;
} 

export const getScreenRect = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    return { ...base, width: w, height: h };
};
