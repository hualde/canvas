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

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Canvas Information', pageWidth / 2, margin + 10, { align: 'center' });

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

export function exportToPDF(canvas: ValuePropositionCanvasData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Calculate dimensions
  const squareSize = 120;
  const circleRadius = 60;
  const startX = margin;
  const startY = margin + 20;
  const centerX = startX + squareSize / 2;
  const centerY = startY + squareSize / 2;
  const circleX = startX + squareSize + margin + circleRadius;
  const circleY = centerY;

  try {
    // Set title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'Value Proposition Canvas', pageWidth / 2, margin, { align: 'center' });

    // Draw the Value Proposition Square
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.1);
    doc.rect(startX, startY, squareSize, squareSize);

    // Draw lines in square
    doc.line(centerX, centerY, startX + squareSize, centerY);
    doc.line(centerX, centerY, startX, startY);
    doc.line(centerX, centerY, startX, startY + squareSize);

    // Draw circle section
    doc.circle(circleX, circleY, circleRadius);

    // Draw lines in circle (three equal sections)
    const angleStep = (2 * Math.PI) / 3;
    for (let i = 0; i < 3; i++) {
      const angle = i * angleStep;
      doc.line(
        circleX,
        circleY,
        circleX + circleRadius * Math.cos(angle),
        circleY + circleRadius * Math.sin(angle)
      );
    }

    // Draw connecting arrow
    doc.line(startX + squareSize, centerY, circleX - circleRadius, centerY);
    doc.line(circleX - circleRadius - 5, centerY - 2, circleX - circleRadius, centerY);
    doc.line(circleX - circleRadius - 5, centerY + 2, circleX - circleRadius, centerY);

    // Draw content for each section
    const drawContent = (items: string[], x: number, y: number, width: number, height: number) => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      let currentY = y;
      items.forEach((item) => {
        const lines = doc.splitTextToSize(item, width);
        lines.forEach((line: string) => {
          if (currentY < y + height) {
            doc.text(`• ${line}`, x, currentY);
            currentY += 4;
          }
        });
      });
    };

    // Draw section titles
    const drawSectionTitle = (title: string, x: number, y: number, align: 'left' | 'center' | 'right' = 'left') => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(title, x, y, { align });
    };

    // Square section
    // Gain Creators (top)
    drawSectionTitle('Gain Creators', startX + 5, startY + 15, 'left');
    if (icons.gainCreators) {
      doc.addImage(icons.gainCreators, 'PNG', startX + 10, startY + 20, 15, 15);
    }
    drawContent(canvas.content.gainCreators || [], startX + 10, startY + 40, squareSize / 2, squareSize / 2 - 40);

    // Pain Relievers (bottom left)
    drawSectionTitle('Pain Relievers', startX + 5, startY + squareSize - 15, 'left');
    if (icons.painRelievers) {
      doc.addImage(icons.painRelievers, 'PNG', startX + 10, startY + squareSize - 30, 15, 15);
    }
    drawContent(canvas.content.painRelievers || [], startX + 10, startY + squareSize - 10, squareSize / 2, squareSize / 2 - 40);

    // Products and Services (bottom right)
    drawSectionTitle('Products and Services', startX + squareSize - 5, startY + squareSize - 15, 'right');
    if (icons.products) {
      doc.addImage(icons.products, 'PNG', startX + squareSize - 25, startY + squareSize - 30, 15, 15);
    }
    drawContent(canvas.content.productsAndServices || [], startX + squareSize / 2 + 10, startY + squareSize - 10, squareSize / 2 - 20, squareSize / 2 - 40);

    // Circle section
    // Gains (top)
    drawSectionTitle('Gains', circleX, centerY - circleRadius + 15, 'center');
    if (icons.gains) {
      doc.addImage(icons.gains, 'PNG', circleX - 7.5, centerY - circleRadius + 25, 15, 15);
    }
    drawContent(canvas.content.gains || [], circleX - 30, centerY - circleRadius + 45, circleRadius - 20, circleRadius - 40);

    // Customer Jobs (right)
    drawSectionTitle('Customer Jobs', circleX + circleRadius - 15, centerY, 'right');
    if (icons.customerJobs) {
      doc.addImage(icons.customerJobs, 'PNG', circleX + circleRadius - 35, centerY - 7.5, 15, 15);
    }
    drawContent(canvas.content.customerJobs || [], circleX + 20, centerY + 15, circleRadius - 20, circleRadius - 40);

    // Pains (bottom)
    drawSectionTitle('Pains', circleX - circleRadius + 15, centerY + circleRadius - 15, 'left');
    if (icons.pains) {
      doc.addImage(icons.pains, 'PNG', circleX - circleRadius + 25, centerY + circleRadius - 35, 15, 15);
    }
    drawContent(canvas.content.pains || [], circleX - circleRadius + 45, centerY + 20, circleRadius - 20, circleRadius - 40);

    // Add the general information page
    drawGeneralInfoPage(doc, canvas);

    // Add metadata
    doc.setFontSize(6);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, pageHeight - 5);

    // Save the PDF
    const filename = `${(canvas.title || 'value-proposition-canvas').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}