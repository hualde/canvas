import jsPDF from 'jspdf';
import { icons } from './icons';

interface ValuePropositionCanvasData {
  id: string;
  title: string;
  project_name: string;
  author: string;
  date: string | Date;
  comments: string;
  content: {
    productsAndServices: string[];
    gainCreators: string[];
    painRelievers: string[];
    customerJobs: string[];
    gains: string[];
    pains: string[];
  };
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

const drawGeneralInfoPage = (doc: jsPDF, canvas: ValuePropositionCanvasData) => {
  doc.addPage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Add title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Canvas Information', pageWidth / 2, margin + 10, { align: 'center' });

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

export function exportToPDF(canvas: ValuePropositionCanvasData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const bottomMargin = 10;

  const leftWidth = (pageWidth - (margin * 3)) / 2;
  const rightWidth = leftWidth;
  const height = pageHeight - (margin * 2) - bottomMargin;

  const drawSection = (x: number, y: number, width: number, height: number, title: string, items: string[], iconKey: keyof typeof icons) => {
    // Draw box
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.1);
    doc.rect(x, y, width, height);

    // Draw icon
    try {
      if (icons[iconKey]) {
        doc.addImage(icons[iconKey], 'PNG', x + 3, y + 3, 5, 5);
      }
    } catch (error) {
      console.warn(`Failed to add icon for ${iconKey}:`, error);
    }

    // Draw title with reduced font size
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + 10, y + 6);

    // Draw items
    if (Array.isArray(items) && items.length > 0) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      let itemY = y + 12;
      items.forEach((item) => {
        if (item && typeof item === 'string') {
          const lines = doc.splitTextToSize(item, width - 6);
          lines.forEach((line: string) => {
            if (itemY < y + height - 2) {
              doc.text(`• ${line}`, x + 3, itemY);
              itemY += 4;
            }
          });
        }
      });
    } else {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('No items', x + 3, y + 12);
    }
  };

  try {
    // Set title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'Value Proposition Canvas', pageWidth / 2, margin, { align: 'center' });

    // Draw left side (square)
    drawSection(margin, margin + 10, leftWidth, height / 3, 'PRODUCTS AND SERVICES', canvas.content.productsAndServices || [], 'products');
    drawSection(margin, margin + 10 + height / 3, leftWidth, height / 3, 'GAIN CREATORS', canvas.content.gainCreators || [], 'gainCreators');
    drawSection(margin, margin + 10 + (height / 3) * 2, leftWidth, height / 3, 'PAIN RELIEVERS', canvas.content.painRelievers || [], 'painRelievers');

    // Draw right side (circle)
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.1);
    doc.circle(margin * 2 + leftWidth + rightWidth / 2, margin + 10 + height / 2, height / 2);

    drawSection(margin * 2 + leftWidth, margin + 10, rightWidth, height / 3, 'CUSTOMER JOBS', canvas.content.customerJobs || [], 'customerJobs');
    drawSection(margin * 2 + leftWidth, margin + 10 + height / 3, rightWidth, height / 3, 'GAINS', canvas.content.gains || [], 'gains');
    drawSection(margin * 2 + leftWidth, margin + 10 + (height / 3) * 2, rightWidth, height / 3, 'PAINS', canvas.content.pains || [], 'pains');

    // Add the general information page
    drawGeneralInfoPage(doc, canvas);

    // Add metadata
    doc.setFontSize(6);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, pageHeight - 5);

    // Save the PDF with a sanitized filename
    const filename = `${(canvas.title || 'value-proposition-canvas').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}