import { Component } from '../../lib/Component/Component';
import { css } from '../../stitches.config';

const exampleStyles = css({
  border: '1px solid #cecece',
  padding: '$sp1',
  marginBottom: '25px',

  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  maxWidth: '400px',
  width: '100%',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$sp1',
    marginBottom: '15px',
  },
});

export class Example extends Component<{ count: number }> {
  private buttonIncrease: DOMElement = null;
  private buttonDecrease: DOMElement = null;

  events(): void {
    this.buttonIncrease?.addEventListener('click', () => {
      this.setState({ count: (this.getState()?.count ?? 0) + 1 });
    });

    this.buttonDecrease?.addEventListener('click', () => {
      this.setState({ count: (this.getState()?.count ?? 0) - 1 });
    });
  }

  selectors(): void {
    this.buttonIncrease = this.root?.querySelector(`#increase-${this.key}`);
    this.buttonDecrease = this.root?.querySelector(`#decrease-${this.key}`);
  }

  render(): string {
    return String.raw`
      <div class="${exampleStyles()}">
          <div>
            <button id='increase-${this.key}'>increase</button>
            <div>${JSON.stringify(this.getState()?.count)}</div>
            <button id='decrease-${this.key}'>decrease</button>
          </div>

          <ul>
            <li>
              <a href="/" route>/</a>
            </li>
            <li>
              <a href="/page/1" route>/page/:id</a>  
            </li>
            <li>
              <a href="/page/1/2?name=teste&age=0" route>/page/:id/:id</a>    
            </li>
          </ul>
      </div>
    `;
  }
}
