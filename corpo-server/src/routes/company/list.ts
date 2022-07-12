import { FastifyPluginAsync } from "fastify";
import { PoolClient } from "pg";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/list",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                cin: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    async function (request, reply) {
      let client: PoolClient | null = null;

      try {
        client = await fastify.pg.connect();
        const { rows, rowCount } = await client.query(
          "SELECT cin, name FROM companies"
        );

        const companyInfo = [] as { name: string; cin: string }[];
        for (let i = 0; i < rowCount; i++) {
          companyInfo.push({ name: rows[i].name, cin: rows[i].cin });
        }

        return companyInfo;
      } catch (error: any) {
        return fastify.httpErrors.internalServerError(error);
      } finally {
        client?.release();
      }
    }
  );
};

export default root;
