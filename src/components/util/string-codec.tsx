export function encodeBase64(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }
  
  export function decodeBase64(encoded: string): string {
    return decodeURIComponent(escape(atob(encoded)));
  }




  