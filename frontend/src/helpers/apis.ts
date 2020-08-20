import {isEmpty} from 'lodash';

const apis = {
    /**
     * API to call data
     * @param url
     * @param data
     * @param method
     * @param headers
     * @param requestOptions
     * @returns {Promise<Promise>}
     */
    callApi: (url: any, data: object = {}, method = 'GET', headers = {'content-type': 'application/json'}, requestOptions = {"responseJson": true}, responseStatus = true): Promise<unknown> => {
        let options = {
            headers: headers,
            method: method,
            body:''
        };
        if (!isEmpty(data)) {
            options.body = JSON.stringify(data);
        }
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(res => {
                    res.text().then(respText => {
                        if (responseStatus) {
                            const respJson = respText.length ? JSON.parse(respText) : {};
                            resolve(respJson);
                        }
                        reject(respText);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default apis;