import { Component } from '../../lib/Component/Component';

export class Header extends Component<{ data: string[] }> {
  render(): string {
    return String.raw`
        <div key='${this.key}'>
            <button>update context</button>
            <div>${JSON.stringify(this.getState()?.data)}</div>
        </div>
    `;
  }
}
