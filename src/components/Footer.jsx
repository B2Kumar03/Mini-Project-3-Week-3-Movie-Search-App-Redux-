import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#04152D] text-white py-4 mt-auto w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2 text-center md:text-left">
        <p className="text-sm">Made with ❤️ by <span className="font-bold">Bittu Kumar</span></p>
        <div className="flex gap-4 text-sm">
          <a href="https://github.com/B2Kumar03" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">GitHub</a>
          
          <a href="mailto:bittu@example.com" className="hover:text-red-500">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
