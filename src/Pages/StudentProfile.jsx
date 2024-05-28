import React, { useEffect, useState } from 'react';
import CourseItem from '../Components/CourseItem';
import './StudentProfile.css'

const StudentProfile = ({ profileData }) => {
	const course_id = profileData.course_id;
	const [allCourses, setallCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchallCoursesData = async () => {
			try {
				const response = await fetch(`http://localhost:3000/profile/student-courses`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('token')
					}
				});

				if (!response.ok) {
					throw new Error('Failed to fetch profile data');
				}

				const data = await response.json();
				setallCourses(data.students); // Update to access students array
				setLoading(false);
			} catch (error) {
				console.error('Error fetching profile data:', error);
				setLoading(false);
			}
		};

		fetchallCoursesData();
	}, [course_id]);

	// Log allCourses inside useEffect to see the updated value
	useEffect(() => {
		console.log("allCourses ", allCourses);
	}, [allCourses]);

	// Ensure allCourses has been set before rendering
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='student-p-main'>
			<h1>Welcome, {profileData.name}</h1>
			<p>Email: {profileData.email}</p>
			<p> Date of Birth: {profileData.dob}</p>
			<p>Address: {profileData.address}</p>

			<h1>All Courses</h1>

			{allCourses.length > 0 ? (
                allCourses.map((course, index) => (
					console.log('this ',course),
					<CourseItem key={index} CourseItem={course} />
                ))
            ) : (
                <div>No course found</div>
            )}
		</div>
	)
}

export default StudentProfile