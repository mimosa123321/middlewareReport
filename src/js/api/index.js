import {Promise} from 'es6-promise-polyfill';

export default {
    getAirports(url, cb) {
    	console.log("2="+url);
        this.getData(url).then((response) => {
        	console.log(response);
            cb(JSON.parse(response));
        });
    },

    getSystemAnalytics(url) {
        return this.getData(url);
    },

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
