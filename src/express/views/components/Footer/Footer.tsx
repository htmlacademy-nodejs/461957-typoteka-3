import React, {FunctionComponent} from "react";

interface FooterProps {
  isLargeIndent?: boolean;
}

export const Footer: FunctionComponent<FooterProps> = ({isLargeIndent}) => (
  <footer className={"footer" + (isLargeIndent ? " footer--padding" : "")}>
    <a className="footer__copyright" href="#" aria-label="HTMLAcademy">
      <img src="img/icons/HTMLAcademyLogo.svg" width="112" height="50" alt="HTMLAcademy" />
    </a>
    <span className="footer__dot"></span>
    <p className="footer__text">Типотека, 2019</p>
  </footer>
);
