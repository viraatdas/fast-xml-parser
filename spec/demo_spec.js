import fs from "fs";

describe("demo XML declaration handling", function () {
  const indexHtml = fs.readFileSync("index.html", "utf8");

  function loadHasXmlDeclaration() {
    const match = indexHtml.match(/function hasXmlDeclaration\(xml\) \{\s*return ([^;]+);\s*\}/);
    if (!match) {
      throw new Error("hasXmlDeclaration helper not found in index.html");
    }
    return new Function("xml", `return ${match[1]};`);
  }

  it("should distinguish XML declarations from xml processing instructions", function () {
    const hasXmlDeclaration = loadHasXmlDeclaration();

    expect(hasXmlDeclaration('<?xml version="1.0"?>\n<note/>')).toEqual(true);
    expect(hasXmlDeclaration('<?xml-stylesheet href="style.xsl" type="text/xsl"?>\n<note/>')).toEqual(false);
  });
});
