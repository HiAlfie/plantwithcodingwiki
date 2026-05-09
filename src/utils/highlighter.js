export function highlightLAU(code) {
  if (!code) return '';
  
  // Escape HTML first to prevent XSS and formatting issues
  let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Regex using named capture groups for different token types
  const tokenRegex = /(?<comment>\/\/.*|--.*)|(?<string>"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|(?<number>\b\d+(?:\.\d+)?\b)|(?<keyword>\b(?:varol|if|then|else|elseif|end|func|loop|from|to|and|or|not|in|pairs)\b)|(?<namespace>\b(?:droneV2|drone|http|math|playerV2|player|market|game|task|string|list|Enum)\b)|(?<builtin>\b(?:print|printn|req|type|pcall|error|tonumber|tostring|clear|inpairs|connect)\b)|(?<property>\.\w+\b)/g;

  let highlighted = escaped.replace(tokenRegex, (...args) => {
    // The last argument is the groups object when using named capture groups
    const groups = args.pop(); 
    
    if (groups.comment) return `<span class="text-gray-500">${groups.comment}</span>`;
    if (groups.string) return `<span class="text-yellow-300">${groups.string}</span>`;
    if (groups.number) return `<span class="text-orange-300">${groups.number}</span>`;
    if (groups.keyword) return `<span class="text-pink-400">${groups.keyword}</span>`;
    if (groups.namespace) return `<span class="text-purple-400">${groups.namespace}</span>`;
    if (groups.builtin) return `<span class="text-blue-400">${groups.builtin}</span>`;
    if (groups.property) return `.<span class="text-blue-300">${groups.property.substring(1)}</span>`;
    
    return args[0]; // the full match
  });

  // Wrap lines in divs to preserve line breaks, similar to manual blocks
  const lines = highlighted.split('\n');
  const formattedLines = lines.map(line => {
    // preserve leading spaces for indentation
    const indentMatch = line.match(/^ +/);
    const indent = indentMatch ? indentMatch[0].replace(/ /g, '&nbsp;') : '';
    const content = line.replace(/^ +/, '');
    
    return `<div class="code-line">${indent}${content || '&#8203;'}</div>`;
  }).join('');

  return formattedLines;
}
