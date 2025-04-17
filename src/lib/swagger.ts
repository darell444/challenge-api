import { OpenAPIV3 } from "openapi-types";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Challenge API",
    version: "1.0.0",
    description:
      "API developed by Pedro Fioravante [GitHub](https://github.com/fioravante-dev/)",
  },
  servers: [
    { url: "http://localhost:3333", description: "Development server" },
  ],
  paths: {
    "/polls": {
      get: {
        summary: "List all polls",
        description: "Returns all polls. Optionally filters polls by status.",
        tags: ["Polls"],
        parameters: [
          {
            name: "status",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["NOT_STARTED", "STARTED", "IN_PROGRESS", "FINISHED"],
            },
            description: "Filter polls by status (optional)",
          },
        ],
        responses: {
          "200": { description: "List of polls returned successfully" },
        },
      },
      post: {
        summary: "Create a new poll",
        tags: ["Polls"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["question", "startDate", "endDate", "options"],
                properties: {
                  question: { type: "string" },
                  startDate: { type: "string", format: "date-time" },
                  endDate: { type: "string", format: "date-time" },
                  options: {
                    type: "array",
                    minItems: 3,
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Poll created successfully" },
          "400": { description: "Validation error" },
        },
      },
    },
    "/polls/{id}": {
      put: {
        summary: "Update a poll",
        tags: ["Polls"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
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
                    minItems: 3,
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Poll updated successfully" },
          "403": { description: "Poll already started, cannot edit" },
          "400": { description: "Validation error" },
        },
      },
      delete: {
        summary: "Delete a poll",
        tags: ["Polls"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "204": { description: "Poll deleted successfully" },
          "404": { description: "Poll not found" },
        },
      },
    },
    "/polls/{id}/vote": {
      post: {
        summary: "Vote on a poll option",
        tags: ["Polls"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["optionId"],
                properties: { optionId: { type: "string", format: "uuid" } },
              },
            },
          },
        },
        responses: {
          "204": { description: "Vote registered successfully" },
          "403": { description: "Poll is not open for voting" },
          "404": { description: "Poll or option not found" },
        },
      },
    },
  },
};
