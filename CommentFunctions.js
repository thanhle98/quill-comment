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

const commentSave = () => {
  let comment = $("#commentInput").val();
  commentCallback(comment);

  addCommentToList(comment, currentTimestamp);
};

const commentBoxFocus = function (id, type) {
  $(".ql-comments span.ql-comment").css("background-color", "yellow");
  $("#comments .comment-box").css("border-color", "#F0F0F0");
  if (type !== "out") {
    $(".ql-comments #" + id).css("background-color", "red");
    $("#comments ." + id).css("border-color", "red");
  }
};
