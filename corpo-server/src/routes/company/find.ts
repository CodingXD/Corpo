import { FastifyPluginAsync } from "fastify";
import { load } from "cheerio";
import axios from "axios";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/find",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            query: { type: "string", minLength: 1 },
          },
          required: ["query"],
        },
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
      const { query } = request.query as {
        query: string;
      };

      try {
        // Get the search query results
        const { data } = await axios.post(
          "https://www.zaubacorp.com/custom-search",
          {
            search: query,
            filter: "company",
          },
          {
            responseType: "document",
          }
        );

        // strip off the html and get the contents
        const $ = load(data);

        const companyInfo = [] as { name: string; cin: string }[];
        $("div").each((i, el) => {
          const data = el.attribs["id"].split("/");
          companyInfo.push({ cin: data[2], name: data[1] });
        });

        // Send company names to user
        return companyInfo;
      } catch (error: any) {
        return fastify.httpErrors.internalServerError(error);
      }
    }
  );
};

export default root;
