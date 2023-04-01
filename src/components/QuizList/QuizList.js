import React, { useState,useEffect } from 'react'
import Header from '../Header/Header';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import "./QuizList.css";
import Button from '@mui/material/Button';
import ReactPaginate from "react-paginate";
import axios from 'axios';

const QuizList = ({ questionData, getQuestionData,setShowQuestionList,showQuestionList }) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // const [showQuestionList,setShowQuestionList] = useState(false);
    const itemsPerPage = 2;

    const deleteQuestion = async (id) => {
        await axios.delete("http://localhost:3000/questions" + "/" + id)
        getQuestionData();
        if(currentItems.length ===1){
            if(itemOffset !==0){
                setShowQuestionList(false)
                setItemOffset(prevState => prevState -2)
            }
        }
        if(questionData.length ===1){
            setShowQuestionList(true);
        }
        
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(questionData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(questionData.length / itemsPerPage));
        
    }, [itemOffset, itemsPerPage,questionData]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % questionData.length;
        setItemOffset(newOffset);
    };

    return (
        <>
        {
            showQuestionList ? (
            <div>
                <Header />
                <div className="container">
                    <Link className='create_table' to={"/createQuiz"}>
                        <Button variant="contained">Yenisini yarat</Button>
                    </Link>
                    <p className='no-question'>Sual yoxdur</p>
                </div>
            </div>
        
            ) : <div>
            <Header />
            <div className="container">
                <Link className='create_table' to={"/createQuiz"}>
                    <Button variant="contained">Yenisini yarat</Button>
                </Link>
                <table className='table_wrapper'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sual</th>
                            <th>Cavab</th>
                            <th>Vaxt</th>
                            <th>Score</th>
                            <th>Emeliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems?.map((quiz, index) => (
                                <tr key={index} className="center_text_wrapper">
                                    <th>{quiz.id}</th>
                                    <td className='center_text'>{quiz.text}</td>
                                    <td className='center_text'>{quiz.answerOption}</td>
                                    <td className='center_text'>{quiz.time}</td>
                                    <td className='center_text'>{quiz.score}</td>
                                    <td className='center_text'>
                                        <Link to={`/editQuestion/${quiz.id}`}>
                                            <button className='button-edit'>
                                                <AiOutlineEdit className='edit' />
                                            </button>
                                        </Link>
                                        <Link>
                                            <button className='button-delete'>
                                                <AiFillDelete className='delete' onClick={() => deleteQuestion(quiz.id)} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"<Previous"}
                    nextLabel={"Next >"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={6}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    activeClassName='active'
                />
            </div>
        </div>
        }
        </>
        

    )
}

export default QuizList