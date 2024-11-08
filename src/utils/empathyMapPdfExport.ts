import jsPDF from 'jspdf';
import { icons } from './icons';
import { getUserSubscription } from '../lib/db';

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

export async function exportEmpathyMapToPDF(canvas: EmpathyMapData, userId: string) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const subscriptionTier = await getUserSubscription(userId);
  if (subscriptionTier !== 'premium') {
    console.error('PDF export is only available for premium users');
    throw new Error('PDF export is only available for premium users');
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  // Calculate map dimensions
  const mapWidth = pageWidth - (margin * 2);
  const mapHeight = pageHeight - (margin * 2);
  const startX = margin;
  const startY = margin;

  // Adjust proportions to give more height to all sections
  const mainSectionHeight = mapHeight * 0.75;
  const painGainSectionHeight = mapHeight * 0.25;

  // Calculate center point and circle radius
  const centerX = startX + (mapWidth / 2);
  const centerY = startY + (mainSectionHeight / 2);
  const circleRadius = 15;

  try {
    // Add canvas title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'Empathy Map', pageWidth / 2, startY + 10, { align: 'center' });

    // Draw outer frame
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(startX, startY + 20, mapWidth, mapHeight - 20);
    
    // Draw diagonal lines from center
    doc.line(centerX, centerY + 10, startX, startY + 20); // Upper left
    doc.line(centerX, centerY + 10, startX + mapWidth, startY + 20); // Upper right
    doc.line(centerX, centerY + 10, startX, startY + mainSectionHeight); // Lower left
    doc.line(centerX, centerY + 10, startX + mapWidth, startY + mainSectionHeight); // Lower right

    // Draw central circle
    doc.setFillColor(255, 255, 255); // Set fill color to white
    doc.circle(centerX, centerY + 10, circleRadius, 'F'); // 'F' fills the circle
    doc.setDrawColor(0); // Set draw color back to black
    doc.circle(centerX, centerY + 10, circleRadius, 'S'); // Draw the circle outline

    // Draw Pains and Gains borders
    const bottomSectionY = startY + mainSectionHeight;
    doc.line(startX, bottomSectionY, startX + mapWidth, bottomSectionY);
    doc.line(centerX, bottomSectionY, centerX, startY + mapHeight);

    // Add icons
    const iconSize = 10;
    addIconToPDF(doc, 'face', centerX - 5, startY + 77, iconSize, iconSize);
    addIconToPDF(doc, 'think', centerX - 95, startY + 30, iconSize, iconSize);
    addIconToPDF(doc, 'see', startX + mapWidth - 16, centerY - 36, iconSize, iconSize);
    addIconToPDF(doc, 'hear', startX + 2, centerY - 36, iconSize, iconSize);
    addIconToPDF(doc, 'sayDo', centerX - 95, startY + mainSectionHeight - 20, iconSize, iconSize);
    addIconToPDF(doc, 'pain', startX + 2, bottomSectionY + 10, iconSize, iconSize);
    addIconToPDF(doc, 'gain', centerX + 2, bottomSectionY + 10, iconSize, iconSize);

    // Text configuration
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    // Add section titles
    doc.text('Think & feel', centerX - 95, startY + 28, { align: 'center' });
    doc.text('See', startX + mapWidth - 15, centerY - 40);
    doc.text('Hear', startX + 2, centerY - 40);
    doc.text('Say & do', centerX - 95, startY + mainSectionHeight - 3, { align: 'center' });
    doc.text('Pains', startX + 2, bottomSectionY + 7);
    doc.text('Gains', centerX + 2, bottomSectionY + 7);

    // Add content for each section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Helper function to add content
    const addContent = (items: string[], x: number, y: number, maxWidth: number, maxHeight: number) => {
      if (Array.isArray(items)) {
        let currentY = y;
        items.forEach((item) => {
          const lines = doc.splitTextToSize(item, maxWidth);
          doc.text(`• ${lines[0]}`, x, currentY);
          currentY += 5;
          
          // For additional lines, don't add bullet points
          for (let i = 1; i < lines.length; i++) {
            if (currentY < y + maxHeight - 5) {
              doc.text(lines[i], x + 3, currentY);
              currentY += 5;
            }
          }
        });
      }
    };

    // Calculate widths and positions for content
    const sectionWidth = mapWidth / 2;
    const sectionHeight = mainSectionHeight / 2;
    
    // Think & Feel
    addContent(
      canvas.content.thinkAndFeel || [], 
      startX + 70, 
      startY + 30, 
      sectionWidth - 60,
      sectionHeight - 60
    );
    
    // See
    addContent(
      canvas.content.see || [], 
      centerX + 76, 
      centerY - 20,
      sectionWidth - 60,
      sectionHeight - 60
    );
    
    // Hear
    addContent(
      canvas.content.hear || [], 
      startX + 15, 
      centerY - 20, 
      sectionWidth - 60,
      sectionHeight - 60
    );
    
    // Say & Do
    addContent(
      canvas.content.sayAndDo || [], 
      centerX - 32, 
      centerY + 30, 
      sectionWidth - 60,
      sectionHeight - 60
    );
    
    // Pains
    addContent(
      canvas.content.pains || [], 
      startX + 17, 
      bottomSectionY + 12, 
      (mapWidth/2) - 50,
      painGainSectionHeight - 40
    );
    
    // Gains
    addContent(
      canvas.content.gains || [], 
      centerX + 17, 
      bottomSectionY + 12, 
      (mapWidth/2) - 50,
      painGainSectionHeight - 40
    );

    // Add general information page
    drawGeneralInfoPage(doc, canvas);

    // Save the PDF
    const filename = `${(canvas.title || 'empathy-map').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}