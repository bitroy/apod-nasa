import "node-fetch";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import APOD from "./APOD";

const mockServer = setupServer(
  rest.get("https://api.nasa.gov/planetary/apod"),
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          copyright: "NASA",
          date: new Date(),
          explanation: "A testing image",
          hdurl: "hdpicture.jpg",
          title: "NASA APOD Image",
          url: "picture.jpg",
        },
      })
    );
  }
);

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());

describe("Showing Astromomy Picture of the Day", () => {
  test("Verify Valid Elements Shown", async () => {
    render(<APOD />);
    expect(screen.getByTestId("apod-image")).toBeInTheDocument();
    expect(screen.getByTestId("apod-date")).toBeInTheDocument();
    expect(screen.getByTestId("apod-title")).toBeInTheDocument();
    expect(screen.getByTestId("apod-copywright")).toBeInTheDocument();
    expect(screen.getByTestId("apod-explanation")).toBeInTheDocument();
    expect(screen.queryByTestId("apod-errormsg")).not.toBeInTheDocument();
  });
});

describe("Not Showing Astromomy Picture of the Day", () => {
  mockServer.use(
    rest.get("https://api.nasa.gov/planetary/apod"),
    (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          data: {
            code: 404,
            msg: "Not Found!!",
          },
        })
      );
    }
  );

  test("Verify Valid Elements Shown", async () => {
    render(<APOD />);
    expect(screen.queryByTestId("apod-image")).not.toBeInTheDocument();
    expect(screen.queryByTestId("apod-date")).not.toBeInTheDocument();
    expect(screen.queryByTestId("apod-title")).not.toBeInTheDocument();
    expect(screen.queryByTestId("apod-copywright")).not.toBeInTheDocument();
    expect(screen.queryByTestId("apod-explanation")).not.toBeInTheDocument();
    expect(screen.getByTestId("apod-errormsg")).toBeInTheDocument();
  });
});
