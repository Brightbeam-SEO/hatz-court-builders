import { Archivo, Big_Shoulders } from "next/font/google";

/** Body, nav, buttons, H3+ titles */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

/** Hero H1, major section H2s, impact headlines */
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});
