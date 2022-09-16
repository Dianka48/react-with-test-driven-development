import { useTranslation } from "react-i18next";
// import withHover from "../withHover";
// import useHover from "../useHover";
import { useRef } from "react";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();
  const ref = useRef();
  // const on = useHover(ref.current);

  let size = 24;
  // if (on) {
  //   size = 48;
  // }

  const onClickSlovak = () => {
    i18n.changeLanguage("sk");
  };

  const onClickEnglish = () => {
    i18n.changeLanguage("en");
  };

  return (
    <div className="text-center" ref={ref}>
      <img
        title="Slovensky"
        onClick={onClickSlovak}
        src={`https://www.countryflagicons.com/FLAT/${size}/SK.png`}
        alt="Slovak flag"
      ></img>
      <img
        title="English"
        onClick={onClickEnglish}
        src={`https://www.countryflagicons.com/FLAT/${size}/GB.png`}
        alt="Great Britain flag"
      ></img>
    </div>
  );
};

// export default withHover(LanguageSelector);
export default LanguageSelector;
