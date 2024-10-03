import { ThreeDots } from "react-loader-spinner";

const ThereDotLoader = () => {
  return (
    <ThreeDots
      visible={true}
      height="50"
      width="50"
      color="#a9a9a9"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default ThereDotLoader;
