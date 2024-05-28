import { Link } from 'react-router-dom';

import photo from '../assets/banner.jpg';
import './Home.css'

const Home = () => {
    console.log(photo); // Check the resolved path

    return (

        <div className='main'>
            <div className='imageParent'>
                <img src={photo} alt="Description of the photo" className='image' />
                <div className='imageText'>
                    <p>DISCOVER YOUR PATH TO SUCCESS WITH OUR COURSES</p>
                    <Link to="/login" className="singIn">Login</Link>

                </div>
            </div>
            <div className='text'>Effortlessly manage courses and assignments online</div>
            <div className="features">
                <div className="assignment">
                    submit assignments
                </div>
                <div className="session">
                    Engage in interactiive seassons
                </div>
            </div>
        </div>


    );
}

export default Home;
