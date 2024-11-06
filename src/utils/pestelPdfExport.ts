import jsPDF from 'jspdf';
import { icons } from './icons';

interface PESTELData {
  id: string;
  title: string;
  content: {
    political: string[];
    economic: string[];
    social: string[];
    technological: string[];
    environmental: string[];
    legal: string[];
  };
  project_name: string;
  author: string;
  date: string;
  comments: string;
}

const formatDate = (date: string | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString();
  }
  return 'N/A';
};

const drawGeneralInfoPage = (doc: jsPDF, canvas: PESTELData) => {
  doc.addPage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PESTEL Analysis Information', pageWidth / 2, margin + 10, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const boxWidth = (pageWidth - margin * 3) / 2;
  const boxHeight = 30;
  const startY = margin + 40;

  const drawInfoBox = (label: string, value: string, x: number, y: number) => {
    doc.setFillColor(240, 240, 240);
    doc.rect(x, y, boxWidth, boxHeight, 'F');
    doc.setTextColor(100, 100, 100);
    doc.text(label, x + 5, y + 15);
    doc.setTextColor(0, 0, 0);
    doc.text(value || 'N/A', x + 5, y + 25);
  };

  drawInfoBox('Project Name', canvas.project_name || 'N/A', margin, startY);
  drawInfoBox('Author', canvas.author || 'N/A', margin * 2 + boxWidth, startY);
  drawInfoBox('Date', formatDate(canvas.date), margin, startY + boxHeight + 10);

  doc.text('Comments:', margin, startY + boxHeight * 2 + 30);
  const splitComments = doc.splitTextToSize(canvas.comments || 'No comments', pageWidth - margin * 2);
  doc.text(splitComments, margin, startY + boxHeight * 2 + 45);
};

const addIconToPDF = (doc: jsPDF, iconKey: keyof typeof icons, x: number, y: number, width: number, height: number) => {
  if (icons[iconKey]) {
    const iconData = icons[iconKey].split(',')[1]; // Remove the data:image/png;base64, part
    doc.addImage(iconData, 'PNG', x, y, width, height);
  }
};

export function exportPESTELToPDF(canvas: PESTELData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  // Calculamos las dimensiones del mapa PESTEL
  const mapWidth = pageWidth - (margin * 2);
  const mapHeight = pageHeight - (margin * 2) - 20; // Restamos 20 para el título
  const startX = margin;
  const startY = margin + 20; // Añadimos 20 para el título

  // Calculamos las dimensiones de cada sección
  const sectionWidth = mapWidth / 3;
  const sectionHeight = mapHeight / 2;

  try {
    // Añadimos el título del canvas
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'PESTEL Analysis', pageWidth / 2, margin + 10, { align: 'center' });

    // Dibujamos el marco exterior
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(startX, startY, mapWidth, mapHeight);

    // Dibujamos las líneas internas
    doc.line(startX + sectionWidth, startY, startX + sectionWidth, startY + mapHeight);
    doc.line(startX + sectionWidth * 2, startY, startX + sectionWidth * 2, startY + mapHeight);
    doc.line(startX, startY + sectionHeight, startX + mapWidth, startY + sectionHeight);

    // Añadimos los iconos
    const iconSize = 10;
    addIconToPDF(doc, 'political', startX + 5, startY + 5, iconSize, iconSize);
    addIconToPDF(doc, 'economic', startX + sectionWidth + 5, startY + 5, iconSize, iconSize);
    addIconToPDF(doc, 'social', startX + sectionWidth * 2 + 5, startY + 5, iconSize, iconSize);
    addIconToPDF(doc, 'technological', startX + 5, startY + sectionHeight + 5, iconSize, iconSize);
    addIconToPDF(doc, 'environmental', startX + sectionWidth + 5, startY + sectionHeight + 5, iconSize, iconSize);
    addIconToPDF(doc, 'legal', startX + sectionWidth * 2 + 5, startY + sectionHeight + 5, iconSize, iconSize);

    // Configuración del texto
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    // Añadimos los títulos de las secciones
    doc.text('Political', startX + 20, startY + 15);
    doc.text('Economic', startX + sectionWidth + 20, startY + 15);
    doc.text('Social', startX + sectionWidth * 2 + 20, startY + 15);
    doc.text('Technological', startX + 20, startY + sectionHeight + 15);
    doc.text('Environmental', startX + sectionWidth + 20, startY + sectionHeight + 15);
    doc.text('Legal', startX + sectionWidth * 2 + 20, startY + sectionHeight + 15);

    // Función helper para añadir contenido
    const addContent = (items: string[], x: number, y: number, maxWidth: number, maxHeight: number) => {
      if (Array.isArray(items)) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        let currentY = y;
        items.forEach((item) => {
          const lines = doc.splitTextToSize(item, maxWidth - 10);
          doc.text(`• ${lines[0]}`, x, currentY);
          currentY += 5;
          
          // For additional lines, don't add bullet points
          for (let i = 1; i < lines.length; i++) {
            if (currentY < y + maxHeight - 5) {
              doc.text(lines[i], x + 3, currentY);
              currentY += 5;
            }
          }
        });
      }
    };

    // Añadimos el contenido de cada sección
    addContent(canvas.content.political, startX + 10, startY + 25, sectionWidth - 10, sectionHeight - 25);
    addContent(canvas.content.economic, startX + sectionWidth + 10, startY + 25, sectionWidth - 10, sectionHeight - 25);
    addContent(canvas.content.social, startX + sectionWidth * 2 + 10, startY + 25, sectionWidth - 10, sectionHeight - 25);
    addContent(canvas.content.technological, startX + 10, startY + sectionHeight + 25, sectionWidth - 10, sectionHeight - 25);
    addContent(canvas.content.environmental, startX + sectionWidth + 10, startY + sectionHeight + 25, sectionWidth - 10, sectionHeight - 25);
    addContent(canvas.content.legal, startX + sectionWidth * 2 + 10, startY + sectionHeight + 25, sectionWidth - 10, sectionHeight - 25);

    // Añadimos la página de información general
    drawGeneralInfoPage(doc, canvas);

    // Guardamos el PDF
    const filename = `${(canvas.title || 'pestel-analysis').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}