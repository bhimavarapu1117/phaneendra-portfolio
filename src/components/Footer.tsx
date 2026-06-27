const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Phaneendra Reddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
