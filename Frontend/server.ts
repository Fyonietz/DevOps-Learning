import { watch } from "node:fs";

async function build() {
  const result = await Bun.build({
    entrypoints: ["./src/Main.tsx"],
    outdir: "./dist",
    target: "browser",
    format: "esm",
  });

  if (!result.success) {
    console.error("Build failed:", result.logs);
    return;
  }

  console.log("Frontend rebuilt!");
}

await build();

watch("./src", { recursive: true }, async () => {
  await build();
});

Bun.serve({
  port: 5000,

  async fetch(req) {
    const url = new URL(req.url);
 if (url.pathname.startsWith("/api/")) {
      const backend = Bun.env.BACKEND_URL;

      if (!backend) {
        return Response.json(
          { error: "BACKEND_URL is not configured" },
          { status: 500 }
        );
      }

      return fetch(`${backend}${url.pathname}${url.search}`);
    }
    if (url.pathname === "/Main.js") {
      return new Response(Bun.file("./dist/Main.js"), {
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(Bun.file("./index.html"), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log("Running at http://localhost:5000");
