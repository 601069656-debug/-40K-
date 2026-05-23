const tests = [
  "WS:45(40+5)",
  "WS:40",
  "WS:45 (+5)",
  "WS:45(40 - 5)",
  "WS:45 (基础40 + 5加成)",
  "WS:45 (+5加成)",
  "武器技能： 50 （45+5）"
];

function parseBaseAttribute(params, key, cname) {
  const regex = new RegExp(`(?:${key}|${cname})[:：]?\\s*([^,，;；]+)`, 'i');
  const match = params.match(regex);
  if (!match) return null;
  const segment = match[1];
  
  // Try to find the base value inside parentheses with a + or - sign
  const complexMatch = segment.match(/[\(（][^\d]*(\d+)\s*[\+\-]/);
  if (complexMatch) {
    return parseInt(complexMatch[1], 10);
  }
  
  // Fallback: just return the first number in the segment
  const simpleMatch = segment.match(/(\d+)/);
  if (simpleMatch) {
    return parseInt(simpleMatch[1], 10);
  }
  
  return null;
}

tests.forEach(t => console.log(t, '->', parseBaseAttribute(t, 'WS', '武器技能')));
