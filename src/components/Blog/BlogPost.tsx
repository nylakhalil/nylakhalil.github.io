import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { BlogPostInfo } from "../../types";
import DOMPurify from "dompurify";
import { useState } from "react";

const clean = (content: string) => {
  return DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
};

export default function BlogPost(props: BlogPostInfo) {
  const { id, date, title, body, tags } = props;
  const [collapsed, isCollapsed] = useState(false);

  const handleClick = () => {
    isCollapsed(!collapsed);
  };

  return (
    <>
      <Card
        id={"post-" + id}
        key={"post-" + id}
        variant="elevation"
        elevation={3}
        sx={{ width: "100%", mt: 2 }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {title.charAt(0)}
            </Avatar>
          }
          action={
            <Tooltip title={collapsed ? "Expand" : "Collapse"}>
              <IconButton
                aria-label={collapsed ? "Expand" : "Collapse"}
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={collapsed ? faCaretDown : faCaretUp} />
              </IconButton>
            </Tooltip>
          }
          title={title}
          titleTypographyProps={{ variant: "h6" }}
          subheader={date}
        />
        <CardContent sx={{ display: collapsed ? "none" : "flex" }}>
          <Typography
            gutterBottom
            variant="h5"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          ></Typography>
          <Box color="text.secondary">
            {<div dangerouslySetInnerHTML={{ __html: clean(body) }} />}
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: collapsed ? "none" : "flex",
            justifyContent: "flex-end",
          }}
        >
          {tags.map((tag: string, index: number) => (
            <Chip key={"chip-" + index} label={tag} variant="outlined" />
          ))}
        </CardActions>
      </Card>
    </>
  );
}
