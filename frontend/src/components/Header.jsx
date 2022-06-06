import { NavLink } from "react-router-dom";
import HeaderStyles from "../styles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const headLinkStyles = ({ isActive }) => ({
    color: isActive ? `var(--blackl1)` : "",
    transform: isActive ? `translateY(-3px)` : "",
  });

  const logoutUser=()=>{
    dispatch(logout())
    dispatch(reset())
  }
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
          <span className={`material-icons ${HeaderStyles["icon"]}`}>notes</span>
          <span className={`${HeaderStyles["actions-title"]}`}>Home</span>
        </NavLink>
        {user ? (
          <button
            onClick={logoutUser}
            className={`flex-col flex-vCenter`}
          >
            <span className={`material-icons ${HeaderStyles["icon"]}`}>logout</span>
            <span className={`${HeaderStyles["actions-title"]}`}>Logout</span>
          </button>
        ) : (
          <NavLink
            to="/login"
            className={`flex-col flex-vCenter`}
            style={headLinkStyles}
          >
            <span className={`material-icons ${HeaderStyles["icon"]}`}>
              perm_identity
            </span>
            <span className={`${HeaderStyles["actions-title"]}`}>Login</span>
          </NavLink>
        )}
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
