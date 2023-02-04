const request = new XMLHttpRequest()
let questions;

function onload(){
  const data = JSON.parse(this.response)
  localStorage.setItem('Question List', JSON.stringify(data))
  questions = JSON.parse(localStorage,getIten('Question List'))
  shuffleQuestions(questions)
}

request.open('GET', `https://quiz-api.cyclic.app/api/questions`, true)
request.addEventListener('load', onload)
request.send()

function shuffleQuestions(questions){
  questions.sort(() => Math.random() - 0.5)
return questions
}


