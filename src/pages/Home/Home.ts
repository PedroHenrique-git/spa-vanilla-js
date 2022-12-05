import { Link } from '../../components/Link/Link';
import { Context, IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

export class Home implements IComponent {
  constructor(
    readonly fragment: DocumentFragment,
    readonly context: Context | undefined,
  ) {
    this.fragment = fragment;
    this.context = context;
    this.init();
  }

  init() {
    this.fragment.appendChild(createFragment(this.render()));
  }

  render(): string {
    return String.raw`
        <div class="content">
            ${this.context?.data.join(' - ')}
            <ul>
                <li>
                    ${Link({ text: 'Home', href: '/' })}
                </li>
                <li>
                    ${Link({ text: 'Page', href: '/page' })}
                </li>
            </ul>
        </div>
    `;
  }
}
