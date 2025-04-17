import { OpenAPIV3 } from "openapi-types";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Poll API",
    version: "1.0.0",
    description: "API to create and manage polls",
  },
  paths: {
    "/polls": {
      post: {
        summary: "Create a poll",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  startDate: { type: "string", format: "date-time" },
                  endDate: { type: "string", format: "date-time" },
                  options: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1,
                  },
                },
                required: ["question", "startDate", "endDate", "options"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Poll created successfully",
          },
          400: {
            description: "Validation error",
          },
        },
      },
    },
  },
};
