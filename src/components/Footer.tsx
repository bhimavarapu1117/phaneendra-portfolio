import { Instagram, Twitter, Linkedin, Github, Dribbble, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
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
