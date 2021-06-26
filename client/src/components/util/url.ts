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

/**
 * Checks if its a url or not
 * @param str 
 * @returns 
 */
const validateURL = (str: string) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // Protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // Domain
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // IP v4
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // Port and Path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // Query Strings
    '(\\#[-a-z\\d_]*)?$','i'); // Fragment Locator
  return !!pattern.test(str);
}

export { getVideoID, validateURL }