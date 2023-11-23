export const getPosts= async()=>{
    const url ='api/get-posts'
    try{
        const response = await fetch(url)
        const result = await response.json();
        return result;
    }
    catch(error:any){
        return error.message
    }
}
export const getUsers= async()=>{
    const url ='https://jsonplaceholder.typicode.com/users'
    try{
        const response = await fetch(url)
        const result = await response.json();
        return result;
    }
    catch(error:any){
        return error.message
    }
}