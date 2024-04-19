/*
Example script to get the value of a specific cookie, put value in the request header and remove this cookie again.
https://techdocs.akamai.com/edgeworkers/docs/cookies
*/
import { Cookies } from "cookies";

// our list of cookies we want to remove and add the value to outgoing request header to origin
const cookieList: { [key: string]: string } = {
  AccessToken: "x-sombrero-auth",
  BCSessionID: "x-sombrero-personalization",
  optimizelyEndUserId: "x-sombrero-optimization",
  "customer-webshop-cart": "x-retail-shopping-cart",
};

/*
Only making changes when request is going to origin
https://techdocs.akamai.com/edgeworkers/docs/event-handler-functions#onoriginrequest
*/
export async function onOriginRequest(request: EW.IngressOriginRequest) {
  // lookup cookie header, undefined if it doesn't exist.
  const cookieHeader: string[] = request.getHeader("Cookie");

  /*
    Check if we have a cookie header valie, if so, create Cookie object and match against our cookie list.
    And if an entry exists, add it to our request header and remove that specific cookie.
  */
  if (cookieHeader !== undefined) {
    const cookies = new Cookies(cookieHeader);

    // loop through our list of cookies we want to remove
    for (const cookieName in cookieList) {
      // get the cookie based on the key of our cookieList
      const cookieValue = cookies.get(cookieName);

      // if it exists add value of the cookie to the extra header
      if (cookieValue !== undefined) {
        request.addHeader(cookieList[cookieName], cookieValue);

        // delete cookie from cookie object
        cookies.delete(cookieName);
      }
    }
    // last but not least, cleanup and set our cookie header
    request.setHeader("cookie", cookies.toHeader());
  }
}
