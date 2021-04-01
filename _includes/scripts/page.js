/*(function () {

})();*/

const a = document.querySelector('a')
// a.innerHTML = a.textContent.replace(/\S/g, "<span>$&</span>")

// Support Space:
a.innerHTML = a.textContent
  .replace(/\S/g, "<span>$&</span>")
  .replace(/\s/g, "<span>&nbsp;</span>")

let delay = 0
document.querySelectorAll('a span').forEach((span, index) => {
  delay += 0.1
  
  if (index === 6) delay += 0.3
  
  span.style.setProperty('--delay', `${delay}s`)
})

a.addEventListener('animationend', (e) => {
  if (e.target === document.querySelector('a span:last-child')) {
    a.classList.add('ended')
  }
})