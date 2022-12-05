import { Link } from '../../components/Link/Link';
import { IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

export class Page implements IComponent {
  constructor(readonly fragment: DocumentFragment) {
    this.fragment = fragment;
    this.init();
  }

  init() {
    this.fragment.appendChild(createFragment(this.render()));
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
