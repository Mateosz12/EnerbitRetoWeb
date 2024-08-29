export class PriceUtils {
    // Extraer el precio de un texto y convertirlo a número
    static extractPrice(text: string): number {
      return parseFloat(text.replace(/[^0-9.]/g, ''));
    }
  }
