const OPTIONS = [ 'authToken' ];

function getOptionInput(name) {
  return document.querySelector(`.option-field-input[name=${name}]`)
}

function updateWithCurrentValues() {
  for (const option of OPTIONS) {
    const input = getOptionInput(option)
    const value = localStorage[option]

    if (value !== undefined) {
      input.value = value
    }
  }
}

function saveValues(event) {
  event.preventDefault()

  for (const option of OPTIONS) {
    const input = getOptionInput(option)
    const value = (input.value || '').trim()

    if (value !== '') {
      localStorage[option] = value
    } else {
      delete localStorage[option]
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateWithCurrentValues()

  const form = document.querySelector('.options-form')
  form.addEventListener('submit', saveValues)
})
