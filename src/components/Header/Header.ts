import { css } from '../../stitches.config';
import { IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

const styles = css({
  padding: '$sp1',
  background: '$white',
  width: '100%',
  borderBottom: '1px solid $gray',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  h1: {
    color: '$black',
    fontFamily: '$principal',
    fontWeight: '$medium',
    fontSize: 'medium',
  },
});

export class Header implements IComponent {
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
      <header class='${styles()}'>
        <h1>Header</h1>
      </header>
    `;
  }
}
