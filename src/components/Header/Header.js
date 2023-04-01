import React from 'react';
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <div className='header'>
            <ul className='header_wrapper'>
                <li className='header_list'>
                    <Link className='header_link' to={"/"}>
                        Home
                    </Link>
                </li>
                <li className='header_list'>
                    <Link className='header_link' to={"/quizList"}>
                        Admin
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Header