import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, Link as LinkIcon, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatefulButton } from "@/components/ui/stateful-button";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);

const contactInfo = [
  {
    label: "Phone number",
    value: "+91 9849590408",
    href: "tel:+919849590408",
    icon: Phone,
  },
  {
    label: "Email",
    value: "phaneendrareddy0208@gmail.com",
    href: "mailto:phaneendrareddy0208@gmail.com",
    icon: Mail,
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/phani1117", icon: LinkIcon },
  { label: "Behance", href: "https://www.behance.net/phaneendrareddy", icon: BehanceIcon },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/bhimavarapu-phaneendra-reddy-2663a9211/en", icon: Linkedin },
];

const ContactFormSection = () => {
  const [buttonStatus, setButtonStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    setButtonStatus("loading");

    const subject = encodeURIComponent(`Message from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:phaneendrareddy0208@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setButtonStatus("success");
      reset();
      toast.success("Message ready to send", {
        description: "Your default email client has been opened.",
      });
      setTimeout(() => setButtonStatus("idle"), 2000);
    }, 400);
  };

  const onError = () => {
    setButtonStatus("error");
    setTimeout(() => setButtonStatus("idle"), 2000);
  };

  return (
    <section id="contact-form" className="bg-background py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight">
            Get in touch
          </h2>
          <div className="mt-4 md:mt-6 max-w-2xl">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Want to know more about me? Whether you have a question, an idea, or just want to say hello, I'd love to hear from you.
            </p>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Feel free to reach out through the contact form below, and I'll get back to you as soon as possible. Let's connect and create something amazing together!
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-stretch">
          {/* Contact info */}
          <div className="space-y-6 lg:space-y-0 lg:h-full lg:flex lg:flex-col lg:gap-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4 p-4 border border-border bg-card/30 hover:bg-card/60 transition-colors lg:flex-1"
                >
                  <span className="flex items-center justify-center w-10 h-10 border border-border text-muted-foreground group-hover:text-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm sm:text-base text-foreground font-medium">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}

            <div className="p-4 border border-border bg-card/30 lg:flex-1">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 border border-border text-muted-foreground">
                  <LinkIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Connect</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          target={social.href.startsWith("http") ? "_blank" : undefined}
                          rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4"
                        >
                          {social.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-sm text-foreground">
                Name
              </Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-sm text-foreground">
                Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message" className="text-sm text-foreground">
                Message
              </Label>
              <Textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                rows={6}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message.message}</p>
              )}
            </div>

            <StatefulButton
              type="button"
              status={buttonStatus}
              onClick={() => handleSubmit(onSubmit, onError)()}
              className="w-full sm:w-auto"
            >
              Send Message
            </StatefulButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;