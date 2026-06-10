import fs from "node:fs";
import sharp from "sharp";

const svgPath = "public/images/logo/greenbelt-property-management-logo.svg";
const head = fs.readFileSync(svgPath, "utf8").slice(0, 800);
console.log(head.slice(0, 400));
const meta = await sharp(svgPath).metadata();
console.log("metadata", meta);
