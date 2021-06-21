/**
 * Retuns the "v" paramater from a youtube url
 * @param link 
 * @returns 
 */
const getVideoID = (link: string): string => {
    const parsed = new URL(link);
    const id = parsed.searchParams.get('v')
    if(!id) new TypeError("Given URL has no paramater");
    return id
}

export { getVideoID }