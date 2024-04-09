/*
Example script to get the value of a specific cookie, put value in the request header and remove this cookie again.
https://techdocs.akamai.com/edgeworkers/docs/cookies
*/
import { Cookies } from 'cookies';

// our list of cookies we want to remove and add the value to outgoing request header to origin
const cookieList: { [key: string]: string } = {
    "AccessToken": "x-sombrero-auth",
    "BCSessionID": "x-sombrero-personalization"
}

// Only making changes when request is going to origin
export async function onOriginRequest(request: EW.IngressOriginRequest) {

    // new cookies object from the cookie header
    let cookies = new Cookies(request.getHeader('Cookie'))

    /*
    Check if we have a cookie header, if so, check if our specific cookie exists
    And if there, add it to our request header and remove that specific cookie.
    */
    if (cookies !== undefined) {

        // loop through our list of cookies we want to remove
        for (const cookieName in cookieList) {
            
            // get the cookie based on the key of our cookieList
            var cookieValue = cookies.get(cookieName)

            // if it exists add value of the cookie to the extra header
            if (cookieValue !== undefined) {
                request.addHeader(cookieList[cookieName], cookieValue)

            // delete cookie from cookie object
            cookies.delete(cookieName)
            }
        }
        // last but not least set and cleanup our cookie header
        request.setHeader('cookie', cookies.toHeader());
    } 
}
