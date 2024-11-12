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

export async function exportToPDF(canvas: ValuePropositionCanvasData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  try {
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

    // Draw lines in circle
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

    const drawContent = (items: string[], x: number, y: number, width: number, height: number) => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      let currentY = y;
      items.forEach((item) => {
        const lines = doc.splitTextToSize(item, width);
        doc.text(`• ${lines[0]}`, x, currentY);
        currentY += 4;
        
        // For additional lines, don't add bullet points
        for (let i = 1; i < lines.length; i++) {
          if (currentY < y + height) {
            doc.text(lines[i], x + 3, currentY);
            currentY += 4;
          }
        }
      });
    };

    // Square content positioning
    // Gain Creators (upper triangle)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Gain Creators', startX + 50, startY + 5);
    if (icons.gainCreators) {
      doc.addImage(icons.gainCreators, 'PNG', startX + 20, startY + 3, 12, 12);
    }
    drawContent(
      canvas.content.gainCreators || [], 
      startX + 45, 
      startY + 12, 
      (squareSize / 2) - 15,
      (centerY - startY) - 40
    );

    // Pain Relievers (lower left triangle)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Pain Relievers', startX + 2, centerY - 25);
    if (icons.painRelievers) {
      doc.addImage(icons.painRelievers, 'PNG', startX + 5, centerY - 42, 12, 12);
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
      doc.addImage(icons.products, 'PNG', centerX - 35, centerY + 40, 12, 12);
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
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Gains', circleX - 15, circleY - circleRadius + 7);
    if (icons.gains) {
      doc.addImage(icons.gains, 'PNG', circleX - 18, circleY - circleRadius + 10, 12, 12);
    }
    drawContent(
      canvas.content.gains || [],
      circleX - 5,
      circleY - circleRadius + 15,
      50,
      40
    );

    // Customer Jobs (right section)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Jobs', circleX + 10, circleY + 5);
    if (icons.customerJobs) {
      doc.addImage(icons.customerJobs, 'PNG', circleX - 15, circleY + 35, 12, 12);
    }
    drawContent(
      canvas.content.customerJobs || [],
      circleX + 0,
      circleY + 10,
      40,
      40
    );

    // Pains (bottom left section)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Pains', circleX - circleRadius + 17, circleY - 26);
    if (icons.pains) {
      doc.addImage(icons.pains, 'PNG', circleX - circleRadius + 18, circleY - 45, 12, 12);
    }
    drawContent(
      canvas.content.pains || [],
      circleX - circleRadius + 10,
      circleY - 20,
      40,
      40
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

    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error in exportToPDF:', error);
    throw error;
  }
}