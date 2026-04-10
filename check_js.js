const fs = require('fs');
const html = fs.readFileSync('/Users/design-mt/Desktop/zo_final/zo_system_private.html.html', 'utf8');
const match = html.match(/<script>(.*?)<\/script>/s);
if (match) {
  const js = match[1];
  fs.writeFileSync('/Users/design-mt/Desktop/zo_final/extracted.js', js);
  console.log("Extracted to extracted.js");
}
