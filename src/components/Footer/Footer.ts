import { Component } from '../../lib/Component/Component';
import { css } from '../../stitches.config';

const footerStyles = css({
  borderTop: '1px solid #cecece',
  padding: '$sp1',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export class Footer extends Component<
  Record<string, unknown>,
  { title: string }
> {
  render(): string {
    return String.raw`
        <footer class='${footerStyles()}'>
            <h1>${this.getProps()?.title ?? 'Footer'}</h1>
        </footer>    
    `;
  }
}
