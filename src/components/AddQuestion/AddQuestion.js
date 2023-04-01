import "./AddQuestion.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
    text: Yup.string().required("Sual bos buraxila bilmez"),
    // option_1: Yup.string().required("Variant 1 bos buraxila bilmez"),
    // option_2: Yup.string().required("Variant 2 bos buraxila bilmez"),
    // option_3: Yup.string().required("Variant 3 bos buraxila bilmez"),
    options: Yup.array()
        .of(
            Yup.object().shape({
                value: Yup.string().required("Secimler bos buraxila bilmez"),
            })
        )
        .required("required-field"),
    answerOption: Yup.string().required("Cavab bos buraxila bilmez"),
    time: Yup.number().integer().min(2).max(20).positive().required("Vaxt doldurulmalidir"),
    score: Yup.number().integer().min(2).max(20).positive().required("Bal doldurulmalidir"),

})


const AddQuestion = ({ questionData, setQuestionData,setShowQuestionList }) => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            text: "",
            // option_1: "",
            // option_2: "",
            // option_3: "",
            options: [
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
            ],
            answerOption: "",
            time: "",
            score: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await axios.post("http://localhost:3000/questions", values);
            setQuestionData([...questionData, response.data])
            navigate("/quizList");
        },
    });

    // const [addQuestion, setAddQuestion] = useState({
    //     text: "",
    //     answerOption: "",
    //     score: "",
    //     options: [],
    //     time: "",
    // })
    // console.log(questionData);

    // const [question,setQuestion] = useState("");
    // const [scoreValue,setScoreValue] = useState("");
    // const [timeValue,setTimeValue] = useState("");

    // const { text, answerOption, score, options, time } = addQuestion

    // const questionChange = (e)=>{
    //     console.log(e.target.value);
    //     console.log(e.target.name);
    //     setQuestion(e.target.value)
    //     setAddQuestion({...addQuestion, text : question })
    // }

    // const timeChange = (e) =>{
    //     setTimeValue(e.target.value);
    //     setAddQuestion({...addQuestion, time : timeValue})
    // }

    // const scoreChange = (e) =>{
    //     setScoreValue(e.target.value);
    //     setAddQuestion({...addQuestion,score: scoreValue})
    // }

    // const optionChange = (e)=>{
    //     const newOption = options;
    //     newOption[e.target.dataset.index] = e.target.value
    //     setAddQuestion({...addQuestion, options : newOption})
    // }

    const handleChange = (name, value, isOption = false, dataAttribute) => {
        if (!isOption) {
            formik.setFieldValue(name, value);
            // setAddQuestion({ ...addQuestion, [name]: value })
        } else {
            const newOption = formik.values.options;
            newOption[dataAttribute.dataset.index] = {
                value
            };
            formik.setFieldValue("options", newOption);
            // setAddQuestion({ ...addQuestion, options: newOption })
        }
    };

    // const clear = () => {
    //     setAddQuestion({
    //         text: "",
    //         answerOption: "",
    //         score: "",
    //         options: [],
    //         time: "",
    //     })
    // }

    // const submit = async (e) => {
    //     e.preventDefault();

    //     const response = await axios.post("http://localhost:3000/questions", addQuestion)
    //     setQuestionData([...questionData, response.data])
    //     navigate("/quizList")

    // }

    // const selectChange = (e) => {
    //     console.log(e.target.value);
    //     setAddQuestion({ ...addQuestion, answerOption: e.target.value })
    // }


    return (
        <div className='add_question'>
            <h1>Sual yarat</h1>
            <form className='add_form' onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="text">Sual:</label>
                    <br />
                    <input type="text"
                        id='text'
                        name='text'
                        className='question_input'
                        placeholder='Sual'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.text}
                    />
                    {
                        (formik.errors.text && formik.touched.text) && <p style={{ color: "red" }}>{formik.errors.text}</p>
                    }
                </div>

                <label htmlFor="">
                    Variantlar:
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
                            onChange={(e) => handleChange(e.target.name, e.target.value, true, e.target)}
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
                            onChange={(e) => handleChange(e.target.name, e.target.value, true, e.target)}
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
                            onChange={(e) => handleChange(e.target.name, e.target.value, true, e.target)}
                            value={formik.values.options[2]?.["value"]}
                            id="option_3"
                        // onChange={optionChange}
                        />
                        {
                            (formik.touched?.option && formik.errors.options?.[2]?.value) && <p style={{ color: "red" }}>{formik.errors.options?.[2]?.value}</p>
                        }
                    </div>
                </div>
                <div className="correct-wrapper">
                    <label htmlFor="answerOption">Correct Answer:</label> <br />

                    <select name="answerOption" id='answerOption' value={formik.values.answerOption} className='select-answer' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                        <option hidden>Correct Answer</option>
                        {
                            formik?.values?.options?.map((option) => (
                                option?.value !== "" ? (
                                    <option value={option?.value} key={option?.value}>{option?.value}</option>
                                ) : null
                            ))
                        }
                    </select>
                    {
                        (formik.errors.answerOption && formik.touched.answerOption) && <p style={{ color: "red" }}>{formik.errors.answerOption}</p>
                    }
                </div>
                <div className="time_score">
                    <div className="time_part">
                        <label htmlFor="time">TimeOut:</label> <br />
                        <input
                            id='time'
                            type="number"
                            className='time_input'
                            placeholder='Timeout'
                            name='time'
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            value={formik.values.time}
                            onBlur={formik.handleBlur}
                        />
                        {
                            (formik.errors.time && formik.touched.time) && <p style={{ color: "red" }}>{formik.errors.time}</p>
                        }
                    </div>
                    <div className="score_part">
                        <label htmlFor="score">Score:</label> <br />
                        <input
                            id='score'
                            type="number"
                            className='score_input'
                            placeholder='Score'
                            name='score'
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            value={formik.values.score}
                            onBlur={formik.handleBlur}
                        />
                        {
                            (formik.errors.score && formik.touched.score) && <p style={{ color: "red" }}>{formik.errors.score}</p>
                        }
                    </div>
                </div>
                <div className='buttons'>
                    <Button variant="outlined" type='reset' color="error" onClick={() => formik.resetForm({ values: "" })} disabled={!formik.dirty}>
                        Temizle
                    </Button>
                    <Button onClick={()=>setShowQuestionList(false)} variant="contained" type='submit' color="success" disabled={!formik.dirty || formik.isSubmitting}>
                        Success
                    </Button>
                    <Link style={{ textDecoration: "none" }} to={"/quizList"}>
                        <Button variant="contained">Geri</Button>
                    </Link>
                </div>
            </form>


        </div>
    )
}

export default AddQuestion