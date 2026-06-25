import contactBgAsset from "@/assets/contact-bg.png.asset.json";
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
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-background/20" />
          
          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-4 md:px-0 py-8 md:py-0">
            {/* Name with Apple-style Selection */}

            <div className="flex flex-col items-center">
              {/* Selection Wrapper */}
              <div 
                className="relative px-8 md:px-[52px] py-[5px] rounded-[4px]"
                style={{
                  backgroundColor: 'rgba(5, 147, 249, 0.23)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                {/* Left Handle */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0593F9]">
                  {/* Top Circle */}
                  <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#0593F9]" />
                </div>
                
                {/* Right Handle */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#0593F9]">
                  {/* Bottom Circle */}
                  <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#0593F9]" />
                </div>
                
                {/* Name Text */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-foreground whitespace-nowrap">
                  Phaneendra Reddy
                </h2>
              </div>
              
              {/* Subtitle */}
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Visual Designer · Hyderabad, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
