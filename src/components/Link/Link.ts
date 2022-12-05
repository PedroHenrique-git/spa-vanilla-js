export function Link({ href, text }: { text: string; href: string }) {
  return String.raw`
    <a href='${href}' data-route>${text}</a>
  `;
}
