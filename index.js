const API_URL = 'http://localhost:8080/api';

window.onload = function() {
  fetch(`${API_URL}/startups`)
    .then(res => res.json())
    .then(startups => {
      startups.map(startup => {
        console.log('startup', startup);
      })
    })
}
