import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BettaPage from "./BettaPage";
import type { ApiBetta } from "../types";

describe("BettaPage form", () => {
  it("shows the schema error and does not send a request for an invalid betta", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: Infinity },
      },
    });

    queryClient.setQueryData<ApiBetta[]>(["bettas"], []);

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("[]"));

    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <BettaPage />
      </QueryClientProvider>
    );

    await user.click(screen.getByRole("button", { name: "Add Betta" }));

    expect(
      await screen.findByText("Name must contain at least 3 characters.")
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    queryClient.clear();
  });
});