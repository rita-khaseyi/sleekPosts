import { getUsers } from "../utilities/utils";
import { useEffect, useState } from "react";
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
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;

    };

}
const useGetUsers = () => {
    const [users, setUsers] = useState<UserData[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await getUsers();
  
          // Check if the data is an array before updating the state
          if (Array.isArray(userData)) {
            setUsers(userData);
          } else {
            console.error("Received non-array data for users:", userData);
          }
        } catch (error) {
          console.error("Error fetching users", error);
        }
      };
  
      fetchData();
    }, []);
  
    return { users };
  };
  
  export default useGetUsers;