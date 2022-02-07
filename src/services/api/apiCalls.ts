import axios from  'axios';

const serverPath = 'http://localhost:3001/';

export const generalCallApi = async(method: string, customPath: string, body = {}, token: string = '') => {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    switch (method) {
        case 'Get':   
            axios.get( 
              serverPath+customPath,
              body
            ).then(data => {
                return data;
            }).catch(error => {
                console.log('error ts', error.request.response);
                return error;
            });    
        break;
        case 'Post':   
        const resp = await axios.post( 
          serverPath+customPath,
          body,
          config
        );

        return resp;
        /*.then(data => {
            return [true, data];
        }).catch(error => {
            console.log('error ts', error.request);
            return [false, error];
        });    
        */
    break;
    
        default:
            break;
    }

} 

