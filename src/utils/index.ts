import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  } catch {
    return "Data inválida";
  }
};

export const formatImageUri = (uri?: string): string | undefined => {
  if (!uri) return undefined;

  // Se for uma URL completa, retorna como está
  if (uri.startsWith("http")) return uri;

  // Se for um caminho local, adiciona o prefixo necessário
  return `file://${uri}`;
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
