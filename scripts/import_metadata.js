// Small import helper to convert .xlsx or .csv to JSON for metadata mapping imports.
// Usage: node scripts/import_metadata.js <input-file> [output-file]

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function toJSON(inputFile) {
  const ext = path.extname(inputFile).toLowerCase();
  if (ext === '.xlsx' || ext === '.xls') {
    const wb = xlsx.readFile(inputFile);
    const sheetNames = wb.SheetNames;
    const out = {};
    sheetNames.forEach(name => {
      const ws = wb.Sheets[name];
      out[name] = xlsx.utils.sheet_to_json(ws, { defval: null });
    });
    return out;
  }

  if (ext === '.csv') {
    const csv = fs.readFileSync(inputFile, 'utf8');
    // Basic CSV -> array of objects using first line as header
    const lines = csv.split(/\r?\n/).filter(Boolean);
    const headers = lines.shift().split(',').map(h => h.trim());
    return lines.map(line => {
      const vals = line.split(',');
      const obj = {};
      headers.forEach((h, i) => obj[h] = vals[i] ? vals[i].trim() : null);
      return obj;
    });
  }

  throw new Error('Unsupported file type: ' + ext);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node scripts/import_metadata.js <input.xlsx|csv> [output.json]');
    process.exit(1);
  }

  const input = args[0];
  const output = args[1] || (path.basename(input, path.extname(input)) + '.json');

  if (!fs.existsSync(input)) {
    console.error('Input file not found:', input);
    process.exit(2);
  }

  const json = toJSON(input);
  fs.writeFileSync(output, JSON.stringify(json, null, 2), 'utf8');
  console.log('Wrote', output);
}

if (require.main === module) main();
