import { getUsers } from "../utilities/utils";
import { useEffect,useState } from "react";
interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    
    };
    phone:string;
    website:string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
       
      };

  }
const useGetUsers=()=>{
    const [users, setUsers]=useState<UserData[]>([]);
    useEffect(()=>{
      (async()=>{
        const users=await getUsers();
        setUsers(users);        
      })();
    },[])
    return {users}
  
  
}
export default useGetUsers