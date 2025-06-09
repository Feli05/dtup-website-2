// Custom Node.js loader to handle asset imports in ESM context
export async function resolve(specifier, context, nextResolve) {
  // Handle asset files that can't be imported in Node.js ESM
  const assetExtensions = ['.css', '.scss', '.sass', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'];
  
  if (assetExtensions.some(ext => specifier.endsWith(ext))) {
    return {
      url: 'data:text/javascript,export default "";',
      shortCircuit: true,
    };
  }
  
  // Otherwise, use the default resolver
  return nextResolve(specifier, context);
} 