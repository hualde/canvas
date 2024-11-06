import jsPDF from 'jspdf';
import { icons } from './icons';

interface PESTELCanvasData {
  id: string;
  title: string;
  content: {
    political: string[];
    economic: string[];
    social: string[];
    technological: string[];
    environmental: string[];
    legal: string[];
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

const drawGeneralInfoPage = (doc: jsPDF, canvas: PESTELCanvasData) => {
  doc.addPage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PESTEL Analysis Information', pageWidth / 2, margin + 10, { align: 'center' });

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

export function exportPESTELToPDF(canvas: PESTELCanvasData) {
  if (!canvas) {
    console.error('No canvas data provided for PDF export');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const bottomMargin = 20; // New bottom margin

  // Calculate dimensions
  const mapWidth = pageWidth - (margin * 2);
  const mapHeight = pageHeight - (margin * 2) - bottomMargin; // Adjusted for bottom margin
  const startX = margin;
  const startY = margin;

  const sectionWidth = mapWidth / 3;
  const sectionHeight = mapHeight / 2;

  const sections = [
    { key: 'political', color: '#4DB6AC', label: 'Political' },
    { key: 'economic', color: '#FF7043', label: 'Economic' },
    { key: 'social', color: '#C0CA33', label: 'Social' },
    { key: 'technological', color: '#4DB6AC', label: 'Technological' },
    { key: 'environmental', color: '#FF7043', label: 'Environmental' },
    { key: 'legal', color: '#C0CA33', label: 'Legal' }
  ];

  try {
    // Add title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(canvas.title || 'PESTEL Analysis', pageWidth / 2, startY + 10, { align: 'center' });

    // Draw sections
    sections.forEach((section, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = startX + (col * sectionWidth);
      const y = startY + 20 + (row * sectionHeight);

      // Draw section background
      doc.setFillColor(section.color);
      doc.rect(x, y, sectionWidth, sectionHeight, 'F');

      // Add icon
      addIconToPDF(doc, section.key as keyof typeof icons, x + 5, y + 5, 10, 10);

      // Add section title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(section.label, x + 20, y + 15);

      // Add section content
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const content = canvas.content[section.key as keyof PESTELCanvasData['content']] || [];
      const contentY = y + 25;
      content.forEach((item, itemIndex) => {
        if (contentY + (itemIndex * 10) < y + sectionHeight - 10) {
          doc.text(`• ${item}`, x + 5, contentY + (itemIndex * 10));
        }
      });
    });

    // Add general info page
    drawGeneralInfoPage(doc, canvas);

    // Save the PDF
    const filename = `${(canvas.title || 'pestel-analysis').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}