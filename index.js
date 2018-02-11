const API_URL = 'http://localhost:8080/api';


function elemsToggler(elem1, elem2) {
  let toggle = false;
  return function() {
    if(toggle) {
      elem1.classList.remove('hidden');
      elem2.classList.add('hidden');
    } else {
      elem2.classList.remove('hidden');
      elem1.classList.add('hidden');
    }
    toggle = !toggle;
  }

}

window.onload = function() {
  const startupSection = document.querySelector('.js-startup-section');
  const donationSection = document.querySelector('.js-donation-section');

  const startupWrapper = startupSection.querySelector('.js-startup-wrapper');

  const startup_donationToggler = elemsToggler(startupSection, donationSection);

  startupWrapper.addEventListener('click', event => {
    const elem = event.target;
    if(elem.classList.contains('js-startup-card__cta')){
      console.log('btn');
      startup_donationToggler();
    }
  })

  donationSection.addEventListener('click', event => {
    const elem = event.target;
    if(elem.classList.contains('js-donation-section__cta--back')){
      startup_donationToggler();
    }
  })

  fetch(`${API_URL}/startups`)
    .then(res => res.json())
    .then(startups => {
      startups.map(startup => {
        console.log('startup', startup);
      })
    })


}
