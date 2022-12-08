export const createContainer = (
  containerTag = 'div',
  app: HTMLElement | null,
  initializeComponents: (_container: HTMLElement) => void,
) => {
  const container = document.createElement(containerTag);
  container.classList.add('content');

  initializeComponents(container);

  app?.append(container);
};
