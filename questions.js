const request = new XMLHttpRequest()
let questions

function onload(){
  const data = JSON.parse(this.response)
  localStorage.setItem('Question List', JSON.stringify(data))
  questions = JSON.parse(localStorage.getItem('Question List'))
  shuffleQuestions(questions)
}

request.open('GET', `https://bewildered-shrug-fish.cyclic.app/questions`, true)
request.addEventListener('load', onload)
request.send()

function shuffleQuestions(questions){
  questions.sort(() => Math.random() - 0.5)
  return questions
}

