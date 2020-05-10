
const YT_REGEX = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;

export const YouTubeThmbnailURL = (YT_URL) => {
    console.debug(`https://img.youtube.com/vi/${YouTubeID(YT_URL)}/hqdefault.jpg`)
    return `https://img.youtube.com/vi/${YouTubeID(YT_URL)}/hqdefault.jpg`;
};

export const YouTubeID = (YT_URL) => {
    const matches = YT_URL.match(YT_REGEX)
    return matches ? matches[5] : "unknown";
};

export const isBlankObject = (obj) => Object.values(obj).filter((it) => it != undefined && it != null && it != "").length == 0;

export const userIsSure = (msg = "هل أنت متأكد؟") => window.confirm(msg); 