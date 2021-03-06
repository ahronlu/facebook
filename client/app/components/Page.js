import React, { useEffect } from "react";
import Container from "./Container";

export default function Page({ title, wide, children }) {
  useEffect(() => {
    document.title = `${title} | Facebook`;
    window.scrollTo(0, 0);
  }, [title]);

  return <Container wide={wide}>{children}</Container>;
}
