import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarsIcon from "@material-ui/icons/Stars";
import Textarea from "./Textarea";
import UploadIcon from "../assets/images/generated/upload-icon.svg";
import CloseIcon from "@material-ui/icons/Close";
import "../styles/components/PaperCard.scss";
import { backgroundColor as BackgroundColor } from "../Constants";
import Loader from "./Loader";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import DoneIcon from "@material-ui/icons/Done";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Storage } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function PaperCard({
  heading,
  description,
  backgroundColor,
  ratingColor,
  showHours,
  ratingValue,
  hours,
  id,
  editCheckup,
  onClickHeading,
  onChangeRating,
  onChangeDes,
  onSave,
  main,
  ratingReadonly,
  loading,
  error,
  openPaper,
  handleOpenDesPaper,
  taskLoader,
  onChangeImage,
  images,
  onRemoveImage,
  taskIndex,
  lastCheckups,
  imageLoader,
  PastOrders,
  Baskets,
}) {
  const [imagesArr, setImagesArr] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const width = window.screen.width;
  const { t } = useTranslation();

  const StyledRating = withStyles({
    iconFilled: {
      color: ratingColor,
    },
    iconHover: {
      color: ratingColor,
    },
  })(Rating);

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
      padding: "0px",
    },
  });
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const handleOpenPaper = (open) => {
    if (open) {
      if (editCheckup) {
        handleOpenDesPaper(true);
      } else if (main) onClickHeading();
      else if (PastOrders) onClickHeading();
    } else {
      onSave();
    }
  };

  const extensionFinder = (str, data) => {
    return str.includes(data);
  };

  useEffect(() => {
    let imagesArray = [];
    if (images?.length) {
      images.forEach((image) => {
        Storage.get(image)
          .then((res) => {
            if (
              extensionFinder(res, ".jpeg") ||
              extensionFinder(res, ".png") ||
              extensionFinder(res, ".jpg")
            ) {
              imagesArray.push({
                original: res,
                thumbnail: res,
              });
            } else {
              imagesArray.push({
                original: res,
                thumbnail:
                  "https://p.kindpng.com/picc/s/477-4772276_button-computer-icons-thepix-youtube-youtube-play-button.png",

                renderItem: (e) => renderVideos(e),
              });
            }
            setImagesArr(imagesArray);
          })
          .catch((err) => toast.error(t("errorFetchingImgs"), t(err.message)));
      });
    } else setImagesArr(imagesArray);
  }, [images?.length]);

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  const handleOpenGallery = (imageIndex) => {
    setShowGallery(true);
    setStartIndex(imageIndex);
  };
  const renderVideos = (res) => {
    return (
      <video
        controls
        disablePictureInPicture
        controlsList="nodownload"
        className="videoGallery"
      >
        <source src={res.original} />
      </video>
    );
  };

  return (
    <>
      <div className="PaperCard" id={id} key={id}>
        <Dialog
          onClose={handleCloseGallery}
          aria-labelledby="simple-dialog-title"
          open={showGallery}
          maxWidth="md"
          fullWidth
          className="modal"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleCloseGallery}
          />
          <Fade in={showGallery}>
            <div>
              <ImageGallery
                items={imagesArr}
                showPlayButton={false}
                startIndex={startIndex}
                className="imageGallery"
              />
            </div>
          </Fade>
        </Dialog>

        <Grid container key={`${id}+${id}`}>
          <Paper
            className="item"
            style={{
              backgroundColor: openPaper
                ? BackgroundColor.black
                : backgroundColor
                ? backgroundColor
                : "#fff",
              border: backgroundColor ? backgroundColor : "1px solid #262625",
              padding: showHours ? "17px 10px 7px 10px" : "0",
              cursor:
                editCheckup || main || PastOrders || Baskets
                  ? "pointer"
                  : "default",
            }}
            key={`${id}+${id} + ${id}`}
          >
            <Grid
              container
              style={{
                marginBottom: openPaper ? 5 : 0,
                padding: 0,
                height: "59px",
              }}
            >
              <Grid
                item
                xs={6}
                sm={9}
                md={10}
                lg={11}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: lastCheckups ? "0" : "0vmax 0.8vmax",
                  margin: lastCheckups ? "-30px 0px 0px" : "0",
                }}
                className="heading-box"
                onClick={() => !openPaper && handleOpenPaper(true)}
              >
                <h1
                  style={{
                    color: openPaper || backgroundColor ? "#fff" : "#262625",
                    cursor:
                      editCheckup || main || PastOrders || Baskets
                        ? "pointer"
                        : "text",
                    margin: PastOrders ? "10px 0px 0px 10px" : "0px",
                  }}
                  className="heading"
                >
                  {t(heading)}

                  {!!main &&
                    !!(taskLoader.loader && taskLoader.id === taskIndex) && (
                      <span className="loaderMargin">
                        <Loader height={30} width={30} />
                      </span>
                    )}
                </h1>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                md={2}
                lg={1}
                style={{
                  padding: lastCheckups ? "0" : "0vmax 0.8vmax",
                  margin: lastCheckups ? "-32px 0px 0px" : "0",
                }}
                onClick={() =>
                  !openPaper && (main || PastOrders) && handleOpenPaper(true)
                }
                className="rating"
              >
                {!Baskets && !PastOrders ? (
                  <StyledRating
                    id={id}
                    onChange={onChangeRating}
                    name={`customized-color ${id}`}
                    value={ratingValue}
                    getLabelText={(value) =>
                      `${value} Star${value !== 1 ? "s" : ""}`
                    }
                    readOnly={ratingReadonly}
                    precision={1}
                    icon={
                      <StarsIcon fontSize={width < 768 ? "inherit" : "large"} />
                    }
                    emptyIcon={
                      <StarsIcon
                        fontSize={width < 768 ? "inherit" : "large"}
                        style={{
                          color: backgroundColor ? "white" : "grey",
                        }}
                      />
                    }
                  />
                ) : null}
              </Grid>
            </Grid>
            {openPaper ? (
              <div className="textAreaParent">
                <p className="error">{error}</p>
                <Textarea
                  value={description}
                  onChange={onChangeDes}
                  name="description"
                  id="description"
                  placeholder={t("Textarea")}
                />
                <div className="images">
                  {imagesArr.length
                    ? imagesArr.map((image, index) => (
                        <div key={index} className="image">
                          {extensionFinder(image.original, ".jpeg") ||
                          extensionFinder(image.original, ".png") ||
                          extensionFinder(image.original, ".jpg") ? (
                            <img
                              src={image.original}
                              alt={`${index}`}
                              onClick={() => handleOpenGallery(index)}
                            />
                          ) : (
                            <video
                              onClick={() => handleOpenGallery(index)}
                              width="70"
                              height="70"
                            >
                              <source src={image.original} />
                            </video>
                          )}

                          <CloseIcon
                            color="inherit"
                            className="remove-image"
                            onClick={() => onRemoveImage(index)}
                          />
                        </div>
                      ))
                    : ""}
                </div>
                <div className="image-options">
                  <span className="upload-icon" key="image-upload">
                    <label for="image">
                      {imageLoader ? (
                        <Loader
                          color={"#fff"}
                          type="spin"
                          height={40}
                          width={40}
                        />
                      ) : (
                        <img
                          src={UploadIcon}
                          alt="upload"
                          className="icon"
                        ></img>
                      )}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, video/*"
                      placeholder=""
                      id="imageURI"
                      className="input-img"
                      alt="image"
                      onChange={onChangeImage}
                      name="image"
                      disabled={imageLoader || loading}
                      multiple
                    />
                  </span>
                  <span
                    className="upload-icon"
                    onClick={() => handleOpenPaper(false)}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader
                        color={"#fff"}
                        type="spin"
                        height={40}
                        width={40}
                      />
                    ) : (
                      <DoneIcon style={{ color: "#fff" }} />
                    )}
                  </span>
                </div>
              </div>
            ) : (
              !!description && (
                <p
                  className="description"
                  style={{
                    marginTop: openPaper ? 5 : 15,
                    color: editCheckup ? "#fff" : "#c2c2c2",
                    padding: lastCheckups ? "0.2vw 0vw" : "0.2vw 0.8vw 0.7vw",
                    marginBottom: PastOrders ? "10px" : "0px",
                    marginLeft: PastOrders ? "15px" : "0px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => !openPaper && handleOpenPaper(true)}
                >
                  {PastOrders ? `${t("By")} ${description}` : description}
                </p>
              )
            )}
            {!!(imagesArr.length && !openPaper) && (
              <div className="images images-padding">
                {imagesArr.map((image, index) => (
                  <div key={index} className="image">
                    {extensionFinder(image.original, ".jpeg") ||
                    extensionFinder(image.original, ".png") ||
                    extensionFinder(image.original, ".jpg") ? (
                      <img
                        src={image.original}
                        alt={`${index}`}
                        onClick={() => handleOpenGallery(index)}
                      />
                    ) : (
                      <video
                        onClick={() => handleOpenGallery(index)}
                        width="70"
                        height="70"
                      >
                        <source src={image.original} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
                <div
                  className="image imgParent"
                  onClick={() => !openPaper && handleOpenPaper(true)}
                ></div>
              </div>
            )}

            {!!showHours && (
              <p className="op-hours op-hours-padding">
                {t("operatingHours")} {hours}
              </p>
            )}
          </Paper>
        </Grid>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={2000} />
      </div>
    </>
  );
}

export default PaperCard;
