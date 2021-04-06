document.addEventListener("DOMContentLoaded", () => {
  const one = document.getElementById('one')
  const two = document.getElementById('two')
  const submitBtn = document.querySelector('.submit-btn')
  const showBtn = document.querySelector('.show-btn')
  const clearBtn = document.querySelector('.clear-btn')
  const tableBody = document.querySelector('.table-body')
  const tableWrapper = document.querySelector('.table-wrapper')

  submitBtn.addEventListener('click', e => {
    e.preventDefault()
    const payload = {
      one: one.value,
      two: two.value
    }
    submitBtn.classList.add('disabled')
    fetch ('http://localhost:3000/api/onetwo', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(bool => {
      submitBtn.classList.remove('disabled')
      setSubmitToDefault()
      if (bool) {
        submitBtn.classList.add('btn-success')
      } else {
        submitBtn.classList.add('btn-danger')
      }
    })
    .catch(err => {
        console.error(err)
        submitBtn.classList.add('btn-danger')
    })
  })

  showBtn.addEventListener('click', e => {
    showBtn.classList.add('disabled')
    e.preventDefault()
    fetch ('http://localhost:3000/api/onetwo')
      .then(res => res.json())
      .then(data => {
        data.forEach((el, idx) => {
          const row = `
            <tr>
              <th scope="row">${ idx + 1}</th>
              <td>${el.one}</td>
              <td>${el.two}</td>
              <td>${new Date(el.date).toLocaleString()}</td>
            </tr>
          `
          tableBody.insertAdjacentHTML('beforeend', row)
          tableWrapper.style.display = 'block'
        })
      })
      .catch(err => {
          console.error(err)
      })
  })

  clearBtn.addEventListener('click', () => {
    tableWrapper.style.display = 'none'
    tableBody.innerHTML = ''
    showBtn.classList.remove('disabled')
    setSubmitToDefault()
  })

  function setSubmitToDefault() {
    submitBtn.classList.remove('btn-success')
    submitBtn.classList.remove('btn-danger')
    one.value = ''
    two.value = ''
  }
})
