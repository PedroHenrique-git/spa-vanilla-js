export function createApp() {
  const app = document.getElementById('app');

  if (app) {
    return app;
  }

  const newApp = document.createElement('div');
  newApp.id = 'app';

  document.body.appendChild(newApp);

  return newApp;
}
