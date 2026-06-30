import { useParams } from "react-router-dom";
import { useTree, findNodeByPath } from "../hooks/useTree";
import TreeNodeItem from "../components/TreeNodeItem";
import Breadcrumb from "../components/Breadcrumb";
import Loading from "../components/Loading";

export default function CoursePage() {
  const { "*": splat } = useParams();
  const coursePath = splat ?? "";
  const { tree, loading, error } = useTree();

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  const node = findNodeByPath(tree, coursePath);
  if (!node) {
    return <div className="text-gray-500 text-center py-10">课程不存在</div>;
  }

  const breadcrumbs = [
    { label: "首页", href: "/" },
    { label: node.name },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-xl font-bold text-gray-800 mb-4">{node.name}</h1>
      <div className="border border-gray-200 rounded-lg p-2">
        {node.children?.map((child, i) => (
          <TreeNodeItem key={i} node={child} />
        ))}
      </div>
    </div>
  );
}
