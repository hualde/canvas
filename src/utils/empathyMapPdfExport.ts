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

const addIconToPDF = (doc: jsPDF, iconKey: keyof typeof icons, x: number, y: number, width: number, height: number) => {
  if (icons[iconKey]) {
    const iconData = icons[iconKey].split(',')[1]; // Remove the data:image/png;base64, part
    doc.addImage(iconData, 'PNG', x, y, width, height);
  }
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
  const centerY = startY + (mapHeight * 0.5);
  const circleRadius = 15;

  // Calculamos las dimensiones de las secciones principales y de Pain/Gain
  const mainSectionHeight = mapHeight * 0.7;
  const painGainSectionHeight = mapHeight * 0.3;

  try {
    // Dibujamos el marco exterior
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(startX, startY, mapWidth, mapHeight);

    // Dibujamos el círculo central
    doc.circle(centerX, centerY, circleRadius, 'S');
    
    // Dibujamos las líneas diagonales desde el centro
    doc.line(centerX, centerY, startX, startY); // Izquierda superior
    doc.line(centerX, centerY, startX + mapWidth, startY); // Derecha superior
    doc.line(centerX, centerY, startX, startY + mainSectionHeight); // Izquierda inferior
    doc.line(centerX, centerY, startX + mapWidth, startY + mainSectionHeight); // Derecha inferior

    // Dibujamos los bordes de Pains y Gains
    const bottomSectionY = startY + mainSectionHeight;
    doc.line(startX, bottomSectionY, startX + mapWidth, bottomSectionY);
    doc.line(centerX, bottomSectionY, centerX, startY + mapHeight);

    // Añadimos los iconos
    const iconSize = 10;
    addIconToPDF(doc, 'think', centerX - iconSize/2, startY + 20, iconSize, iconSize);
    addIconToPDF(doc, 'see', startX + mapWidth - 40, centerY - 30, iconSize, iconSize);
    addIconToPDF(doc, 'hear', startX + 20, centerY - 30, iconSize, iconSize);
    addIconToPDF(doc, 'sayDo', centerX - iconSize/2, startY + mainSectionHeight - 30, iconSize, iconSize);
    addIconToPDF(doc, 'pain', startX + 20, bottomSectionY + 10, iconSize, iconSize);
    addIconToPDF(doc, 'gain', centerX + 20, bottomSectionY + 10, iconSize, iconSize);

    // Configuración del texto
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    // Añadimos los títulos de las secciones
    doc.text('Think & feel', centerX, startY + 40, { align: 'center' });
    doc.text('See', startX + mapWidth - 40, centerY - 15);
    doc.text('Hear', startX + 20, centerY - 15);
    doc.text('Say & do', centerX, startY + mainSectionHeight - 10, { align: 'center' });
    doc.text('Pains', startX + 40, bottomSectionY + 20);
    doc.text('Gains', centerX + 40, bottomSectionY + 20);

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

    // Calculamos los anchos y posiciones para el contenido
    const sectionWidth = mapWidth / 2;
    
    // Think & Feel
    addContent(
      canvas.content.thinkAndFeel || [], 
      startX + 30, 
      startY + 50, 
      sectionWidth - 60
    );
    
    // See
    addContent(
      canvas.content.see || [], 
      centerX + 30, 
      startY + 50, 
      sectionWidth - 60
    );
    
    // Hear
    addContent(
      canvas.content.hear || [], 
      startX + 30, 
      centerY + 20, 
      sectionWidth - 60
    );
    
    // Say & Do
    addContent(
      canvas.content.sayAndDo || [], 
      centerX + 30, 
      centerY + 20, 
      sectionWidth - 60
    );
    
    // Pains
    addContent(
      canvas.content.pains || [], 
      startX + 40, 
      bottomSectionY + 30, 
      (mapWidth/2) - 50
    );
    
    // Gains
    addContent(
      canvas.content.gains || [], 
      centerX + 40, 
      bottomSectionY + 30, 
      (mapWidth/2) - 50
    );

    // Añadimos la página de información general
    drawGeneralInfoPage(doc, canvas);

    // Guardamos el PDF
    const filename = `${(canvas.title || 'empathy-map').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}