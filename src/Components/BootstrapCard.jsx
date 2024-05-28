import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';



function BootstrapCard({ course }) {
    const onCourseClick = () => {
        console.log(course._id);
    }
    const cardStyle = {
        width: '18rem',
        margin: '2rem', // Add margin around each card
        backgroundColor: '#f9f9f9'
    };
    return (
        <Card style={cardStyle}>
            {/* <Card.Img variant="top" src={photoUrl} /> */}
            <Card.Body>
                <Card.Title>{course.courseName}</Card.Title>
                <Card.Title>Teacher: {course.name}</Card.Title>
                <Link to={`/course-details/${course._id}`}>
                    <Button variant="primary" style={{ backgroundColor: '#ccc', borderColor: 'black', color: 'black' }} onClick={onCourseClick}>
                        Course Details
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default BootstrapCard;