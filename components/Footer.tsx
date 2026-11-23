import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubMark } from "@/components/GithubMark";
import { LinkedinMark } from "@/components/LinkedinMark";
import { ContactForm } from "@/components/ContactForm";

export function Footer() {
  return <footer id="contact" className="site-footer">
    <div className="contact-shell">
      <div className="contact-heading"><span className="contact-overline"><i /> OPEN TO OPPORTUNITIES</span><span className="contact-index">CONTACT / 06</span></div>
      <div className="contact-layout">
        <div className="contact-intro">
          <a href="#home" className="brand">ALILO<span>_</span></a>
          <h2>Have a good<br />one in <span>mind?</span></h2>
          <p>I&apos;m always glad to hear about thoughtful teams, interesting problems, and ideas worth building.</p>
          <a className="contact-email-card" href="mailto:louhabali@gmail.com"><span className="contact-icon-box"><Mail size={17} /></span><span><small>EMAIL ME DIRECTLY</small><strong>louhabali@gmail.com</strong></span><ArrowUpRight className="contact-email-arrow" size={17} /></a>
          <div className="contact-location"><MapPin size={14} /><span>Based in Oujda, Morocco <i>·</i> Working worldwide</span></div>
          <div className="contact-social-row"><span>ELSEWHERE</span><a href="https://github.com/louhabali" target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubMark size={17} /></a><a href="https://www.linkedin.com/in/louhab-ali-980987290/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedinMark size={17} /></a></div>
        </div>
        <ContactForm />
      </div>
    </div>
    <div className="footer-bottom"><span>© 2026 Ali Louhab · Built with intent.</span><a className="back-top" href="#home">BACK TO TOP ↑</a></div>
  </footer>;
}
