import React, { useState, useRef, useEffect } from 'react';
import "./Race.css";
import { Link } from 'react-router-dom';

const Reace = ({ questionData }) => {


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctQuestion, setCorrectQuestion] = useState(0);
    const [falseQuestion, setFalseQuestion] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [remainTime, setRemainTime] = useState(null);
    const [timeSwitchOff, settimeSwitchOff] = useState(false);


    const infoResult = localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : []


    const [info, setInfo] = useState(infoResult);


    const buttonRef = useRef(null);

    useEffect(() => {
        if (currentQuestion === 0 && questionData?.length > 0) {
            setRemainTime(questionData[currentQuestion].time);
        };
    }, [questionData,currentQuestion]);


    useEffect(() => {
        if (!timeSwitchOff) {
            if (remainTime !== 0) {
                timer = setInterval(() => {
                    setRemainTime(remainTime - 1);
                }, 1000)
            } else {
                clearInterval(timer);
                setFalseQuestion(falseQuestion +1);
                let _currentQuestion = currentQuestion + 1;
                if (currentQuestion < questionData?.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    settimeSwitchOff(false);
                    let timeout = questionData[_currentQuestion].time;
                    setRemainTime(timeout);
                }
            }
        } else {
            clearInterval(timer);
        }
        localStorage.setItem("info", JSON.stringify(info))

        return () => {
            clearInterval(timer);
        }
    }, [timeSwitchOff, remainTime, info]);

    let timer = null;

    const getTimeNow = () => {
        const date = new Date();
        const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        return currentDate;
    };

    const handleShowResult = () => {
        setShowResult(true);
        setInfo([{ "questionCount": questionData.length, "trueAnswer": correctQuestion, "falseAnswer": falseQuestion, "total": totalPoint, "date": getTimeNow() }, ...infoResult])
    }

    const handleCorrectAnswer = (e) => {
        const answer = e.target
        const userChoose = e.target.textContent;
        if (userChoose === questionData[currentQuestion].answerOption) {
            answer.classList.add("correct")
            setCorrectQuestion(correctQuestion + 1);
            setTotalPoint(totalPoint + Number(questionData[currentQuestion].score));
        } else {
            answer.classList.add("false");
            setFalseQuestion(falseQuestion + 1);
        }
        setClicked(true)
        settimeSwitchOff(true)
    }

    const handleNextQuestion = () => {
        try {
            for (let i = 0; i < buttonRef.current.children.length; i++) {
                buttonRef.current.children[i].classList.remove("false")
                buttonRef.current.children[i].classList.remove("correct");
            }
            setClicked(false);
            if (currentQuestion < questionData.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                settimeSwitchOff(false);
                let timeout = questionData[currentQuestion].time;
                setRemainTime(timeout);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {
                showResult ? (
                    <div className='result-wrapper'>
                        <h2 className="last-result-header">Son 10 Nəticəm:</h2>
                        <table className="result-table">
                            <thead className="result-table-header">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Sualların sayı</th>
                                    <th scope="col">Doğru Cavab</th>
                                    <th scope="col">Yanlış Cavab</th>
                                    <th scope="col">Toplam Bal</th>
                                    <th scope="col">Yaradilib</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    info.slice(0, 10)?.map((eachInfo, index) => (
                                        <tr key={index}>
                                            <th scope="col">{index + 1}</th>
                                            <td>{eachInfo.questionCount}</td>
                                            <td>{eachInfo.trueAnswer}</td>
                                            <td>{eachInfo.falseAnswer}</td>
                                            <td>{eachInfo.total}</td>
                                            <td>{eachInfo.date}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="back-home"><Link className="back-home-link" to="/">Back to Home Page</Link></div>
                    </div>)
                    : (<div className='race-wrapper'>
                        <h3 className='third'>Sual: {`${currentQuestion + 1} / ${questionData?.length}`} </h3>
                        <div className="question-wrapper">
                            {
                                remainTime !== null ? (
                                    <div className="time-wrapper">
                                        {`00 : ${remainTime?.toString().length === 1 ? String(0) + remainTime : remainTime} `}
                                    </div>
                                ) : null
                            }
                            <div className="question-title">
                                <h3>{questionData[currentQuestion]?.text}</h3>
                            </div>
                            <div className="question-content" ref={buttonRef}>
                                {
                                    questionData?.[currentQuestion]?.options?.map((option, index) => {
                                        return <button className="question-button" key={index} onClick={(e) => handleCorrectAnswer(e)} disabled={clicked}>
                                            {option.value}
                                        </button>
                                    })
                                }
                            </div>
                            <div className="question-bottom">
                                {
                                    questionData.length - (currentQuestion + 1) === 0 ? <button className='next-button' onClick={handleShowResult}>
                                        Result
                                    </button> : <button className='next-button' onClick={handleNextQuestion}>
                                        Next Question
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    )
            }
        </div>
    )
}

export default Reace