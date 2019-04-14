if ('serviceWorker' in navigator) {
  window.onload = _ => {
    if (!navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('sw.js', {
        scope: "/"
      }).catch(err => {
        console.error('Registration failed: ', err);
      });
    }
  }
}