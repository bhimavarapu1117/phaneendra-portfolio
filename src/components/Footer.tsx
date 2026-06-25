import { Instagram, Linkedin, Github, Mail } from "lucide-react";

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-11.56h6.066c3.309 0 5.102 1.583 5.102 4.083 0 2.244-1.2 3.388-3.264 3.84l4.114 3.653h-4.973l-3.52-3.312h-.059v3.312zm-.51-8.558h-2.576v2.576h2.576c1.136 0 1.766-.574 1.766-1.288 0-.714-.63-1.288-1.766-1.288z"/>
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
