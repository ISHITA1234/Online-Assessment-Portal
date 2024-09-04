import React from 'react';

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 right-0 bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        <div className="ml-10 text-center md:text-left">
          {/* <p className="mb-2">&copy; 2024 Your Company Name. All rights reserved.</p> */}
          <p className="text-lg">MARKS WEIGHTAGE</p>
          <p className="ml-2">Attendance: 20%</p>
          <p className="ml-2">Lab Work: 30%</p>
          <p className="ml-2">Report: 20%</p>
          <p className="ml-2">Viva-Voce: 30%</p>
          
        </div>
        {/* <p>Email: info@yourcompany.com</p> */}
        <div className="mr-10 text-center md:text-left">
          <p className="text-lg">REFERENCE BOOKS</p>
          <p className='ml-5'>1. Yashavant P. Kanetkar. 2022. Let Us C - 19th Edition (19th ed.). BPB Publications.</p>
          <a href="https://archive.org/details/letusc0008kane" className="mx-2 text-blue-500 underline">Download 14th Edition</a>
          <p className='ml-5'>2. Balagurusamy, E. "Programming In Ansi C." disp 3 (2016)</p>
          <a href="https://ju-etce-ivpr.github.io/assets/book/Programming%20in%20ANSI%20C-McGraw%20Hill%20Education%20(India)%20(2016).pdf" className="mx-2 text-blue-500 underline">Download 6th Edition</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
