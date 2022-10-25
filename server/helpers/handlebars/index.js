const { reaction } = require("../../models/reaction.model");
const { comment } = require("../../models/comment.model");
const { parseISO, formatDistanceToNow } = require("date-fns");

const getReactions = (postId) => {
  const reactionEmoji = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
  };

  const data = Object.entries(reactionEmoji).map(([reactionName, emoji]) => {
    return {
      emoji,
      postId,
      reactionName,
      reactionCount: reaction.find((r) => r.postId === postId)[reactionName],
    };
  });

  // var results = "";
  // data.forEach((item) => {
  //   results += opt.fn(item);
  // });
  return data;
};

const timeAgo = (timestamp) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return timeAgo;
};

const getComments = (commentIdList) => {
  return commentIdList
    ? comment.filter((c) => commentIdList.includes(c.id))
    : [];
};

const getShortContent = (content) => {
  if (content.length < 150) {
    return content;
  }

  return content.substring(0, 150) + "...";
};

module.exports = {
  getReactions,
  timeAgo,
  getComments,
  getShortContent,
};
