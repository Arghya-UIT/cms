import React, { useEffect, useState } from 'react';
import CourseAssignment from './CourseAssignment';
import './CourseItem.css'

const CourseItem = ({ CourseItem }) => {
    const [allAssignments, setAllAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/course-details/courseItem/${CourseItem.courseId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch course data');
                }

                const data = await response.json();
                setAllAssignments(data.assignments || []); // Assume data contains 'assignments' key
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course data:', error);
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [CourseItem.courseId]);

    console.log('allanm ', allAssignments);

    return (
        <div>
            <div className="fields">
                <p>Name: {CourseItem.courseName}</p>
                <p>Teacher: {CourseItem.teacherName}</p>
                <div className="assignments">
                    {loading ? (
                        <div>Loading...</div>
                    ) : allAssignments.length === 0 ? (
                        <div>No assignments found</div>
                    ) : (
                        allAssignments.map((assignment) => (
                            <CourseAssignment key={assignment.assignmentId} assignment={assignment} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseItem;
