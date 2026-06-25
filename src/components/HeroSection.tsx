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
      </div>
      
      {/* Projects Carousel */}
      <ProjectCarousel />
    </section>;
};
export default HeroSection;