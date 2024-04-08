/*
Example script to get the value of a specific cookie, put value in the request header and remove this cookie again.
https://techdocs.akamai.com/edgeworkers/docs/cookies
*/
import { Cookies } from 'cookies';

const cookieToRemove: string = 'testcookie'
const headerName: string = 'cookie-value'

// Only making changes when request is going to origin
export async function onOriginRequest(request: EW.IngressOriginRequest) {

    // new cookies object from the cookie header
    let cookies = new Cookies(request.getHeader('Cookie'))

    /*
    Check if we have a cookie header, if so, check if our specific cookie exists
    And if there, add it to our request header and remove that specific cookie.
    */
    if (cookies !== undefined) {
        var cookieValue = cookies.get(cookieToRemove)

        if (cookieValue !== undefined) {
            request.addHeader(headerName, cookieValue)

            // delete cookie from cookie object and push to request header again using correct format.
            cookies.delete(cookieToRemove);
            request.setHeader('cookie', cookies.toHeader());
        }
    } 
}
