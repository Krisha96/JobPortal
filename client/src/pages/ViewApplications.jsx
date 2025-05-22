import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(null)

  // Function to fetch company job applications data
  const fetchCompanyApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applications',
        { headers: { token: companyToken } }
      )
      console.log(data);
      if (data.success) {
        setApplicants(data.applications)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to Update Job Application Status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        fetchCompanyApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplications()
    }
  }, [companyToken])

  if (applicants === null) {
    return <Loading />
  }

  if (applicants.length === 0) {
    return (
      <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text-2xl'>No Applications Available</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>User Name</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left'>Resume</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant) => (
              <tr key={applicant._id} className='text-gray-700'>
                <td className='py-2 px-4 border-b text-center'>{applicants.indexOf(applicant) + 1}</td>
                <td className='py-2 px-4 border-b text-center flex items-center'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                  <span>{applicant.userId.name}</span>
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicant.jobId.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicant.jobId.location}</td>
                <td className='py-2 px-4 border-b'>
                  <a
                    href={applicant.userId.resume}
                    target='_blank'
                    rel="noopener noreferrer"
                    className='bg-blue-50 text-blue-600 px-4 py-2 rounded inline-flex items-center gap-2 hover:bg-blue-100 transition-colors'
                  >
                    <span className="max-w-[150px] truncate">{applicant.userId.resumeFileName || 'Resume'}</span>
                    <img src={assets.resume_download_icon} alt="Download" className="w-4 h-4" />
                  </a>
                </td>
                <td className='py-2 px-4 border-b relative'>
                  {applicant.status === 'Pending' ? (
                    <div className='relative inline-block text-left group'>
                      <button aria-label="Actions" className='text-gray-500 action-button'>...</button>
                      <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                        <button
                          onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                          className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                          className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>{applicant.status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
