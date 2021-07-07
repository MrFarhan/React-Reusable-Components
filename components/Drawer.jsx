import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../styles/components/Drawer.scss";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../store/actions/auth";
import Loading from "../components/Loader";
import OrderModal from "../containers/Order/OrderModal";
import { bellIconReset, getOrders } from "../store/actions/partsActions";
import { useTranslation } from "react-i18next";

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    marginLeft: "0px",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    height: "100vh",
    backgroundColor: "#262626 !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openCheckups, setOpenCheckups] = useState(false);
  const [openParts, setOpenParts] = useState(false);
  const [openDocManager, setOpenDocManager] = useState(false);
  const [openParks, setOpenParks] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [parkName, setParkName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [userPosition,setUserPosition] = useState(false);
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const widthScreen = window.screen.width;

  const handleOpenCheckups = (close, checkup) => {
    handleOpenUsers(true, false, true);
    setOpenParts(false);
    setOpenParks(false)
    setOpenDocManager(false)
    if (close) setOpenCheckups(false);
    else if (!close && checkup) setOpenCheckups(!openCheckups);
    else setOpenCheckups(true);

    if (!close && checkup && widthScreen < 768) setMobileOpen(true);
    else setMobileOpen(false);
  };
  const handleOpenParts = (close, parts) => {
    handleOpenUsers(true, false, false);

    if (close) setOpenParts(false);
    else if (!close && parts) setOpenParts(!openParts);
    else setOpenParts(true);

    if (!close && parts && widthScreen < 768) setMobileOpen(true);
    else setMobileOpen(false);
  };

  const handleOpenUsers = (close, user, checkup) => {
    if (!checkup) {
      handleOpenCheckups(true);
    }
    if (widthScreen < 768) {
      setMobileOpen(false);
    }
    if (close) setOpenUsers(false);
    else if (!close && user) setOpenUsers(!openUsers);
    else setOpenUsers(true);

    if (!close && user && widthScreen < 768) setMobileOpen(true);
    else setMobileOpen(false);
  };

  const handleOpenParks = (close, parks, checkup) => {
    if (!checkup) {
      handleOpenCheckups(true);
    }
    if (widthScreen < 768) {
      setMobileOpen(false);
    }
    if (close) setOpenUsers(false);
    else if (!close && parks) setOpenParks(!openParks);
    else setOpenParks(true);

    if (!close && parks && widthScreen < 768) setMobileOpen(true);
    else setMobileOpen(false);
  };

  const handleOpenDocManager = (close, parks, checkup) => {
    if (!checkup) {
      handleOpenCheckups(true);
    }
    if (widthScreen < 768) {
      setMobileOpen(false);
    }
    if (close) setOpenUsers(false);
    else if (!close && parks) setOpenDocManager(!openDocManager);
    else setOpenDocManager(true);

    if (!close && parks && widthScreen < 768) setMobileOpen(true);
    else setMobileOpen(false);
  };
  //Modal Work
  const handleOpenOrderModal = () => {
    setModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setModalOpen(false);
  };

  const handleCheckupUser = () => {
    handleOpenCheckups(true);
    handleOpenUsers(true);
    handleOpenParts(true);
    handleOpenDocManager(true);
  };
  const [group, setGroup] = useState("");

  useEffect(() => {
    if (props.isSuccessAddOrder && widthScreen <= 959) {
      setMobileOpen(!mobileOpen);
    }
  }, [props.isSuccessAddOrder]);

  useEffect(() => {
    if (
      window.location.pathname === "/create-checkups" ||
      window.location.pathname === "/edit-checkup" ||
      window.location.pathname === "/view-checkups"
    ) {
      setOpenCheckups(true);
      setOpenUsers(false);
    } else if (
      window.location.pathname === "/create-user" ||
      window.location.pathname === "/view-users"
    ) {
      setOpenUsers(true);
      setOpenCheckups(false);
    } else if (
      window.location.pathname === "/basket" ||
      window.location.pathname === "/past-orders"
    ) {
      setOpenParts(true);
      setOpenUsers(false);
    } else if (
      window.location.pathname === "/create-park" ||
      window.location.pathname === "/view-park"
    ) {
      setOpenParts(false);
      setOpenUsers(false);
      setOpenParks(true);
    } else if (
      window.location.pathname === "/create-document" ||
      window.location.pathname === "/view-document"
    ) {
      setOpenParts(false);
      setOpenUsers(false);
      setOpenParks(false);
      setOpenDocManager(true)
    }

  }, []);
  useEffect(() => {
    if (props?.FetchedUserSuccess && props?.isFetchedUser) {
      setUserPosition(props?.FetchedUser?.position.toLowerCase())
      setGroup(props?.FetchedUser?.rights.toLowerCase());
    } else if (props?.FetchedUserError) {
      toast.error(`${t("errorGetUserInfo")} ${t(props?.FetchedUserError)}`);
    }
  }, [props.isFetchedUser]);

  useEffect(() => {
    const ParkName = props.Parks.find((park) => {
      if (park.id === JSON.parse(localStorage.getItem("parkID"))) {
        return park;
      }
    });
    setParkName(ParkName?.name);
  }, [props.Parks.length]);

  const drawer = (
    <>
      <div className="Drawer">
        <Hidden mdUp implementation="css">
          <div className="close-drawer">
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          </div>
        </Hidden>
        <Hidden smDown implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        <List className="park_name">
          <ListItem className="park_name_listItem">
            {parkName ? parkName : <Loading />}
          </ListItem>
        </List>
        <List>
          <ListItem
            button
            component={Link}
            to="/last-checkups"
            className="list-box lastCheckup"
            onClick={handleCheckupUser}
          >
            <div className="icon-space" />
            <ListItemText primary={t("home")} className="list-text" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="#"
            className="list-box"
            onClick={handleCheckupUser}
          >
            <div className="icon-space" />

            <ListItemText primary={t("maintenance ")} className="list-text" />
          </ListItem>
          {group === "superadmin" ||
            group === "admin" ||
            group === "technician" ? (
            <>
              <ListItem
                button
                onClick={() => handleOpenParts(false, true)}
                className="list-box"
              >
                {openParts ? (
                  <ListItemIcon children={<ExpandMoreIcon color="action" />} />
                ) : (
                  <div className="icon-space" />
                )}
                <ListItemText primary={t("parts")} className="list-text" />
              </ListItem>
              {openParts ? (
                <List className="sublist">
                  <>
                    <ListItem
                      onClick={() => {
                        handleOpenParts(false, false);
                        handleOpenOrderModal(true);
                      }}
                      button
                    >
                      <ListItemText
                        primary={t("order")}
                        className="sublist-text"
                      />
                    </ListItem>
                    <ListItem
                      onClick={() => {
                        handleOpenParts(false, false);
                        props.bellIconReset();
                      }}
                      button
                      component={Link}
                      to="/basket"
                    >
                      <ListItemText
                        primary={
                          <div className="notifier">
                            <div>{t("basket")} &nbsp;</div>
                            {props?.bellIcon ? (
                              <div className="redIcon">{props?.bellIcon}</div>
                            ) : null}
                          </div>
                        }
                        className="sublist-text"
                      />
                    </ListItem>
                    <ListItem
                      onClick={() => handleOpenParts(false, false)}
                      button
                      component={Link}
                      to="/past-orders"
                    >
                      <ListItemText
                        primary={t("pastOrders")}
                        className="sublist-text"
                      />
                    </ListItem>
                  </>
                </List>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          <ListItem
            button
            onClick={() => handleOpenCheckups(false, true)}
            className="list-box"
          >
            {openCheckups ? (
              <ListItemIcon children={<ExpandMoreIcon color="action" />} />
            ) : (
              <div className="icon-space" />
            )}
            <ListItemText primary={t("checkups")} className="list-text" />
          </ListItem>

          {openCheckups ? (
            <List className="sublist">
              {group === "superadmin" ? (
                <>
                  <ListItem
                    onClick={() => handleOpenCheckups(false, false)}
                    button
                    component={Link}
                    to="/create-checkups"
                  >
                    <ListItemText
                      primary={t("create")}
                      className="sublist-text"
                    />
                  </ListItem>
                  <ListItem
                    onClick={() => handleOpenCheckups(false, false)}
                    button
                    component={Link}
                    to="/edit-checkup"
                  >
                    <ListItemText
                      primary={t("edit")}
                      className="sublist-text"
                    />
                  </ListItem>
                </>
              ) : (
                ""
              )}
              <ListItem
                onClick={() => handleOpenCheckups(false, false)}
                button
                component={Link}
                to="/view-checkups"
              >
                <ListItemText primary={t("view")} className="sublist-text" />
              </ListItem>
            </List>
          ) : (
            ""
          )}
          {group === "superadmin" || group === "admin" ? (
            <ListItem
              button
              className="list-box"
              onClick={() => handleOpenUsers(false, true)}
            >
              {openUsers ? (
                <ListItemIcon children={<ExpandMoreIcon color="action" />} />
              ) : (
                <div className="icon-space" />
              )}
              <ListItemText primary={t("users")} className="list-text" />
            </ListItem>
          ) : (
            ""
          )}
          {openUsers ? (
            <List className="sublist">
              <ListItem
                onClick={() => handleOpenUsers(false, false)}
                button
                component={Link}
                to="/create-user"
              >
                <ListItemText primary={t("create")} className="sublist-text" />
              </ListItem>
              <ListItem
                onClick={() => handleOpenUsers(false, false)}
                button
                component={Link}
                to="/view-users"
              >
                <ListItemText primary={t("view")} className="sublist-text" />
              </ListItem>
            </List>
          ) : (
            ""
          )}

          {group === "superadmin" || group === "admin" ? (
            <ListItem
              button
              className="list-box"
              onClick={() => handleOpenParks(false, true)}
            >
              {openParks ? (
                <ListItemIcon children={<ExpandMoreIcon color="action" />} />
              ) : (
                <div className="icon-space" />
              )}
              <ListItemText primary={t("Parks")} className="list-text" />
            </ListItem>
          ) : (
            ""
          )}
          {openParks ? (
            <List className="sublist">
              <ListItem
                onClick={() => handleOpenParks(false, false)}
                button
                component={Link}
                to="/create-park"
              >
                <ListItemText primary={t("create")} className="sublist-text" />
              </ListItem>
              <ListItem
                onClick={() => handleOpenParks(false, false)}
                button
                component={Link}
                to="/view-park"
              >
                <ListItemText primary={t("view")} className="sublist-text" />
              </ListItem>
            </List>
          ) : (
            ""
          )}

          {userPosition !== "operator" ? (
            <ListItem
              button
              className="list-box"
              onClick={() => handleOpenDocManager(false, true)}
            >
              {openDocManager ? (
                <ListItemIcon children={<ExpandMoreIcon color="action" />} />
              ) : (
                <div className="icon-space" />
              )}
              <ListItemText primary={t("documentsManager")} className="list-text" />
            </ListItem>
          ) : (
            ""
          )}
          {openDocManager ? (
            <List className="sublist">
              <ListItem
                onClick={() => handleOpenDocManager(false, false)}
                button
                component={Link}
                to="/create-document"
              >
                <ListItemText primary={t("create")} className="sublist-text" />
              </ListItem>
              <ListItem
                onClick={() => handleOpenDocManager(false, false)}
                button
                component={Link}
                to="/view-document"
              >
                <ListItemText primary={t("view")} className="sublist-text" />
              </ListItem>
            </List>
          ) : (
            ""
          )}



          <ListItem
            button
            component={Link}
            to="/contact"
            className="list-box"
            onClick={handleCheckupUser}
          >
            <div className="icon-space" />
            <ListItemText
              primary={t("contactMachwerk")}
              className="list-text"
            />
          </ListItem>
          <ListItem
            button
            className="list-box"
            onClick={() => {
              Auth.signOut()
                .then(() => {
                  localStorage.clear();
                  props.logout();
                })
                .catch((err) =>
                  toast.error(`${t("errorLogout")} ${t(err.message)}`)
                );
            }}
          >
            <div className="icon-space" />

            <ListItemText primary={t("signOut")} className="list-text" />
          </ListItem>
        </List>
        <img src={Logo} alt="logo" className="Logo" />
      </div>
    </>
  );

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon style={{ color: " #262626" }} />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
          {modalOpen ? (
            <OrderModal open={modalOpen} handleClose={handleCloseOrderModal} />
          ) : null}
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={2000} />
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isFetchedUser: state?.users?.getUser?.isFetched,
    FetchedUserSuccess: state?.users?.getUser?.success,
    FetchedUserError: state?.users?.getUser?.error,
    FetchedUser: state?.users?.getUser?.user,
    Parks: state?.parks?.parks,
    isFetchedBasket: state?.parts?.getOrderFromBasket?.isFetched,
    isSuccessBasket: state?.parts?.getOrderFromBasket?.success,
    Basket: state?.parts?.getOrderFromBasket?.orders,
    parkID: state?.users?.getUser?.user?.park_id,
    isPostAddOrder: state?.parts?.addOrder?.isPost,
    isSuccessAddOrder: state?.parts?.addOrder?.success,
    isSuccessRemoveOrder: state?.parts?.removeOrder?.success,
    bellIcon: state?.parts?.BellIcon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    getOrders: (data) => dispatch(getOrders(data)),
    bellIconReset: () => dispatch(bellIconReset()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
