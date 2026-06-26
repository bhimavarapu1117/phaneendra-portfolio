import contactBgAsset from "@/assets/contact-bg.png.asset.json";
import photoAsset from "@/assets/phaneendra-photo.jpg.asset.json";
import Lanyard from "@/components/lanyard/Lanyard";

const contactBg = contactBgAsset.url;
const photo = photoAsset.url;

const ContactSection = () => {
  return (
    <section id="contact" className="bg-background py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Media Card — taller on mobile so the 3D lanyard has room to hang */}
        <div className="relative w-full sm:w-[95%] md:w-[90%] h-[70vh] sm:h-auto sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden border border-border">
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
            <Lanyard
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              frontImage={photo}
              backImage={photo}
              imageFit="cover"
              plainLanyard
              lanyardColor="#0a0a0a"
            />
          </div>

          {/* Name Caption */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex flex-col items-center pointer-events-none px-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-foreground text-center">
              Phaneendra Reddy
            </h2>
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-muted-foreground text-center">
              Visual Designer · Hyderabad, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
