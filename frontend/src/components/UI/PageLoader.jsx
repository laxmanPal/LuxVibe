import logo from "../../assets/logo-2.png";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 animate-pulse">
          <img
            src={logo}
            alt="Loading..."
            className="w-full h-full object-contain animate-bounce"
          />
        </div>

        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
