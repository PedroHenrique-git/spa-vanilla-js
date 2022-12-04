export class Link implements IComponent {
  constructor(private text: string, private href: string) {
    this.href = href;
    this.text = text;
  }

  render(): string {
    return String.raw`
        <a data-route href='${this.href}'>${this.text}</a>
    `;
  }
}
