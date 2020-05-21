import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
      res => res,
      err => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    //function to clear the error.
    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler];
}




















// import { useState , use } from 'react';

// export default httpClient = {

//     const [error,setError] = useState(null);

//         //automatically generate error like network error..
//         /*i want this code to get executed as soon as components is 
//         created bcz it can check if igredients are nulll or not if yes then generate network error.*/
//         //so this can be done using constructor or componentwillmount not with componentdidmount bcz it get executed at last
//         //i want this to be called before child components are renderd 
//         //if we add/wrap this hoc with other components then this constructor is called again again again so need to unmount 
      
//             const reqInterceptor = httpClient.interceptors.request.use(req => {
//                 setError(null);
//                 return req;
//             });
//             const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
//                 setError(err)
//             }); 
            
    
//             //clean up work is happening here when interceptors gets changed .
//             useEffect(() => {
//                 return () => {
//                     httpClient.interceptors.request.eject(reqInterceptor);
//                     httpClient.interceptors.response.eject(resInterceptor);
//                 }
//             },[reqInterceptor,resInterceptor]);

//         const errorConfirmedHandler = () => {
//            setError(null);
//         }
//         return [error, errorConfirmedHandler];
// }