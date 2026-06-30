import { useNavigate } from "react-router-dom";
import { useTree } from "../hooks/useTree";
import Loading from "../components/Loading";

export default function HomePage() {
  const { tree, loading, error } = useTree();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  const courses = tree?.children ?? [];

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">静态笔记</h1>
      <p className="text-gray-400 mb-8 text-sm">选择课程开始阅读</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {courses.map((course, i) => (
          <button
            key={i}
            onClick={() => navigate(`/course/${course.path}`)}
            className="group text-left p-5 bg-white border border-gray-200 rounded-xl
                       hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <div className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {course.name}
            </div>
            {course.children && (
              <div className="text-xs text-gray-400 mt-1.5">
                {countNotes(course.children)} 个笔记
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/** 递归统计笔记数量 */
function countNotes(node: { isLeaf?: boolean; children?: any[] }): number {
  if (node.isLeaf) return 1;
  return node.children?.reduce((sum, c) => sum + countNotes(c), 0) ?? 0;
}
