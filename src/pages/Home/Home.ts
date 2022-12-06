import { Link } from '../../components/Link/Link';
import { Context } from '../../lib/Context/Context';
import { ContextData, IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

export class Home implements IComponent {
  readonly fragment: DocumentFragment;
  private increase: HTMLElement | null = null;
  private decrease: HTMLElement | null = null;

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
    this.increase = this.rootFragment.querySelector('#increase');
    this.decrease = this.rootFragment.querySelector('#decrease');
  }

  events(): void {
    this.increase?.addEventListener('click', () => {
      this.context?.set('count', this.context?.get('count') + 1, Home.name);
    });

    this.decrease?.addEventListener('click', () => {
      this.context?.set('count', this.context?.get('count') - 1, Home.name);
    });
  }

  render(): string {
    return String.raw`
        <div class="content">
            ${this.context?.get('count')}
            <button id="increase">+</button>
            <button id="decrease">-</button>
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
