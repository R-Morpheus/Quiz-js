const questions = [
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
	{
		question: "Как назывался JavaScript раньше??",
		answers: ["TypeScript", "Java", "CoffeeScript", "EcmaScript"],
		correct: 3,
	},
	{
		question: "Что такое console.log()",
		answers: ["Функция", "Объект", "Массив", ],
		correct: 1,
	},
	{
		question: "Можно ли создать ошибку на языке JavaScript?",
		answers: ["Да", "Нет"],
		correct: 1,
	},
	{
		question: "Есть ли разница между выражениями !!( a && b ) и (a && b)",
		answers: ["Да", "нет"],
		correct: 1,
	},
	{
		question: "Чему равно 0 || 1 && 2 || 3",
		answers: ["3", "2", "undefined", "false"],
		correct: 4,
	},
	{
		question: "Что делает оператор ===?",
		answers: ["Сравнивает по ссылке, а не по значению.", "Сравнивает без приведения типа.", "Нет такого оператора."],
		correct: 2,
	},
	{
		question: "В чем отличие между локальной и глобальной переменной?",
		answers: ["Глобальные видны повсюду, локальные только в функциях", "Локальные можно переопределять, глобальные нельзя", "Локальные видны повсюду, глобальные только в функциях", "Глобальные можно переопределять, локальные нельзя"],
		correct: 1,
	},
	{
		question: "Какие циклы есть в языке JavaScript?",
		answers: ["for, forMap, foreach, while", "for, forMap, foreach, while, do while", "for, while, do while, foreach","for, while, do while"],
		correct: 4,
	},
	{
		question: "Что такое условный оператор?",
		answers: ["Конструкция, что выполняет код несколько раз", "Конструкция для создания определенной переменной", "Оператор сравнения значений"],
		correct: 3,
	},
	{
		question: "Сколько операндов в выражении a = b?",
		answers: ["1", "2", "3","undefined"],
		correct: 2,
	},
	{
		question: "Где верно указан запуск всплывающего окна?",
		answers: ["new alert (`hi`)", "info (`Hi`)", "alert (`Hi`)"],
		correct: 3,
	}


];


//Находим элементы 
const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

// Переменные иры 
let score = 0 //кол-во правильных ответов 
let questionIndex = 0 // текущий вопрос 

clearPage();
showQuestion()
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title


	//Варианты ответов 
	let answerNumber = 1

	for( answerText of questions[questionIndex]['answers']){
		const questionTemplate = `
		<li>
			<label>
				<input value ="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`

	let answerHTML = questionTemplate
								.replace('%answer%',answerText)
								.replace('%number%', answerNumber)

	listContainer.innerHTML += answerHTML;
	
	answerNumber++

	}
}


function checkAnswer(){
	
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if(!checkedRadio){
		alert('Наилюш, выбери ответ!') // или submitBtn.blur()
		                               //     return 
	}

	const userAnswer = parseInt(checkedRadio.value)

	//Если ответила верно то увеличиваем счет 

	if (userAnswer === questions[questionIndex]['correct']){
		score++;
		
	}
	
	if(questionIndex !== questions.length - 1){
		console.log('это НЕ последний вопрос')
		questionIndex++
		clearPage()
		showQuestion()
		return
	} else {
		console.log('это последний вопрос')
		clearPage()
		showResults()
	}
}

function showResults(){
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;

	let title
	let message

	if (score === questions.length){
		title = 'Поздравляю! Ты все помнишь!'
		message = 'Любимая, ты ответила верно на все вопросы!'
	}else if ((score * 100) / questions.length >= 50){
		title = 'Пойдет!'
		message = 'Любимая, ты дала более половины правильных ответов!'
	}else{
		title = 'Попробуй еще раз ;)'
		message = 'Любимая, ты дала меньше половины правильных ответов!'
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate
									.replace('%title%',title)
									.replace('%message%', message)
									.replace('%result%', result)
	
	headerContainer.innerHTML = finalMessage

	submitBtn.blur()
	submitBtn.innerText = 'Начать снова'
	submitBtn.onclick = function(){
		history.go()
	}

}





