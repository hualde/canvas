import jsPDF from 'jspdf';
import { icons } from './icons';

interface CanvasData {
  id: string;
  title: string;
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export function exportToPDF(canvas: CanvasData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  
  const colWidth = (pageWidth - (margin * 2)) / 5;
  const topRowHeight = (pageHeight - (margin * 2)) * 0.6;
  const bottomRowHeight = (pageHeight - (margin * 2)) * 0.4;

  const drawSection = (x: number, y: number, width: number, height: number, title: string, items: string[] = [], iconKey: keyof typeof icons) => {
    // Draw box
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.1);
    doc.rect(x, y, width, height);

    // Draw icon (if available)
    try {
      if (icons[iconKey]) {
        doc.addImage(icons[iconKey], 'PNG', x + 3, y + 3, 5, 5);
      }
    } catch (error) {
      console.warn(`Failed to add icon for ${iconKey}:`, error);
    }

    // Draw title with reduced font size
    doc.setFontSize(9); // Reduced from 12 to 9
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + 10, y + 6);

    // Draw items
    if (Array.isArray(items) && items.length > 0) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      let itemY = y + 12;
      items.forEach((item) => {
        if (item) {
          const lines = doc.splitTextToSize(item, width - 6);
          lines.forEach((line: string) => {
            if (itemY < y + height - 2) {
              doc.text(`• ${line}`, x + 3, itemY);
              itemY += 4;
            }
          });
        }
      });
    }
  };

  try {
    // Set title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'Business Model Canvas', pageWidth / 2, margin, { align: 'center' });

    // Draw sections
    drawSection(margin, margin + 10, colWidth, topRowHeight, 'KEY PARTNERS', canvas.keyPartners, 'keyPartnerships');
    drawSection(margin + colWidth, margin + 10, colWidth, topRowHeight / 2, 'KEY ACTIVITIES', canvas.keyActivities, 'keyActivities');
    drawSection(margin + colWidth, margin + 10 + topRowHeight / 2, colWidth, topRowHeight / 2, 'KEY RESOURCES', canvas.keyResources, 'keyResources');
    drawSection(margin + colWidth * 2, margin + 10, colWidth, topRowHeight, 'VALUE PROPOSITIONS', canvas.valuePropositions, 'valuePropositions');
    drawSection(margin + colWidth * 3, margin + 10, colWidth, topRowHeight / 2, 'CUSTOMER RELATIONSHIPS', canvas.customerRelationships, 'customerRelationships');
    drawSection(margin + colWidth * 3, margin + 10 + topRowHeight / 2, colWidth, topRowHeight / 2, 'CHANNELS', canvas.channels, 'channels');
    drawSection(margin + colWidth * 4, margin + 10, colWidth, topRowHeight, 'CUSTOMER SEGMENTS', canvas.customerSegments, 'customerSegments');

    // Bottom row
    drawSection(margin, margin + 10 + topRowHeight, (pageWidth - margin * 2) / 2, bottomRowHeight, 'COST STRUCTURE', canvas.costStructure, 'costStructure');
    drawSection(margin + (pageWidth - margin * 2) / 2, margin + 10 + topRowHeight, (pageWidth - margin * 2) / 2, bottomRowHeight, 'REVENUE STREAMS', canvas.revenueStreams, 'revenueStreams');

    // Add metadata
    doc.setFontSize(6);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, pageHeight - 2);

    // Save the PDF with a sanitized filename
    const filename = `${(canvas.title || 'business-model-canvas').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}