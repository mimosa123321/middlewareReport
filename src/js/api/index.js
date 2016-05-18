import {Promise} from 'es6-promise-polyfill';
import $ from 'jquery';

export default {
    getData(url) {
        return new Promise( (resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('GET',url);

            req.onload = () => {
                if (req.status === 200) {
                    // Resolve the promise with the response text
                    resolve(req.response);
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                	console.log(req);
                    reject(Error(req.statusText));
                }
            };

            req.onerror = () => {
                reject(Error('Network Error'));
            };

            // Make the request
            req.send();
        })
    }
}

