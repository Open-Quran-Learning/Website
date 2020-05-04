
const YT_REGEX = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;

export const YouTubeThmbnailURL = (YT_URL) => {
    console.log(`https://img.youtube.com/vi/${YouTubeID(YT_URL)}/hqdefault.jpg`)
    return `https://img.youtube.com/vi/${YouTubeID(YT_URL)}/hqdefault.jpg`;
};

export const YouTubeID = (YT_URL) => {
    const matches = YT_URL.match(YT_REGEX)
    return matches ? matches[5] : "unknown";
};