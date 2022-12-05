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
  constructor(readonly fragment: DocumentFragment) {
    this.fragment = fragment;
    this.init();
  }

  init() {
    this.fragment.appendChild(createFragment(this.render()));
  }

  render(): string {
    return String.raw`
      <footer class='${styles()}'>
          <h3 id="a">Footer</h3>
      </footer>
    `;
  }
}
