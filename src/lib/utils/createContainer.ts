export const createContainer = (
  containerTag = 'div',
  className = '',
  app: HTMLElement | null,
  initializeComponents: (_container: HTMLElement) => void,
) => {
  const container = document.createElement(containerTag);

  if (className) {
    container.classList.add(className);
  }

  initializeComponents(container);

  app?.append(container);
};
