const request = new XMLHttpRequest()

function onload(){
  const data = JSON.parse(this.response)
  let temp = JSON.stringify(data)
  sessionStorage.setItem('Question List', temp)
}

request.open('GET', `https://quiz-api.cyclic.app/api/questions`, true)
request.addEventListener('load', onload)
request.send()

let questions = JSON.parse(sessionStorage.getItem('Question List'))


function shuffleQuestions(questions){
  questions.sort(() => Math.random() - 0.5)
}
shuffleQuestions(questions)


