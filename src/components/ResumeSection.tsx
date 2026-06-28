import { useTheme } from "next-themes";
import { ArrowDownIcon } from "lucide-react";
import Folder from "@/components/folder/Folder";
import { CraftButton, CraftButtonIcon, CraftButtonLabel } from "@/components/ui/craft-button";

const RESUME_URL = "https://phaneendrareddy-design-8x3lub3.gamma.site/";

const ResumeSection = () => {
  const { resolvedTheme } = useTheme();
  const folderColor = resolvedTheme === "light" ? "#1a1a1a" : "#e5e5e5";
  const labelColor = resolvedTheme === "light" ? "#ffffff" : "#000000";

  return (
    <section
      id="resume"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-20 bg-background"
    >
      <div className="max-w-7xl mx-auto mb-16">
        <span className="text-muted-foreground text-sm font-medium tracking-wide mb-6 block">
          [ Resume ]
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed max-w-4xl text-foreground">
          A snapshot of my professional journey, skills, experience, and
          creative achievements. Download my resume to learn more about my
          background and expertise.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 py-12">
        {/* Folder with centered "Resume" text */}
        <div className="relative inline-flex items-center justify-center">
          <Folder size={2} color={folderColor} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: labelColor, zIndex: 4 }}
          >
            Resume
          </span>
        </div>

        {/* Download Button */}
        <CraftButton asChild>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <CraftButtonLabel>Download Resume</CraftButtonLabel>
            <CraftButtonIcon>
              <ArrowDownIcon className="size-3 stroke-2 transition-transform duration-500 group-hover/button:translate-y-0.5" />
            </CraftButtonIcon>
          </a>
        </CraftButton>
      </div>
    </section>
  );
};

export default ResumeSection;
