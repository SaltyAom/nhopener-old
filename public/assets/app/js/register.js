if ('serviceWorker' in navigator) {
  window.onload = _ => {
    navigator.serviceWorker.register('sw.js')
    .then(registration => {
      console.info('Registered:', registration);
    }).catch(err => {
      console.error('Registration failed: ', err);
    });
  }
}