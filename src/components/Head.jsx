import { Box, Typography } from "@mui/material";

const Head = ({ title, subTitle, align = "left" }) => {
  return (
    <Box mb={2}>
      <Typography variant="h4" sx={{ textAlign: align }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: align, color: "gray" }}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Head;
