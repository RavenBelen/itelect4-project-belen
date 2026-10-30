import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import BettaCard from "./BettaCard";
import type { ApiBetta } from "../types";

describe("BettaCard", () => {
  it("shows the status provided by the betta", () => {
    const betta: ApiBetta = {
      id: "betta-1",
      name: "Blue Moon",
      strain: "Halfmoon",
      gender: "Female",
      age: 4,
      price: 1000,
      status: "Healthy",
    };

    render(
      <MemoryRouter>
        <BettaCard
          betta={betta}
          onDelete={() => {}}
          isDeleting={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Healthy", { exact: true })).toBeInTheDocument();
  });
});