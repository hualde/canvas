import jsPDF from 'jspdf';
import { icons } from './icons';

interface EmpathyMapData {
  id: string;
  title: string;
  content: {
    thinkAndFeel: string[];
    see: string[];
    hear: string[];
    sayAndDo: string[];
    pains: string[];
    gains: string[];
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

const drawGeneralInfoPage = (doc: jsPDF, canvas: EmpathyMapData) => {
  doc.addPage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Empathy Map Information', pageWidth / 2, margin + 10, { align: 'center' });

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

const drawDiagonalLine = (doc: jsPDF, startX: number, startY: number, endX: number, endY: number) => {
  doc.line(startX, startY, endX, endY);
};

export function exportEmpathyMapToPDF(canvas: EmpathyMapData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Calculamos las dimensiones del mapa
  const mapWidth = pageWidth - (margin * 2);
  const mapHeight = pageHeight - (margin * 3) - 30;
  const startX = margin;
  const startY = margin + 20;

  // Calculamos el punto central y el radio del círculo
  const centerX = startX + (mapWidth / 2);
  const centerY = startY + (mapHeight * 0.4); // El centro está más arriba que el medio
  const circleRadius = 15;

  try {
    // Dibujamos el marco exterior
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(startX, startY, mapWidth, mapHeight);

    // Dibujamos el círculo central
    doc.circle(centerX, centerY, circleRadius, 'S');
    
    // Dibujamos las líneas diagonales desde el centro
    drawDiagonalLine(doc, centerX, centerY, startX, startY); // Izquierda superior
    drawDiagonalLine(doc, centerX, centerY, startX + mapWidth, startY); // Derecha superior
    drawDiagonalLine(doc, centerX, centerY, startX, centerY + (mapHeight * 0.6)); // Izquierda inferior
    drawDiagonalLine(doc, centerX, centerY, startX + mapWidth, centerY + (mapHeight * 0.6)); // Derecha inferior

    // Dibujamos la línea horizontal para Pains y Gains
    doc.line(startX, centerY + (mapHeight * 0.6), startX + mapWidth, centerY + (mapHeight * 0.6));
    
    // Dibujamos la línea vertical que separa Pains y Gains
    doc.line(centerX, centerY + (mapHeight * 0.6), centerX, startY + mapHeight);

    // Configuración del texto
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    // Añadimos los títulos de las secciones
    doc.text('Think & feel', centerX, startY + 15, { align: 'center' });
    doc.text('See', startX + mapWidth - 20, centerY - 20);
    doc.text('Hear', startX + 20, centerY - 20);
    doc.text('Say & do', centerX, centerY + (mapHeight * 0.6) - 10, { align: 'center' });
    doc.text('Pains', startX + (mapWidth / 4), centerY + (mapHeight * 0.8));
    doc.text('Gains', startX + (mapWidth * 3/4), centerY + (mapHeight * 0.8));

    // Añadimos el contenido de cada sección
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Función helper para añadir contenido
    const addContent = (items: string[], x: number, y: number, maxWidth: number) => {
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          const lines = doc.splitTextToSize(item, maxWidth);
          lines.forEach((line: string, lineIndex: number) => {
            doc.text(`• ${line}`, x, y + (index * 5) + (lineIndex * 5));
          });
        });
      }
    };

    // Añadimos el contenido en cada sección
    const sectionWidth = mapWidth / 3;
    
    // Think & Feel
    addContent(canvas.content.thinkAndFeel || [], centerX - sectionWidth/2, startY + 25, sectionWidth);
    
    // See
    addContent(canvas.content.see || [], centerX + 20, centerY - 15, sectionWidth);
    
    // Hear
    addContent(canvas.content.hear || [], startX + 10, centerY - 15, sectionWidth);
    
    // Say & Do
    addContent(canvas.content.sayAndDo || [], centerX - sectionWidth/2, centerY + 10, sectionWidth);
    
    // Pains
    addContent(canvas.content.pains || [], startX + 10, centerY + (mapHeight * 0.6) + 20, mapWidth/2 - 20);
    
    // Gains
    addContent(canvas.content.gains || [], centerX + 10, centerY + (mapHeight * 0.6) + 20, mapWidth/2 - 20);

    // Añadimos la página de información general
    drawGeneralInfoPage(doc, canvas);

    // Guardamos el PDF
    const filename = `${(canvas.title || 'empathy-map').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}