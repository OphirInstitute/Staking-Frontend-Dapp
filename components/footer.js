import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-32">
      <div className="container mx-auto px-4 lg:px-8 flex justify-center"> {/* Added px-4 and lg:px-8 */}
        <p>&copy; 2023 Ophir Institute. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
