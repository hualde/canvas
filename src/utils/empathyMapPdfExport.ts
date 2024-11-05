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

  // Add title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Empathy Map Information', pageWidth / 2, margin + 10, { align: 'center' });

  // Add info boxes
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

  // Add comments
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
  const margin = 10;

  // Calculamos el tamaño del rectángulo para que ocupe casi todo el ancho de la página
  const rectangleWidth = pageWidth - (margin * 2);
  const rectangleHeight = pageHeight - (margin * 3) - 30;

  // Calculamos el tamaño de cada sección
  const sectionWidth = rectangleWidth / 2;
  const sectionHeight = rectangleHeight / 3;

  try {
    // Set title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'Empathy Map', pageWidth / 2, margin + 10, { align: 'center' });

    const drawSection = (title: string, items: string[] | undefined, x: number, y: number, iconKey: keyof typeof icons) => {
      // Draw box
      doc.setDrawColor(70, 70, 70);
      doc.setLineWidth(0.1);
      doc.rect(x, y, sectionWidth, sectionHeight);

      // Draw icon
      addIconToPDF(doc, iconKey, x + 5, y + 5, 10, 10);

      // Draw title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(title, x + 20, y + 15);

      // Draw items
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      let itemY = y + 25;
      
      if (Array.isArray(items) && items.length > 0) {
        items.forEach((item) => {
          if (typeof item === 'string') {
            const lines = doc.splitTextToSize(item, sectionWidth - 15);
            lines.forEach((line: string) => {
              if (itemY < y + sectionHeight - 5) {
                doc.text(`• ${line}`, x + 5, itemY);
                itemY += 5;
              }
            });
          }
        });
      } else {
        doc.text('No items', x + 5, itemY);
      }
    };

    const startX = margin;
    const startY = margin + 20;

    // Draw Empathy Map sections
    drawSection('Think & Feel?', canvas.content?.thinkAndFeel, startX, startY, 'think');
    drawSection('See?', canvas.content?.see, startX + sectionWidth, startY, 'see');
    drawSection('Hear?', canvas.content?.hear, startX, startY + sectionHeight, 'hear');
    drawSection('Say & Do?', canvas.content?.sayAndDo, startX + sectionWidth, startY + sectionHeight, 'sayDo');
    drawSection('Pain', canvas.content?.pains, startX, startY + sectionHeight * 2, 'pain');
    drawSection('Gain', canvas.content?.gains, startX + sectionWidth, startY + sectionHeight * 2, 'gain');

    // Add the general information page
    drawGeneralInfoPage(doc, canvas);

    // Add metadata
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, pageHeight - 5);

    // Save the PDF
    const filename = `${(canvas.title || 'empathy-map').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}