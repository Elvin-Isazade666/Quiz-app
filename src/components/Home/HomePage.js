import React from 'react';
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import "./HomePage.css"
const HomePage = () => {
    return (
        <div>
            <Header />
            <div className="quiz-start">
                <div className="quiz_center">
                    <h2>Yarisa xos gelmisen!</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil sint quisquam debitis alias. Tempora tempore, vero modi quisquam veritatis officia debitis, qui, placeat iste consequuntur minus recusandae voluptates voluptas est?10</p>
                    <Link className='start_button' to={"/race"}>
                        Start
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage