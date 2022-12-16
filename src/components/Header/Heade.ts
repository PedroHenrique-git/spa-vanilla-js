import { Component } from 'spa-vanilla';
import { css } from '../../stitches.config';

const headerStyles = css({
  borderBottom: '1px solid #cecece',
  padding: '$sp1',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export class Header extends Component<
  Record<string, unknown>,
  { title: string }
> {
  render(): string {
    return String.raw`
        <header class='${headerStyles()}'>
            <h1>${this.getProps()?.title ?? 'Header'}</h1>
        </header>    
    `;
  }
}
