import { Link } from '../../components/Link/Link';
import { Context } from '../../main';

export class Home implements IComponent<Context> {
  constructor(public context?: Context) {
    this.context = context;
  }

  mount(): void {
    console.log('mount home');
    console.log('context --> ', this.context);
  }

  unmount(): void {
    console.log('unmount home');
  }

  render(): string {
    return String.raw`
        <div class="content">
            <div>
                ${this.context?.data.join(' - ')}
            </div>
            <ul>
                <li>
                    ${new Link('Home', '/').render()}
                </li>
                <li>
                    ${new Link('Page', '/page').render()}
                </li>
            </ul>
        </div>
    `;
  }
}
