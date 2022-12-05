import { css } from '../../stitches.config';
import { IComponent } from '../../typings';
import { createFragment } from '../../utils/createFragment';

const styles = css({
  padding: '$sp1',
  background: '$white',
  width: '100%',
  borderTop: '1px solid $gray',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  h3: {
    color: '$black',
    fontFamily: '$principal',
    fontWeight: '$medium',
    fontSize: 'medium',
  },
});

export class Footer implements IComponent {
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
      <footer class='${styles()}'>
          <h3 id="a">Footer</h3>
      </footer>
    `;
  }
}
