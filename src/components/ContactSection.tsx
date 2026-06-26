import contactBgAsset from "@/assets/contact-bg.png.asset.json";
import Lanyard from "@/components/lanyard/Lanyard";

const contactBg = contactBgAsset.url;

const ContactSection = () => {
  return (
    <section id="contact" className="bg-background py-16 md:py-24 px-2 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Media Card */}
        <div className="relative w-[95%] md:w-[90%] aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-border">
          {/* Background Image */}
          <img
            src={contactBg}
            alt="Contact background"
            className="absolute inset-0 w-full h-full object-cover dark:invert-0 invert"
          />

          {/* Theme-aware Overlay */}
          <div className="absolute inset-0 bg-background/40 dark:bg-background/20" />

          {/* Lanyard 3D */}
          <div className="absolute inset-0 z-10">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>

          {/* Name Caption */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
            <h2 className="text-2xl md:text-4xl font-medium text-foreground whitespace-nowrap">
              Phaneendra Reddy
            </h2>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground">
              Visual Designer · Hyderabad, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
