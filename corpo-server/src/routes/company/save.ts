import { FastifyPluginAsync } from "fastify";
import { PoolClient } from "pg";
import SQL from "sql-template-strings";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/save",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 1 },
            cin: { type: "string", minLength: 1 },
          },
          required: ["name", "cin"],
        },
        response: {
          200: {
            type: "null",
          },
        },
      },
    },
    async function (request, reply) {
      const { name, cin } = request.body as {
        name: string;
        cin: string;
      };
      let client: PoolClient | null = null;

      try {
        console.log("-------------------");
        console.log("-------------------");
        console.log("-------------------");
        console.log({ name, cin });
        console.log("-------------------");
        console.log("-------------------");
        console.log("-------------------");
        client = await fastify.pg.connect();
        await client.query(
          SQL`INSERT INTO companies(name, cin) VALUES(${name}, ${cin}) ON CONFLICT (cin) DO NOTHING`
        );
        return null;
      } catch (error: any) {
        return fastify.httpErrors.internalServerError(error);
      } finally {
        client?.release();
      }
    }
  );
};

export default root;
