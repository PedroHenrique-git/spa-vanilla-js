import { Link } from '../../components/Link/Link';
import { Context } from '../../lib/Context/Context';
import { ContextData, IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

export class Home implements IComponent {
  readonly fragment: DocumentFragment;
  private button: HTMLElement | null = null;

  constructor(
    readonly rootFragment: DocumentFragment,
    readonly context: Context<ContextData> | undefined,
  ) {
    this.rootFragment = rootFragment;
    this.fragment = createFragment(this.render());
    this.context = context;
    this.init();
  }

  init() {
    this.rootFragment.appendChild(this.fragment);

    this.selectors();
    this.events();
  }

  selectors(): void {
    this.button = this.rootFragment.querySelector('#update-button');
  }

  events(): void {
    this.button?.addEventListener('click', () => {
      this.context?.set(
        'data',
        ['pedro', 'joao', 'luiz', 'henrique'],
        Home.name,
      );
    });
  }

  render(): string {
    return String.raw`
        <div class="content">
            ${this.context?.get('data').join(' - ')}
            <button id="update-button">update context</button>
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
