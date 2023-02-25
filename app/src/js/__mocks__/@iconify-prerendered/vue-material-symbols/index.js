// import { createElementVNode } from 'vue';
const v = require("vue");
// const _ = jest.createMockFromModule("@iconify-prerendered/vue-material-symbols/index");


const IconAdd = p=>v.createElementVNode('svg',{"aria-hidden":true,"role":"img","innerHTML":"<path fill=\"currentColor\" d=\"M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z\"/>","width":"1em","height":"1em","viewBox":"0 0 24 24",...p},null,16);
const IconCenterFocusWeakOutline = p=>v.createElementVNode('svg',{"aria-hidden":true,"role":"img","innerHTML":"<path fill=\"currentColor\" d=\"M5 21q-.825 0-1.413-.587Q3 19.825 3 19v-4h2v4h4v2Zm10 0v-2h4v-4h2v4q0 .825-.587 1.413Q19.825 21 19 21Zm-3-5q-1.65 0-2.825-1.175Q8 13.65 8 12q0-1.65 1.175-2.825Q10.35 8 12 8q1.65 0 2.825 1.175Q16 10.35 16 12q0 1.65-1.175 2.825Q13.65 16 12 16Zm0-2q.825 0 1.413-.588Q14 12.825 14 12t-.587-1.413Q12.825 10 12 10q-.825 0-1.412.587Q10 11.175 10 12q0 .825.588 1.412Q11.175 14 12 14ZM3 9V5q0-.825.587-1.413Q4.175 3 5 3h4v2H5v4Zm16 0V5h-4V3h4q.825 0 1.413.587Q21 4.175 21 5v4Zm-7 3Z\"/>","width":"1em","height":"1em","viewBox":"0 0 24 24",...p},null,16);
const IconDeleteOutlineRounded = p=>v.createElementVNode('svg',{"aria-hidden":true,"role":"img","innerHTML":"<path fill=\"currentColor\" d=\"M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6q-.425 0-.713-.287Q4 5.425 4 5t.287-.713Q4.575 4 5 4h4q0-.425.288-.713Q9.575 3 10 3h4q.425 0 .713.287Q15 3.575 15 4h4q.425 0 .712.287Q20 4.575 20 5t-.288.713Q19.425 6 19 6v13q0 .825-.587 1.413Q17.825 21 17 21ZM7 6v13h10V6Zm2 10q0 .425.288.712Q9.575 17 10 17t.713-.288Q11 16.425 11 16V9q0-.425-.287-.713Q10.425 8 10 8t-.712.287Q9 8.575 9 9Zm4 0q0 .425.288.712q.287.288.712.288t.713-.288Q15 16.425 15 16V9q0-.425-.287-.713Q14.425 8 14 8t-.712.287Q13 8.575 13 9ZM7 6v13V6Z\"/>","width":"1em","height":"1em","viewBox":"0 0 24 24",...p},null,16);

module.exports = { IconAdd, IconCenterFocusWeakOutline, IconDeleteOutlineRounded };

