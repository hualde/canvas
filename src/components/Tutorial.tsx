import React from 'react';
import { ArrowLeft, Sparkles, Download, FileText, PieChart, Users, BarChart2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">How to Use Value Canvas</h1>

      <div className="prose prose-blue max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            Value Canvas is a comprehensive tool designed to help you create and manage various business analysis canvases. It allows you to visualize, analyze, and improve your business strategies in a structured way.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-4">
            The dashboard is your starting point. Here you can:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>View all your existing canvases</li>
            <li>Create new canvases of different types</li>
            <li>Edit or delete existing canvases</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Types of Canvases</h2>
          <p className="text-gray-600 mb-4">
            Value Canvas supports multiple types of business analysis tools:
          </p>
          <ul className="list-none space-y-4">
            <li className="flex items-start">
              <FileText className="h-6 w-6 text-blue-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">Business Model Canvas</h3>
                <p className="text-gray-600">Visualize and analyze your entire business model.</p>
              </div>
            </li>
            <li className="flex items-start">
              <PieChart className="h-6 w-6 text-green-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">Value Proposition Canvas</h3>
                <p className="text-gray-600">Focus on your product-market fit and customer value.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Users className="h-6 w-6 text-purple-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">Empathy Map</h3>
                <p className="text-gray-600">Gain insights into your customers' thoughts, feelings, and behaviors.</p>
              </div>
            </li>
            <li className="flex items-start">
              <BarChart2 className="h-6 w-6 text-orange-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">SWOT Analysis</h3>
                <p className="text-gray-600">Evaluate your Strengths, Weaknesses, Opportunities, and Threats.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Compass className="h-6 w-6 text-red-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">PESTEL Analysis</h3>
                <p className="text-gray-600">Analyze external factors affecting your business: Political, Economic, Social, Technological, Environmental, and Legal.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Creating and Editing a Canvas</h2>
          <p className="text-gray-600 mb-4">
            When you create a new canvas or edit an existing one, you'll see sections specific to the type of canvas you're working on. Each canvas type has its unique structure and focus areas.
          </p>
          <p className="text-gray-600 mt-4">
            Each section has an "Add Item" button to include new elements. You can also edit or delete existing items within each section.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Canvas Information</h2>
          <p className="text-gray-600 mb-4">
            At the top of each canvas, you can edit the following information:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Canvas Title</li>
            <li>Project Name</li>
            <li>Author</li>
            <li>Date</li>
            <li>Comments</li>
          </ul>
          <p className="text-gray-600 mt-4">
            This information helps you organize and identify your different canvases across various projects and analyses.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Special Features</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Download className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-medium text-gray-800">Export to PDF</h3>
              </div>
              <p className="text-gray-600">
                You can export any of your canvases to a PDF file for easy sharing and printing. Look for the "Export PDF" button at the top of your canvas.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="text-xl font-medium text-gray-800">AI Assistant</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The AI button, located in the bottom right corner of the canvas editing screen, provides intelligent assistance to enhance your canvas creation process, regardless of the type of analysis you're working on.
              </p>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Features:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Generate ideas for each section of your canvas</li>
                <li>Analyze your current canvas and suggest improvements</li>
                <li>Provide industry-specific insights and examples</li>
                <li>Answer questions about the methodology of each canvas type</li>
                <li>Offer comparative analysis between different canvas types</li>
              </ul>
              <p className="text-gray-600 mt-4">
                To use the AI assistant, click on the purple button with the sparkles icon. You can then type your question or request, and the AI will provide relevant suggestions and insights tailored to the specific canvas you're working on.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tips for Effective Use</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Regularly update your canvases as your business strategies evolve</li>
            <li>Use multiple canvas types to gain a comprehensive view of your business</li>
            <li>Leverage the AI assistant for inspiration and deeper insights</li>
            <li>Export to PDF for presentations, team discussions, or stakeholder meetings</li>
            <li>Use the comments section to note important decisions, changes, or action items</li>
            <li>Compare and contrast insights from different canvas types to inform your strategy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600">
            If you have any questions or need further assistance with any of the canvas types or features, don't hesitate to contact our support team or use the AI assistant for guidance. We're here to help you make the most of your business analysis tools! 
          </p>
        </section>
      </div>
    </div>
  );
}