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
  constructor(readonly fragment: DocumentFragment) {
    this.fragment = fragment;
    this.init();
  }

  init() {
    this.fragment.appendChild(createFragment(this.render()));
  }

  render(): string {
    return String.raw`
        <header class='${styles()}'>
            <h1>Header</h1>
        </header>
    `;
  }
}
