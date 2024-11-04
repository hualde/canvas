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
  // ... (mantenemos esta función igual ya que no afecta al posicionamiento del contenido principal)
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

    // Draw the shapes first
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.1);
    
    // Draw square and its divisions
    doc.rect(startX, startY, squareSize, squareSize);
    doc.line(centerX, startY, centerX, startY + squareSize); // Vertical line
    doc.line(startX, centerY, startX + squareSize, centerY); // Horizontal line

    // Draw circle and its divisions
    doc.circle(circleX, circleY, circleRadius);
    const angleStep = (2 * Math.PI) / 3;
    for (let i = 0; i < 3; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top (subtract PI/2)
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

    // Content drawing function
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

    // Draw sections with corrected positioning
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    // Square sections
    // Gain Creators (top half)
    doc.text('Gain Creators', startX + 5, startY + 10);
    if (icons.gainCreators) {
      doc.addImage(icons.gainCreators, 'PNG', startX + 5, startY + 15, 12, 12);
    }
    drawContent(
      canvas.content.gainCreators || [],
      startX + 5,
      startY + 30,
      squareSize - 10,
      (squareSize / 2) - 35
    );

    // Pain Relievers (bottom left)
    doc.text('Pain Relievers', startX + 5, centerY + 10);
    if (icons.painRelievers) {
      doc.addImage(icons.painRelievers, 'PNG', startX + 5, centerY + 15, 12, 12);
    }
    drawContent(
      canvas.content.painRelievers || [],
      startX + 5,
      centerY + 30,
      (squareSize / 2) - 10,
      (squareSize / 2) - 35
    );

    // Products and Services (bottom right)
    doc.text('Products and Services', centerX + 5, centerY + 10);
    if (icons.products) {
      doc.addImage(icons.products, 'PNG', centerX + 5, centerY + 15, 12, 12);
    }
    drawContent(
      canvas.content.productsAndServices || [],
      centerX + 5,
      centerY + 30,
      (squareSize / 2) - 10,
      (squareSize / 2) - 35
    );

    // Circle sections
    const angleTop = -Math.PI / 2;
    const angleRight = angleTop + (2 * Math.PI / 3);
    const angleLeft = angleRight + (2 * Math.PI / 3);

    // Gains (top section)
    doc.text('Gains', circleX - 15, circleY - circleRadius + 15);
    if (icons.gains) {
      doc.addImage(icons.gains, 'PNG', circleX - 6, circleY - circleRadius + 20, 12, 12);
    }
    drawContent(
      canvas.content.gains || [],
      circleX - circleRadius + 15,
      circleY - circleRadius + 35,
      circleRadius * 1.5,
      circleRadius - 40
    );

    // Customer Jobs (right section)
    doc.text('Customer Jobs', circleX + circleRadius/2 - 15, circleY - 5);
    if (icons.customerJobs) {
      doc.addImage(icons.customerJobs, 'PNG', circleX + circleRadius/2 - 6, circleY + 5, 12, 12);
    }
    drawContent(
      canvas.content.customerJobs || [],
      circleX + 15,
      circleY + 20,
      circleRadius - 20,
      circleRadius - 40
    );

    // Pains (bottom left section)
    doc.text('Pains', circleX - circleRadius + 15, circleY + circleRadius/2);
    if (icons.pains) {
      doc.addImage(icons.pains, 'PNG', circleX - circleRadius + 25, circleY + circleRadius/2 + 5, 12, 12);
    }
    drawContent(
      canvas.content.pains || [],
      circleX - circleRadius + 15,
      circleY + 15,
      circleRadius - 20,
      circleRadius - 40
    );

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