import { Link } from '../../components/Link/Link';
import { IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

export class Page implements IComponent {
  readonly fragment: DocumentFragment;

  constructor(readonly rootFragment: DocumentFragment) {
    this.rootFragment = rootFragment;
    this.fragment = createFragment(this.render());
    this.init();
  }

  init() {
    this.rootFragment.appendChild(this.fragment);
  }

  render(): string {
    return String.raw`
        <div class="content">
            <h1 id="title">page</h1>
            <ul>
                <li>
                  ${Link({ text: 'Home', href: '/' })}
                </li>
                <li>
                  ${Link({ text: 'Page', href: '/page' })}
                </li>
                <li>
                  ${Link({ text: 'Page with param', href: '/page/1' })}
                </li>
            </ul>
        </div>    
    `;
  }
}
