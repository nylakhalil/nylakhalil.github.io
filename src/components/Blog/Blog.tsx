import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BLOG_JSON_ENDPOINT } from "../../config/AppConfig";
import { BlogPostInfo } from "../../types";
import BlogPost from "./BlogPost";

/**
 * Blog Component
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default function Blog() {
  const [posts, setPosts] = useState<Array<BlogPostInfo>>([]);

  useEffect(() => {
    fetch(BLOG_JSON_ENDPOINT)
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      {posts.map((post: BlogPostInfo, index: number) => (
        <BlogPost
          key={"bp-" + post.id}
          id={post.id}
          date={post.date}
          title={post.title}
          body={post.body}
          tags={post.tags}
        />
      ))}
    </Box>
  );
}
