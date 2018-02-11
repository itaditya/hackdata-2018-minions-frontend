const config = {
  API_URL: 'https://api.disassociate56.hasura-app.io/api'
};

if (window.location.host == "localhost:8000") {
  Object.assign(config, {
    API_URL: 'http://localhost:8080/api'
  })
}

function elemsToggler(...elems) {
  const numOfElems = elems.length;
  let toggleIndex = 0;
  return function() {
    toggleIndex = (toggleIndex + 1) % numOfElems;
    elems[toggleIndex].classList.remove('hidden');
    elems
      .filter(elem => elem != elems[toggleIndex])
      .map(elem => elem.classList.add('hidden'))
  }
}

window.onload = function() {
  const startupSection = document.querySelector('.js-startup-section');
  const donationSection = document.querySelector('.js-donation-section');
  const startupWrapper = startupSection.querySelector('.js-startup-wrapper');
  const donationSectionInput = donationSection.querySelector('.js-donation-section__input');
  const donationSectionCtaMainText = donationSection.querySelectorAll('.js-donation-section__cta--main span');

  const startup_donationToggler = elemsToggler(startupSection, donationSection);
  const donationBtnTextToggler = elemsToggler(...donationSectionCtaMainText);

  let selectedStartupIndex = null;

  const { API_URL } = config;

  startupWrapper.addEventListener('click', event => {
    const elem = event.target;
    if(elem.classList.contains('js-startup-card__cta')){
      selectedStartupIndex = parseInt(elem.dataset.index);
      startup_donationToggler();
    }
  })

  donationSection.addEventListener('click', event => {
    const elem = event.target;
    if(elem.classList.contains('js-donation-section__cta--back')){
      startup_donationToggler();
    }
    if(elem.classList.contains('js-donation-section__cta--main')){
      const donationAmt = parseFloat(donationSectionInput.value);
      const paidTo = parseInt(selectedStartupIndex) + 1;
      donationBtnTextToggler();
      fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          donationAmt,
          paidTo
        })
      })
      .then(res => res.json())
      .then(res => {
        if(res.message) {
          setTimeout(() => {
            donationBtnTextToggler();
          }, 5500);
          setTimeout(() => {
            donationBtnTextToggler();
          }, 2000);
        }
      })
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
