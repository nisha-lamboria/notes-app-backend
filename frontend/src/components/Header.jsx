import { NavLink } from "react-router-dom";
import HeaderStyles from "../styles/Header.module.css";

const Header = () => {
    const headLinkStyles=({isActive}) => ({
        color: isActive ? `var(--blackl1)` : "",
        transform: isActive?`translateY(-3px)`:"",
      })
  return (
    <header className={`${HeaderStyles.header}`}>
      <div className={`${HeaderStyles["logo-head"]} flex-vCenter`}>
        <NavLink to="/" className={`${HeaderStyles["logo-name"]}`}>
          NOTES
        </NavLink>
      </div>
      <div className={`${HeaderStyles["actions"]} flex-vCenter`}>
        <NavLink
          to="/"
          className={`flex-col flex-vCenter`}
          style={headLinkStyles}
        >
          <span class={`material-icons ${HeaderStyles["icon"]}`}>notes</span>
          <span className={`${HeaderStyles["actions-title"]}`}>Home</span>
        </NavLink>
        <NavLink
          to="/login"
          className={`flex-col flex-vCenter`}
          style={headLinkStyles}
        >
          <span className={`material-icons ${HeaderStyles["icon"]}`}>
            perm_identity
          </span>
          <span className={`${HeaderStyles["actions-title"]}`}>
            Login
          </span>
        </NavLink>
      </div>
      <label
        htmlFor="nav-toggle"
        className={`${HeaderStyles["nav-toggle-label"]}`}
      >
        <span></span>
      </label>
    </header>
  );
};

export { Header };
