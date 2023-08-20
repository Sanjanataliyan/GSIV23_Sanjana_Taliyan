import { render, fireEvent, screen } from "@testing-library/react";
const axios = require ("axios");
import MoviesDashboard from "./Pages/Movies/MoviesDashboard";

jest.mock("axios");

const dummyMovie = [
{
userId: 1,
id: 1,
title: "movie 1",
completed: false,
},
{
userId: 1,
id: 2,
title: "movie 2",
completed: false,
},
{
userId: 1,
id: 3,
title: "movie 3",
completed: false,
},
];

test("Movies list", async () => {
axios.get.mockResolvedValue({ data: dummyMovie });
render(<MoviesDashboard />);

const moviesList = await waitFor(() => screen.findAllByTestId("movie"));

expect(moviesList).toHaveLength(3);
});