if ('serviceWorker' in navigator) {
  window.onload = _ => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.error('Registration failed: ', err);
    });
  }
}