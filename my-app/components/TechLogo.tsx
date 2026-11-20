import type { SimpleIcon } from "simple-icons";

export function TechLogo({ icon, name, mark }: { icon?: SimpleIcon; name: string; mark?: string }) {
  return <div className="tech-logo" title={name}>
    {icon ? <svg viewBox="0 0 24 24" role="img" aria-label={`${name} logo`} style={{ color: `#${icon.hex}` }}><path fill="currentColor" d={icon.path} /></svg> : <span className="tech-glyph" aria-hidden="true">{mark ?? name.slice(0, 2).toUpperCase()}</span>}
    <span>{name}</span>
  </div>;
}
