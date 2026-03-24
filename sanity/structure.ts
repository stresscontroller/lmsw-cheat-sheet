import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Sashi Care")
    .items([
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["product", "minicheatsheet1", "minicheatsheet2", "minicheatsheet3", "minicheatsheet4"].includes(item.getId()!)
      ),
      S.divider(),
      S.documentTypeListItem("product").title("Main Cheat Sheet"),
      S.documentTypeListItem("minicheatsheet1").title("Psych Meds Snapshot: LMSW Review"),
      S.documentTypeListItem("minicheatsheet2").title("Crisis Management Mastery: Breakdown & Strategy"),
      S.documentTypeListItem("minicheatsheet3").title("DSM Diagnostic Circle: Full Series (Parts 1–3)"),
      S.documentTypeListItem("minicheatsheet4").title("Social Policy & Legal Essentials: Rapid Review"),
    ]);
