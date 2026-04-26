import "dotenv/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	datasource: {
		url: process.env.DATABASE_URL!,
	},
});
function defineConfig(arg0: { schema: string; datasource: { url: string } }) {
	throw new Error("Function not implemented.");
}
