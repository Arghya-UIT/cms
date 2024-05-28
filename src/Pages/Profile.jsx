import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import StudentProfile from './StudentProfile';
import TeacherProfile from './TeacherProfile';


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') // Send token in header
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        // console.log(data);
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data found</div>;
  }

  return (

    <div>
      {profileData.role === 'student' ? <StudentProfile profileData={profileData} /> : <TeacherProfile profileData={profileData} />}
    </div>
  );
};

export default Profile;
