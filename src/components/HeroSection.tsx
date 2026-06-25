import Navbar from "./Navbar";
import ProjectCarousel from "./ProjectCarousel";
import backgroundLines from "@/assets/background-lines.svg";
const HeroSection = () => {
  return <section className="relative h-screen w-full overflow-hidden bg-transparent">
      {/* Background decorative lines */}
      <img src={backgroundLines} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-start md:items-end justify-between px-8 md:px-16 pt-32 md:pt-40 pb-24 md:pb-32">
        
        {/* Right: Role */}
        <div className="flex-1 flex justify-end mt-8 md:mt-0">
          <p className="text-2xl sm:text-4xl md:text-[50px] font-medium text-foreground" style={{
          letterSpacing: '-0.05em'
        }}>
            [ Visual Designer ]
          </p>
        </div>
      </div>
      
      {/* Projects Carousel */}
      <ProjectCarousel />
    </section>;
};
export default HeroSection;