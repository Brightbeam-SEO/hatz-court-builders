import type { StructureResolver } from "sanity/structure";
import {
  CITY_LOCATION_FILTER,
  SERVICE_LOCATION_FILTER,
} from "./constants/locationPageFilters";

function singletonListItem(
  S: Parameters<StructureResolver>[0],
  opts: { title: string; schemaType: string; documentId: string },
) {
  return S.listItem()
    .title(opts.title)
    .child(
      S.document()
        .schemaType(opts.schemaType)
        .documentId(opts.documentId)
        .title(opts.title),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singletonListItem(S, {
        title: "Site settings",
        schemaType: "siteSettings",
        documentId: "siteSettings",
      }),
      singletonListItem(S, {
        title: "Home page",
        schemaType: "homePage",
        documentId: "homePage",
      }),
      S.divider(),
      S.listItem()
        .title("Location pages")
        .id("gpm-location-pages")
        .child(
          S.documentList()
            .id("gpm-location-pages-list")
            .title("Location pages")
            .schemaType("locationPage")
            .filter(CITY_LOCATION_FILTER)
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Service pages")
        .id("gpm-service-pages")
        .child(
          S.documentList()
            .id("gpm-service-pages-list")
            .title("Service pages")
            .schemaType("locationPage")
            .filter(SERVICE_LOCATION_FILTER)
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.divider(),
      S.documentTypeListItem("blogPost").title("Blog posts"),
      S.documentTypeListItem("legalPage").title("Legal"),
      S.documentTypeListItem("faqPage").title("FAQ Page"),
      S.documentTypeListItem("galleryPage").title("Gallery Page"),
      S.documentTypeListItem("contactPage").title("Contact Page"),
      S.documentTypeListItem("reviewsPage").title("Reviews Page"),
    ]);
