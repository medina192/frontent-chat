import axios from  'axios';

//const serverPath = 'http://localhost:3001/';s
//const serverPath = 'http://161.35.224.248:3001/';
const serverPath = 'http://137.184.224.194:3001';


export const generalCallApi = async(method: string, customPath: string, body = {}, token: string = '') => {

    const config = {
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}` }
    };

    console.log('path', serverPath+customPath)
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

