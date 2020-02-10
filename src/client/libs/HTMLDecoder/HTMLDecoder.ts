/**
 * Removes HTML Entities from strings
 * @param htmlString 
 */
export function decodeHTMLEntities(htmlString: string = '') {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = htmlString;
  return textArea.value;
}
