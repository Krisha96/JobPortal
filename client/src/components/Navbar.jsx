import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Navbar() {
    const { openSignIn, signIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const { setShowRecruiterLogin, userRegister } = useContext(AppContext)

    useEffect(() => {
        // Register user in our backend when Clerk authentication is successful
        if (user) {
            // Extract username from email if name is null
            const email = user.primaryEmailAddress.emailAddress;
            const name = user.firstName || email.split('@')[0]; // Use email username if firstName is null
            
            const userData = {
                _id: user.id,
                name: name,
                email: email,
                createdAt: user.createdAt,
                image: user.imageUrl,
            };
            
            console.log('Clerk User Data:', userData);
            
            // Register user in our backend
            userRegister(userData).catch(error => {
                console.error('Error registering user:', error);
            });
        }
    }, [user]);

    const handleSignIn = async () => {
        try {
            console.log('Opening Clerk Sign In...');
            await openSignIn();
        } catch (error) {
            console.error('Clerk Sign In Error:', error);
        }
    }

    // Format display name for the navbar
    const getDisplayName = () => {
        if (!user) return '';
        return user.firstName || user.primaryEmailAddress.emailAddress.split('@')[0];
    }

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={()=> navigate('/')} className ="w-25 h-12 cursor-pointer"src={assets.logo} alt="" />
                {
                    user
                    ?<div className='flex items-center gap-3'>
                        <Link to ={'/applications'}>Applied Jobs</Link>
                        <p>|</p>
                        <p className='max-sm:hidden'>Hi, {getDisplayName()}</p>
                        <UserButton />
                    </div>
                    :<div className='flex gap-4 max-sm:text-xs'>
                    <button onClick={e=> setShowRecruiterLogin(true)} className='text-gray-600' > Recruiter Login</button>
                    <button onClick={handleSignIn} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'> Login</button>
                     </div>
                
                }
            </div>
        </div>
    )
}

export default Navbar