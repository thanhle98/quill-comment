import { Fragment, useRef, useState } from "react";
import {
  Box,
  Paper,
  Backdrop,
  Modal,
  Fade,
  Button,
  TextField
} from "@mui/material";
import ReactQuill from "react-quill";
import "quill-comment";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export default function App() {
  const cbRef = useRef();

  function commentAddClick(callback) {
    if (!callback) return;
    setOpen(true);

    cbRef.current = callback; //Appears to do nothing?
    console.log("callback :>> ", callback); //Nothing is ever in the callback
  }

  let currentTimestamp;

  const commentServerTimestamp = () => {
    return new Promise((resolve, reject) => {
      currentTimestamp = Math.round(new Date().getTime() / 1000); // call from server

      resolve(currentTimestamp);
    });
  };

  const commentsClick = (data) => {
    // comments btn callback

    console.log("Comments click", data);
  };

  const commentSave = () => {
    let commentCallback = cbRef.current;
    commentCallback(commentVal);
    addCommentToList(commentVal, currentTimestamp);
  };

  function addCommentToList(comment, currentTimestamp) {
    let utcSeconds = currentTimestamp;
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);

    let id = "ql-comment-123-" + utcSeconds;

    return (
      <div
        class={"comment-box " + id}
        onfocus={() => commentBoxFocus(id)}
        onfocusout={() => commentBoxFocus(id, "out")}
        tabindex="1"
      >
        <div class="comment-head">
          <div class="comment-initials">AR</div>
          <div class="comment-details">
            <div class="comment-author">Arthur Renaldy</div>
          </div>
        </div>
        <div class="comment-body">{comment}</div>
      </div>
    );
  }

  const commentBoxFocus = function (id, type) {
    //$('.ql-comments span.ql-comment').css('background-color', 'yellow');
    //$('#comments .comment-box').css('border-color', '#F0F0F0');
    //if (type!=='out') {
    //	$('.ql-comments #'+id).css('background-color', 'red');
    //	$('#comments .'+id).css('border-color', 'red');
    //}
  };

  const modules = {
    toolbar: [
      //[{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      //[{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link"],
      ["clean"],
      ["contain"],
      ["comments-toggle"],
      ["comments-add"]
    ],
    comment: {
      enabled: true,
      commentAuthorId: 123,
      commentAddOn: "Author Name", // any additional info needed
      color: "yellow", // comment background color in the text
      commentAddClick: commentAddClick, // get called when `ADD COMMENT` btn on options bar is clicked
      commentsClick: commentsClick, // get called when you click `COMMENTS` btn on options bar for you to do additional things beside color on/off. Color on/off is already done before the callback is called.
      commentTimestamp: commentServerTimestamp
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    p: 4
  };
  const [commentVal, setCommentVal] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCommentChange = (e) => {
    setCommentVal(e.target.value);
  };

  const commentModal = (
    <Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              id="outlined-multiline-flexible"
              label="Your comment"
              multiline
              maxRows={4}
              defaultValue="This is some content"
              sx={{ width: "100%" }}
              onChange={handleCommentChange}
            />
            <Button
              sx={{ whiteSpace: "nowrap", width: "220px" }}
              onClick={commentSave}
              disabled={false}
            >
              Add comment
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
  return (
    <Box
      sx={{ minWidth: "850px" }}
      className="editor-wrapper"
      component={Paper}
    >
      {commentModal}
      <ReactQuill theme="snow" modules={modules} defaultValue="" />
    </Box>
  );
}
