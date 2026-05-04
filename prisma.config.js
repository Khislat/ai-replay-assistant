import "dotenv/config";
export default defineConfig({
    schema: "prisma/schema.prisma",
    datasource: {
        url: process.env.DATABASE_URL,
    },
});
function defineConfig(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=prisma.config.js.map