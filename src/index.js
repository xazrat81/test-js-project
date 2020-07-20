import './main.scss'

const income = document.getElementById('income')
const outcome = document.getElementById('outcome')
const incomeError = document.getElementById('income-error')
const outcomeError = document.getElementById('outcome-error')
const balance = document.getElementById('balance')
const values = {
  incomeValue: '',
  outcomeValue: ''
}

function handleIncome(callback) {
  income.addEventListener('input', event => {
    if(event.target.value) {
      try {
        values.incomeValue = validateValues(event.target.value)
      } catch(err) {
        values.incomeValue = ''
        income.classList.add('error')
        incomeError.classList.add('visible')
        incomeError.textContent = err.message
      }
    } else {
      values.incomeValue = ''
      income.classList.remove('error')
      incomeError.classList.remove('visible')
    }
    
    callback()
  })
}

function handleOutcome(callback) {
  outcome.addEventListener('input', event => {
    if(event.target.value) {
      try {
        values.outcomeValue = validateValues(event.target.value)
      } catch(err) {
        values.outcomeValue = ''
        outcome.classList.add('error')
        outcomeError.classList.add('visible')
        outcomeError.textContent = err.message
      }
    } else {
      values.outcomeValue = ''
      outcome.classList.remove('error')
      outcomeError.classList.remove('visible')
    }
    
    callback()
  })
}

function getInputValues() {
  const {incomeValue, outcomeValue} = changeDivider(values)
  const balanceValue = +incomeValue - +outcomeValue
  if(!isNaN(+balanceValue)) balance.textContent = balanceValue
}

function changeDivider(valuesObject) {
  let obj = {}
  for(let key in valuesObject) {
    obj[key] = valuesObject[key].replace(',', '.')
  }
  return obj
}

function validateValues(value) {
  if(+value > 100000) {
    throw new Error('Введенное значение выше предельно допустимого')
  } else if(+value < 0) {
    throw new Error('Введенное значение ниже предельно допустимого')
  } else {
    if(countNumberOfDigitsAfterDecimalPoint(value) > 6) {
      throw new Error('Вводить можно не более 6 знаков после запятой')
    } else return value
  }
}

function countNumberOfDigitsAfterDecimalPoint(value) {
  return ((value.includes('.')) || (value.includes(',')) ? (value.toString().split(/[,.]/g).pop().length) : (0))
}

handleIncome(getInputValues)
handleOutcome(getInputValues)