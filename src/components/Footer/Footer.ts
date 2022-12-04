import { css } from '../../stitches.config';

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
  render(): string {
    return String.raw`
      <footer class='${styles()}'>
          <h3>Footer</h3>
      </footer>
    `;
  }
}
