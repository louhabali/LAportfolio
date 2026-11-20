import { ArrowUpRight } from "lucide-react";
import { GithubMark } from "@/components/GithubMark";

export function Footer() {
  return <footer id="contact" className="site-footer"><div className="footer-main"><div><a href="#home" className="brand">ALILO<span>_</span></a><p>Good systems start with curiosity.<br />Let&apos;s build something useful.</p></div><div className="footer-contact-links"><a className="contact-link" href="mailto:louhabali@gmail.com">louhabali@gmail.com <ArrowUpRight size={18} /></a><a className="footer-github-link" href="https://github.com/louhabali" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={15} /></a></div></div>
    <div className="footer-bottom"><span>© 2026 Ali Louhab · Built with intent.</span><div className="social-links"><a href="https://github.com/louhabali" target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubMark size={17} /></a></div><a className="back-top" href="#home">BACK TO TOP ↑</a></div>
  </footer>;
}
