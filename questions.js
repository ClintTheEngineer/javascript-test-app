const request = new XMLHttpRequest()

function onload(){
  const data = JSON.parse(this.response)
  localStorage.setItem('Question List', JSON.stringify(data))
}

request.open('GET', `https://quiz-api.cyclic.app/api/questions`, true)
request.addEventListener('load', onload)
request.send()

let questions = JSON.parse(localStorage.getItem('Question List'))


function shuffleQuestions(questions){
  questions.sort(() => Math.random() - 0.5)
}
shuffleQuestions(questions)


