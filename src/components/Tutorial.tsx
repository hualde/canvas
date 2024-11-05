import React from 'react';
import { ArrowLeft, Sparkles, Download } from 'lucide-react';
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
            Value Canvas is a tool designed to help you create and manage Business Model Canvases. It allows you to visualize, analyze, and improve your business model in a structured way.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-4">
            The dashboard is your starting point. Here you can:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>View all your existing canvases</li>
            <li>Create a new canvas</li>
            <li>Edit or delete existing canvases</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Creating and Editing a Canvas</h2>
          <p className="text-gray-600 mb-4">
            When you create a new canvas or edit an existing one, you'll see the following sections:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Key Partners</li>
            <li>Key Activities</li>
            <li>Key Resources</li>
            <li>Value Propositions</li>
            <li>Customer Relationships</li>
            <li>Channels</li>
            <li>Customer Segments</li>
            <li>Cost Structure</li>
            <li>Revenue Streams</li>
          </ul>
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
            This information helps you organize and identify your different canvases.
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
                You can export your canvas to a PDF file for easy sharing and printing. Look for the "Export PDF" button at the top of your canvas.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="text-xl font-medium text-gray-800">AI Assistant</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The AI button, located in the bottom right corner of the canvas editing screen, provides intelligent assistance to enhance your Business Model Canvas creation process.
              </p>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Features:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Generate ideas for each section of your canvas</li>
                <li>Analyze your current canvas and suggest improvements</li>
                <li>Provide industry-specific insights and examples</li>
                <li>Answer questions about the Business Model Canvas methodology</li>
              </ul>
              <p className="text-gray-600 mt-4">
                To use the AI assistant, click on the purple button with the sparkles icon. You can then type your question or request, and the AI will provide relevant suggestions and insights.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tips for Effective Use</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Regularly update your canvas as your business model evolves</li>
            <li>Use the AI assistant for inspiration when you're stuck</li>
            <li>Export to PDF for presentations or offline discussions</li>
            <li>Use the comments section to note important decisions or changes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600">
            If you have any questions or need further assistance, don't hesitate to contact our support team or use the AI assistant for guidance
          </p>
        </section>
      </div>
    </div>
  );
}