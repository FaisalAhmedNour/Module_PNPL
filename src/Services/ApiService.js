import BaseService from './BaseService'

const ApiService = {
    async fetchData({url, method, data}) {
        console.log('rendering', url)
        return await window.engine.Proxy(url, method, data);
        // return 
        // console.log(result)
    //     return new Promise((resolve, reject) => {
    //         BaseService(param)
    //             .then((response) => {
    //                 resolve(response)
    //             })
    //             .catch((errors) => {
    //                 reject(errors)
    //             })
    //     })
    },
}

export default ApiService
