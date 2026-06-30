import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

function serveNotesPlugin() {
  const notesDir = path.resolve(__dirname, "notes");
  return {
    name: "serve-notes",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url?.startsWith("/notes/")) {
          const filePath = path.join(notesDir, req.url.slice(7));
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(content);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveNotesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
