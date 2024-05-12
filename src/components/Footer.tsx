const Footer = () => {
  return (
    <div className="bg-blue-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Enjoy Your Stay!
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Contact Us Here:</span>
          <span>insert@email.com</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
