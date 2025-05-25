import { useEffect, useState, useRef } from "react";
import socketIO from "socket.io-client";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";

const socket = socketIO.connect("http://localhost:5000");

const Comments = () => {
  const { category, id } = useParams();
  const commentRef = useRef(null);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    socket.emit("fetchComments", { category, id });

    const handleComments = (data) => {
      setCommentList(data);
    };

    socket.on("comments", handleComments);

    return () => {
      socket.off("comments", handleComments);
    };
  }, [category, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const comment = commentRef.current.value.trim();
    if (!comment) return;

    socket.emit("addComment", {
      comment,
      category,
      id,
      userId: localStorage.getItem("userID"),
    });

    commentRef.current.value = "";
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter un commentaire
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Votre commentaire"
            inputRef={commentRef}
            multiline
            rows={4}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Envoyer
          </Button>
        </form>
      </Paper>

      <Box mt={4}>
        <Typography variant="h6">Commentaires existants</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {commentList?.map((comment) => (
            <Paper key={comment._id || comment.id} sx={{ p: 2 }}>
              <Typography variant="body1">{comment.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                — {comment.name}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Comments;
