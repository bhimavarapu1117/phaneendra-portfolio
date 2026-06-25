import { Instagram, Linkedin, Github, Mail } from "lucide-react";

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M186.5 293c0-21.3-15.1-29.9-34.2-29.9H85.1V324h66.1c20.3 0 35.3-8.7 35.3-31zM182 199.8c0-19.4-14.9-25.7-31.6-25.7H85.1v54.1h60.5c16.8 0 36.4-3.9 36.4-28.4zM325.4 247.4c-22.1 0-36.3 14.5-37.7 36.6h73.7c-2.1-22.4-13.7-36.6-36-36.6z"/>
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM331.3 168.2h78.6v19.1h-78.6v-19.1zM238.2 318c-7.1 22.2-30 36.8-72.9 36.8H21V134.6h140.4c34.8 0 64.9 9.7 64.9 49.4 0 20.1-9.5 35.1-27.4 44.5 24.4 7 36.3 26.4 36.3 51.4 0 14.8-3 27.5-8 38.1zm193.5-15.6h-110c0 27.6 13.1 43.3 41.1 43.3 14.3 0 32.7-7.6 36.8-22.5h32.5c-10.4 33-32.6 48.4-70.4 48.4-47.8 0-77.4-32.4-77.4-79.4 0-45.5 31.4-79.8 77.4-79.8 48.9 0 75.1 39.8 70 90z"/>
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: BehanceIcon, href: "https://www.behance.net/phaneendrareddy", label: "Behance" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  [ Buy Template ]
                </a>
              </li>
              <li>
                <a 
                  href="/documentation" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  [ Documentation ]
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@madebyoversight.com" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  [ Support ]
                </a>
              </li>
              <li>
                <a 
                  href="https://lovable.dev" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  [ Lovable.dev ]
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Phaneendra Reddy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
