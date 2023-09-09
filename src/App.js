import { useState } from 'react';
import './index.css';

const questions = [
  {
    id: 1,
    number: 1,
    question: "Eighteen thousandths, written as a decimal, is:",
    answers: [
      "0.0018",
      "0.018",
      "0.18",
      "1.8"
    ],
    correct_answer: 1
  },
  {
    id: 2,
    number: 2,
    question: "what's my name ?",
    answers: [
      "Aravind",
      "Ramesh",
      "Vijay",
      "Kailash"
    ],
    correct_answer: 2
  }
]

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <div className="app">
      <QuestionBox
        cur={currentQuestionIndex}
        setCur={setCurrentQuestionIndex}
        number={questions[currentQuestionIndex].number}
        question={questions[currentQuestionIndex].question}
        answers={questions[currentQuestionIndex].answers}
        correctAns={questions[currentQuestionIndex].correct_answer}
      />
    </div>
  );
}

function QuestionBox({ question, answers, correctAns, number, cur, setCur }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false); // Initialize with null
  const [submit, setSubmit] = useState(null);

  const handleNext = () => {
    if (cur < questions.length - 1) {
      setSubmit(null)
      setCur(cur + 1);
    }
  };

  const handlePrevious = () => {
    if (cur > 0) {
      setCur(cur - 1);
      setSubmit(null);
    }
  };

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleSubmit() {
    if (selectedAnswer === null) return; // Check for null
    setSubmit(selectedAnswer === correctAns);
    setSelectedAnswer(null)
  }

  return (
    <div>
      <input className="question" disabled value={`Question ${number}: ${question}`} />
      <div>
        <button className='icon' onClick={handleToggle}>{isOpen ? "-" : "+"}</button>
      </div>

      {isOpen &&
        <OptionBox answers={answers} correct={correctAns} setSelectedAnswer={setSelectedAnswer} selectedAnswer={selectedAnswer} submit={submit} />
      }
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className='btn' style={{ marginRight: '30px' }} onClick={handlePrevious}>Previous</button>
        <button className='btn' onClick={handleSubmit}>Submit</button>
        <button className='btn' style={{ marginLeft: '30px' }} onClick={handleNext}>Next</button>
      </div>
      {submit !== null && (
        <p className="correct-answer">
          {submit ? "✳️✳️☑️Correct Answer" : "❌ Incorrect Answer"}
        </p>
      )}
    </div>
  );
}

function OptionBox({ answers, setSelectedAnswer, selectedAnswer, submit }) {
  function handleSelectAnswer(index) {
    setSelectedAnswer(index);
  }

  return (
    <div>
      {answers.map((answer, index) => (
        <div className="option" key={index}>
          <form>
            <input
              className="answer"
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => handleSelectAnswer(index)}
              disabled={submit !== null}
            />
          </form>
          <div>
            <p className="answer">{answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
