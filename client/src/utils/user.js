import {avatarColors} from "@/constants/user";

export function numberFromText(text) {
    // numberFromText("AA");
    const charCodes = text
        .split('') // => ["A", "A"]
        .map(char => char.charCodeAt(0)) // => [65, 65]
        .join(''); // => "6565"
    return parseInt(charCodes, 10);
}

export function getAvatarColor(name) {
    return avatarColors[numberFromText(name) % avatarColors.length]
}