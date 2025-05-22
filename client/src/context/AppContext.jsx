import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext =createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()

    const [searchFilter ,setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)

    const [companyToken,setCompanyToken] = useState(null)
    const [companyData,setCompanyData] = useState(null)

    const [userData,setUserData] = useState(null)
    const [userApplications,setUserApplications] = useState([])



    const userRegister = async(userData)=>{
        try {
            const response = await fetch(backendUrl +'/api/users/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    //Function to fetch jobs

    const fetchJobs = async()=>{
        try {
            const {data} = await  axios.get(backendUrl +'/api/jobs')

                if (data.success) {
                    setJobs(data.jobs)
                    console.log(data.jobs);
                } else{
                    toast.error(data.message)
                }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

     
    //Function to fetch company data
    const fetchCompanyData = async () => {
       try {

        const {data} = await axios.get(backendUrl + '/api/company/company',{headers:{token:companyToken}})

        if (data.success) {
            setCompanyData(data.company)
            console.log(data);
        } else{
            toast.error(data.message)
        }
        
       } catch (error) {
           toast.error(error.message)
       }
    }

    //Function to Fetch User data
    const fetchUserData = async () => {
        try {
            const token = await getToken();
    
            console.log("Fetching user data with token:", token);
    
            const { data } = await axios.get(`${backendUrl}/api/users/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("User data received:", data);
    
            if (data.success) {
                setUserData(data.user);
                toast.success("User in the database");
            } else {
                toast.error("User not found in the database");
            }
        } catch (error) {
            console.log(error);
            
            toast.error("Error fetching user data");
        }
    };

    //Function to fetch user's applied applications data
    const fetchUserApplications = async () => {

        try {
            
            const token = await getToken()

            const {data} = await axios.get(backendUrl+'/api/users/user/applications',
                {headers: {Authorization : `Bearer ${token}`}}
            )

            if (data.success) {
                setUserApplications(data.applications)
            } else{
                toast.error("fetchUserApplications",data.message)
            }
        } catch (error) {
            console.log("error");
            
            toast.error(error.message)
        }
    }
    

    useEffect(()=>{
        fetchJobs()
        
        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    },[])

    useEffect(()=>{
        if (companyToken) {
            fetchCompanyData()
        }

    },[companyToken])

    useEffect (() =>{
        if (user ) {
            fetchUserData()
            fetchUserApplications()
        }

    },[user])

    const value ={
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs, setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        userData, setUserData,  
        backendUrl,
        userApplications,setUserApplications,
        fetchUserData,
        fetchUserApplications,
        userRegister
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}