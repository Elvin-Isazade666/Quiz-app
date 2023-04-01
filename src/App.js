import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import {Route,Routes} from "react-router-dom";
import Home from "./components/Home/HomePage";
import QuizList from './components/QuizList/QuizList';
import AddQuestion from './components/AddQuestion/AddQuestion';
import EditQuestion from './components/EditQuestion/EditQuestion';
import Race from "./components/Race/Race";

function App() {

  const [questionData,setQuestionData] =useState([]);
  const [showQuestionList,setShowQuestionList] = useState(false);
  const getQuestionData = async () => {
    const response = await axios.get(`http://localhost:3000/questions`);
    setQuestionData(response.data);
  }

  useEffect(()=>{
    getQuestionData()
  },[]);
  
  return (
    <div className="app">
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/quizList' element={<QuizList questionData={questionData} showQuestionList={showQuestionList} setShowQuestionList={setShowQuestionList} setQuestionData={setQuestionData} getQuestionData={getQuestionData} />} />
        <Route path='/createQuiz' element={<AddQuestion setShowQuestionList={setShowQuestionList} questionData={questionData} setQuestionData={setQuestionData} />} />
        <Route path='editQuestion/:id' element={<EditQuestion setQuestionData={setQuestionData} questionData={questionData} getQuestionData={getQuestionData}  />} />
        <Route path='/race' element={<Race questionData={questionData} />} />
      </Routes>
    </div>
  );
}

export default App;
