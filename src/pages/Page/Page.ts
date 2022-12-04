import { Link } from '../../components/Link/Link';

export class Page implements IComponent {
  mount(): void {
    console.log('mount page');
  }

  unmount(): void {
    console.log('unmount page');
  }

  render(): string {
    return String.raw`
        <div class="content">
            <h1>page</h1>
            <ul>
                <li>
                    ${new Link('Home', '/').render()}
                </li>
                <li>
                    ${new Link('Page', '/page').render()}
                </li>
                <li>
                    ${new Link('Page with param', '/page/1').render()}
                </li>
            </ul>
        </div>    
    `;
  }
}
