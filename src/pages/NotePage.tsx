import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTree, findNodeByPath } from "../hooks/useTree";
import Breadcrumb from "../components/Breadcrumb";
import Loading from "../components/Loading";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import { BASE, withBase } from "../utils/base";

export default function NotePage() {
  const { "*": splat } = useParams();
  const notePath = splat ?? "";
  const { tree, loading: treeLoading } = useTree();

  const [html, setHtml] = useState<string | null>(null);
  const [loadingNote, setLoadingNote] = useState(true);
  const [noteError, setNoteError] = useState<string | null>(null);

  useEffect(() => {
    if (!notePath) return;
    setLoadingNote(true);
    setNoteError(null);

    fetch(withBase(`/notes/${notePath}.html`))
      .then((res) => {
        if (!res.ok) throw new Error("笔记不存在");
        return res.text();
      })
      .then((text) => {
        // 注入 <base> 标签，使 HTML 中的相对路径（图片等）正确解析
        const dir = notePath.includes("/")
          ? notePath.substring(0, notePath.lastIndexOf("/") + 1)
          : "";
        const baseHref = `${BASE}notes/${dir}`;
        const processed = text.replace(
          /<\/title>/i,
          `</title><base href="${baseHref}">`
        );
        setHtml(processed);
      })
      .catch((err) => {
        setNoteError(err.message);
      })
      .finally(() => {
        setLoadingNote(false);
      });
  }, [notePath]);

  useEffect(() => {
    if (html) {
      hljs.highlightAll();
    }
  }, [html]);

  if (treeLoading || loadingNote) return <Loading />;

  const node = tree ? findNodeByPath(tree, notePath) : null;
  if (!node) {
    return <div className="text-gray-500 text-center py-10">笔记不存在</div>;
  }

  if (noteError) {
    return <div className="text-red-500 text-center py-10">{noteError}</div>;
  }

  const parts = node.path.split("/");
  const breadcrumbs = [
    { label: "首页", href: "/" },
    ...parts.slice(0, -1).map((_, idx) => {
      const p = parts.slice(0, idx + 1).join("/");
      return { label: parts[idx], href: `/course/${p}` };
    }),
    { label: node.name },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />
      <article
        className="note-content"
        dangerouslySetInnerHTML={{ __html: html ?? "" }}
      />
    </div>
  );
}
