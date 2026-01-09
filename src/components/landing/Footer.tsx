import { GraduationCap, Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "FAQ", "Updates", "Support"],
    Resources: ["Documentation", "API", "Community"],
    Company: ["About", "Blog", "Careers"],
    Legal: ["Privacy", "Terms", "Security"],
  };

  return (
    <footer className="bg-sidebar py-16 text-sidebar-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                EduDisha
              </span>
            </div>
            <p className="text-sidebar-foreground/70 max-w-sm mb-6">
              Empowering GTU students to organize academics, exchange skills, 
              and discover scholarships—all in one platform.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-sidebar-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sidebar-foreground/60 text-sm">
            
          </p>
          <p className="text-sidebar-foreground/60 text-sm">
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
