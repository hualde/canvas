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

export function exportToPDF(canvas: ValuePropositionCanvasData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Calculate dimensions (manteniendo las dimensiones originales)
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

    // Draw the Value Proposition Square (manteniendo la estructura original)
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.1);
    doc.rect(startX, startY, squareSize, squareSize);

    // Draw lines in square (manteniendo las líneas originales)
    doc.line(centerX, centerY, startX + squareSize, centerY);
    doc.line(centerX, centerY, startX, startY);
    doc.line(centerX, centerY, startX, startY + squareSize);

    // Draw circle section (manteniendo la estructura original)
    doc.circle(circleX, circleY, circleRadius);

    // Draw lines in circle (manteniendo las divisiones originales)
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

    // Draw connecting arrow (manteniendo la flecha original)
    doc.line(startX + squareSize, centerY, circleX - circleRadius, centerY);
    doc.line(circleX - circleRadius - 5, centerY - 2, circleX - circleRadius, centerY);
    doc.line(circleX - circleRadius - 5, centerY + 2, circleX - circleRadius, centerY);

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

    // Square content positioning
    // Gain Creators (upper triangle)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Gain Creators', startX + 25, startY + 5);
    if (icons.gainCreators) {
      doc.addImage(icons.gainCreators, 'PNG', startX + 30, startY + 10, 12, 12);
    }
    drawContent(
      canvas.content.gainCreators || [], 
      startX + 55, 
      startY + 10, 
      (squareSize / 2) - 15,
      (centerY - startY) - 40
    );

    // Pain Relievers (lower left triangle)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Pain Relievers', startX + 2, centerY - 25);
    if (icons.painRelievers) {
      doc.addImage(icons.painRelievers, 'PNG', startX + 5, centerY - 40, 12, 12);
    }
    drawContent(
      canvas.content.painRelievers || [],
      startX + 5,
      centerY - 20,
      (centerX - startX) - 15,
      (startY + squareSize - centerY) - 20
    );

    // Products & Services (lower right triangle)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Products and Services', centerX + 0, centerY + 5);
    if (icons.products) {
      doc.addImage(icons.products, 'PNG', centerX - 35, centerY + 45, 12, 12);
    }
    drawContent(
      canvas.content.productsAndServices || [],
      centerX - 10,
      centerY + 15,
      (startX + squareSize - centerX) - 15,
      (startY + squareSize - centerY) - 20
    );

    // Circle content positioning
    // Gains (top section)
    doc.text('Gains', circleX - 15, circleY - circleRadius + 15);
    if (icons.gains) {
      doc.addImage(icons.gains, 'PNG', circleX - 6, circleY - circleRadius + 20, 12, 12);
    }
    drawContent(
      canvas.content.gains || [],
      circleX - 25,
      circleY - circleRadius + 35,
      50,
      40
    );

    // Customer Jobs (right section)
    doc.text('Customer Jobs', circleX + 20, circleY);
    if (icons.customerJobs) {
      doc.addImage(icons.customerJobs, 'PNG', circleX + 25, circleY + 5, 12, 12);
    }
    drawContent(
      canvas.content.customerJobs || [],
      circleX + 15,
      circleY + 20,
      40,
      40
    );

    // Pains (bottom left section)
    doc.text('Pains', circleX - circleRadius + 10, circleY + 20);
    if (icons.pains) {
      doc.addImage(icons.pains, 'PNG', circleX - circleRadius + 15, circleY + 25, 12, 12);
    }
    drawContent(
      canvas.content.pains || [],
      circleX - circleRadius + 10,
      circleY + 40,
      40,
      40
    );

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