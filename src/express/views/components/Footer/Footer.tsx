import React, {FunctionComponent} from "react";

interface FooterProps {
  isLargeIndent?: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({isLargeIndent}) => {
  const year = new Date().getFullYear();
  return (
    <footer className={"footer" + (isLargeIndent ? " footer--padding" : "")}>
      <a className="footer__copyright" href="#" aria-label="HTMLAcademy">
        <img src="img/icons/HTMLAcademyLogo.svg" width="112" height="38" alt="HTMLAcademy" />
      </a>
      <span className="footer__dot" />
      <p className="footer__text">Типотека, {year}</p>
    </footer>
  );
};

export {Footer};
