export const getFirstSentence = (text) => {
  // Utiliser une expression régulière pour trouver la première phrase
  const firstSentenceMatch = text.match(/.*?[.!?]/);

  // Si une phrase est trouvée, on la retourne avec des points de suspension
  return firstSentenceMatch
    ? `${firstSentenceMatch[0].trim()}...`
    : `${text.trim()}...`;
};
