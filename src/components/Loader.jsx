import { ImSpinner8 } from "react-icons/im";
const Loader = () => {
  return (
    <div className="min-h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
      <div className="flex justify-center items-center h-500">
        <ImSpinner8 className="text-5xl animate-spin _text-white" />
      </div>
    </div>
  );
};
export default Loader;
