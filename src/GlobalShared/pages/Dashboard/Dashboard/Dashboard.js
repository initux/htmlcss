import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";

import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import "./Dashboard.css";
import useAuth from "../../../hooks/useAuth";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  console.log("path : ", window.location.pathname);

  document.title =
    "Dashboard | Best Home Decor &amp; Room Decor &amp; Islamic Calligraphy Collection in BD | Room Decor Bangladesh";
  <meta
    name="description"
    content="Room Decor is the biggest Bangladeshi Framing Online Platform. Starting from Islamic Calligraphy Framing, Canvas Framing, Clock and Real Art. Room Decor is the Best Home Decor Platform in BD."
  />;
  const [isActive, setActive] = useState(window.location.pathname);
  const { handleLogout, getStarting, customer } = useAuth();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <Container>
      <div
        className="tmp-dashboard-container my-4"
        // style={{ minHeight: "500px" }}
      >
        <div className="tmp-dashboard-btn">
          <Paper className="deshboard-name p-3 d-flex" style={{ alignItems: "center" }}>
            <div>
              <Avatar
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                src="/broken-image.jpg"
              />
              <div className="deshboard-menu-link-mobile">
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem>
                              <Link to="/dashboard" style={{ color: "black" }}>
                                <div onClick={handleClose}>My Orders</div>
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <Link
                                to="/dashboard/account"
                                style={{ color: "black" }}
                              >
                                <div onClick={handleClose}>My Account</div>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link to="/login" style={{ color: "black" }}>
                                <div onClick={handleClose}>
                                  Logout 
                                </div>
                              </Link>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p style={{ fontSize: "12px", margin: "0", padding: "0" }}>
                Hello,
              </p>{" "}
              <p className="line-clamp" style={{ marginBottom: "0" }}>
                {customer.name}
              </p>
            </div>
          </Paper>
          <Paper className="deshboard-menu-link">
            <Link to="/dashboard">
              <div
                className="d-link"
                style={
                  isActive === "/dashboard"
                    ? {
                        background: `linear-gradient(to right, #ffffff 0%, ${getStarting?.primaryColor} 120%)`,
                        color: `${getStarting?.primaryColor}`,
                      }
                    : {}
                }
                onClick={() => setActive("/dashboard")}
              >
                {/* Dashboard */}
                My Orders
              </div>
            </Link>
            <Divider />
            {/* <Link to="/dashboard/orders">
                <div
                  className="d-link"
                  //   style={{ backgroundColor: `${getStarting?.primaryColor}` }}
                >
                  Order
                </div>
              </Link>
              <Divider /> */}
            <Link to="/dashboard/account">
              <div
                className="d-link"
                style={
                  isActive === "/dashboard/account"
                    ? {
                        background: `linear-gradient(to right, #ffffff 0%, ${getStarting?.primaryColor} 120%)`,
                        color: `${getStarting?.primaryColor}`,
                      }
                    : {}
                }
                onClick={() => setActive("/dashboard/account")}
              >
                {/* Account Details */}
                My Account
              </div>
            </Link>
            <Divider />
            <Link to="/login">
              <div
                className="d-link"
                onClick={handleLogout}
                //   style={{ backgroundColor: `${getStarting?.primaryColor}` }}
              >
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
              </div>
            </Link>
          </Paper>
        </div>
        <div className="tmp-dashboard-info">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
