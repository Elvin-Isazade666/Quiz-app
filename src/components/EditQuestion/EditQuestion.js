import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import "./EditQuestion.css";
import {useFormik} from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    text : Yup.string().required("Sual bos buraxila bilmez"),
    answerOption : Yup.string().required("Cavab bos buraxila bilmez"),
    score : Yup.number().min(1).max(20).integer().required("Xal bos buraxila bilmez"),
    time : Yup.number().integer().min(1).max(20).required("Vaxt bos buraxila bilmez"),
    options : Yup.array().of(Yup.object().shape({
        value : Yup.string().required("Secimler bos buraxila bilmez")
    })).required("Require-field")
})


const EditQuestion = ({setQuestionData,questionData,getQuestionData}) => {
    const formik = useFormik({
        initialValues : {
            text : "",
            answerOption: "",
            score : "",
            time : "",
            options : [
                {
                    "value" : ""
                },
                {
                    "value" : ""
                },
                {
                    "value" : ""
                }
            ]
            // enableReinitialize : true
        },
        validationSchema : validationSchema,
        onSubmit : async (values) => {
            await axios.put(`http://localhost:3000/questions/${id}`, formik.values)
            getQuestionData();
            navigate("/quizList");
        }
    })
    // const [editQuestion,setEditQuestion] = useState({
    //     text : "",
    //     answerOption: "",
    //     score : "",
    //     options : [],
    //     time : "",
    // })

    const navigate = useNavigate();
    // const {text,answerOption,score,options,time} = editQuestion;

    const {id} = useParams();

    // console.log(id);

    const getChoosingQuestion = async (id)=>{
        const selectQuestion = await axios.get(`http://localhost:3000/questions/${id}`)
        // formik.initialValues(selectQuestion.data)
        formik.setValues(selectQuestion.data,true)
        // setEditQuestion(selectQuestion.data);
    }

    const handlerInputChange = (name,value,isOption=false,dataAttribute)=>{
        if(!isOption){
            formik.setFieldValue(name,value);
        }else{
            const newOption = formik.values.options;
            newOption[dataAttribute.dataset.index] = {value}
            formik.setFieldValue("options",newOption)
        }
        // setEditQuestion({...editQuestion,[name] : value})
    }

    useEffect(()=>{
        getChoosingQuestion(id);
    },[])

    // const handleEditSubmit = async (e) => {

    //     e.preventDefault();
    //     await axios.put(`http://localhost:3000/questions/${id}`, editQuestion);
    //     getQuestionData();
    //     navigate("/quizList");
    
    // }
    // console.log(questionData);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //         await axios.put(`http://localhost:3000/questions/${id}`, formik.values)
    //         getQuestionData();
    //         navigate("/quizList");
    // }

    return (
        <div className='edit-wrapper'>
            <h1>Suali duzenle</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="question_wrapper_input">
                    <label htmlFor="">Question</label>
                    <input type="text" value={formik.values.text} name="text" onChange={(e)=>handlerInputChange(e.target.name,e.target.value)} />
                    {
                        (formik.errors.text && formik.touched.text) && <p style={{color:"red"}}>{formik.errors.text}</p>
                    }
                </div>
                <div className="question_wrapper_input">
                    <label htmlFor="">Answer</label>
                    <input type="text" value={formik.values.answerOption} name="answerOption" onChange={(e)=>handlerInputChange(e.target.name,e.target.value)} />
                    {
                        (formik.errors.answerOption && formik.touched.answerOption) && <p style={{color:"red"}}>{formik.errors.answerOption}</p>
                    }
                </div>
                <div className="question_wrapper_input">
                    <label htmlFor="" style={{marginBottom: "5px"}}>
                        Variantlar : 
                    </label>
                    <div className='option_wrapper'>
                        <div className='option_list'>
                            <input
                                data-index={0}
                                className='option_input'
                                placeholder='Secim 1'
                                type="text"
                                name='option'
                                onBlur={formik.handleBlur}
                                onChange={(e) => handlerInputChange(e.target.name, e.target.value, true, e.target)}
                                value={formik.values.options[0]?.["value"]}
                                id="option_1"
                            // onChange={optionChange}
                            />
                            {
                                (formik.touched?.option && formik.errors.options?.[0]?.value) && <p style={{ color: "red" }}>{formik.errors.options?.[0]?.value}</p>
                            }
                        </div>
                        <div className='option_list'>
                            <input
                                data-index={1}
                                className='option_input'
                                placeholder='Secim 2'
                                type="text"
                                name='option'
                                onBlur={formik.handleBlur}
                                onChange={(e) => handlerInputChange(e.target.name, e.target.value, true, e.target)}
                                value={formik.values.options[1]?.["value"]}
                                id="option_2"
                            // onChange={optionChange}
                            />
                            {
                                (formik.touched?.option && formik.errors.options?.[1]?.value) && <p style={{ color: "red" }}>{formik.errors.options?.[1]?.value}</p>
                            }
                        </div>
                        <div className='option_list'>
                            <input
                                data-index={2}
                                className='option_input'
                                placeholder='Secim 3'
                                type="text"
                                name='option'
                                onBlur={formik.handleBlur}
                                onChange={(e) => handlerInputChange(e.target.name, e.target.value, true, e.target)}
                                value={formik.values.options[2]?.["value"]}
                                id="option_3"
                            // onChange={optionChange}
                            />
                            {
                                (formik.touched?.option && formik.errors.options?.[2]?.value) && <p style={{ color: "red" }}>{formik.errors.options?.[2]?.value}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="question_wrapper_input">
                    <label htmlFor="">Score</label>
                    <input type="number" value={formik.values.score} name="score" onChange={(e)=>handlerInputChange(e.target.name,e.target.value)} />
                    {
                        (formik.errors.score && formik.touched.score) && <p style={{color:"red"}}>{formik.errors.score}</p>
                    }
                </div>
                <div className="question_wrapper_input">
                    <label htmlFor="">Time</label>
                    <input type="number" value={formik.values.time} name="time" onChange={(e)=>handlerInputChange(e.target.name,e.target.value)} />
                    {
                        (formik.errors.time && formik.touched.time) && <p style={{color:"red"}}>{formik.errors.time}</p>
                    }
                </div>
                
                    <button type='submit' className='edit-button-each' >
                        Edit question
                    </button>
                
            </form>
        </div>
    )
}

export default EditQuestion