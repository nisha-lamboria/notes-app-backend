import LoaderStyles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={`${LoaderStyles.loader}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export { Loader };