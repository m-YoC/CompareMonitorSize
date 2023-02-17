import { resetToKeyboardData } from "../state/items/preset";
import { KeyboardList } from "../state/items/keyboard_list";

export const getOtherItem = (str: string) => {
    return KeyboardList.find(s => s.nameStr === str);
}

