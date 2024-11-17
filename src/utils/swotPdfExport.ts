import jsPDF from 'jspdf';
import { icons } from './icons';

interface SWOTData {
  id: string;
  title: string;
  content: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
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

const drawGeneralInfoPage = (doc: jsPDF, canvas: SWOTData) => {
  doc.addPage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SWOT Analysis Information', pageWidth / 2, margin + 10, { align: 'center' });

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

export async function exportSWOTToPDF(canvas: SWOTData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  // Calculate SWOT map dimensions
  const mapWidth = pageWidth - (margin * 2);
  const mapHeight = pageHeight - (margin * 2) - 20; // Subtract 20 for the title
  const startX = margin;
  const startY = margin + 20; // Add 20 for the title

  // Calculate dimensions of each quadrant
  const quadrantWidth = mapWidth / 2;
  const quadrantHeight = mapHeight / 2;

  try {
    // Add canvas title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'SWOT Analysis', pageWidth / 2, margin + 10, { align: 'center' });

    // Draw outer frame
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(startX, startY, mapWidth, mapHeight);

    // Draw internal lines
    doc.line(startX + quadrantWidth, startY, startX + quadrantWidth, startY + mapHeight);
    doc.line(startX, startY + quadrantHeight, startX + mapWidth, startY + quadrantHeight);

    // Add icons
    const iconSize = 10;
    addIconToPDF(doc, 'strength', startX + 5, startY + 5, iconSize, iconSize);
    addIconToPDF(doc, 'weakness', startX + quadrantWidth + 5, startY + 5, iconSize, iconSize);
    addIconToPDF(doc, 'opportunity', startX + 5, startY + quadrantHeight + 5, iconSize, iconSize);
    addIconToPDF(doc, 'threat', startX + quadrantWidth + 5, startY + quadrantHeight + 5, iconSize, iconSize);

    // Text configuration
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    // Add section titles
    doc.text('Strengths', startX + 20, startY + 15);
    doc.text('Weaknesses', startX + quadrantWidth + 20, startY + 15);
    doc.text('Opportunities', startX + 20, startY + quadrantHeight + 15);
    doc.text('Threats', startX + quadrantWidth + 20, startY + quadrantHeight + 15);

    // Helper function to add content
    const addContent = (items: string[], x: number, y: number, maxWidth: number, maxHeight: number) => {
      if (Array.isArray(items)) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        let currentY = y;
        items.forEach((item) => {
          // Remove any existing bullet points or dashes at the start of the item
          const cleanedItem = item.trim().replace(/^[•\-]\s*/, '');
          
          if (cleanedItem) {
            const lines = doc.splitTextToSize(cleanedItem, maxWidth - 15); // Reduce maxWidth slightly to account for bullet point
            doc.text('•', x, currentY);
            doc.text(lines[0], x + 5, currentY);
            currentY += 5;
            
            // For additional lines, don't add bullet points
            for (let i = 1; i < lines.length; i++) {
              if (currentY < y + maxHeight - 5) {
                doc.text(lines[i], x + 5, currentY);
                currentY += 5;
              }
            }
          }
        });
      }
    };

    // Add content for each section
    addContent(canvas.content.strengths, startX + 10, startY + 25, quadrantWidth - 10, quadrantHeight - 25);
    addContent(canvas.content.weaknesses, startX + quadrantWidth + 10, startY + 25, quadrantWidth - 10, quadrantHeight - 25);
    addContent(canvas.content.opportunities, startX + 10, startY + quadrantHeight + 25, quadrantWidth - 10, quadrantHeight - 25);
    addContent(canvas.content.threats, startX + quadrantWidth + 10, startY + quadrantHeight + 25, quadrantWidth - 10, quadrantHeight - 25);

    // Add general information page
    drawGeneralInfoPage(doc, canvas);

    // Save the PDF
    const filename = `${(canvas.title || 'swot-analysis').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}