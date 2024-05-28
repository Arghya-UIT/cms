import React, { useEffect, useState } from 'react';
import BootstrapCard from '../Components/BootstrapCard';
import './Courses.css';

const Courses = () => {
    const [coursesData, setCoursesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses data');
                }
                const data = await response.json();
                console.log(data);
                setCoursesData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses data:', error);
                setLoading(false);
            }
        };

        fetchCoursesData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
   

    return (
        <div className='courses-main'>
            <div className="course-heading">
                Courses
            </div>
            {coursesData.map((course, index) => (
                // console.log(course),
                <BootstrapCard key={index} course={course} />
            ))}
        </div>
    );
}

export default Courses;
