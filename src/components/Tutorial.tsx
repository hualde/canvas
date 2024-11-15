import React from 'react';
import { ArrowLeft, FileText, PieChart, Users, BarChart2, Compass, Sparkles, Download, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 sm:mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span className="text-sm sm:text-base">Volver al Dashboard</span>
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Cómo usar Value Canvas</h1>

      <div className="prose prose-sm sm:prose prose-blue max-w-none">
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Introducción</h2>
          <p className="text-gray-600 mb-4">
            Value Canvas es una herramienta integral diseñada para ayudarte a crear y gestionar varios tipos de canvas de análisis empresarial. Te permite visualizar, analizar y mejorar tus estrategias de negocio de una manera estructurada y eficiente.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-4">
            El dashboard es tu punto de partida. Aquí puedes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Ver todos tus canvas existentes</li>
            <li>Crear nuevos canvas de diferentes tipos</li>
            <li>Editar o eliminar canvas existentes</li>
            <li>Acceder a ejemplos de canvas para inspirarte</li>
          </ul>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Tipos de Canvas</h2>
          <p className="text-gray-600 mb-4">
            Value Canvas soporta múltiples tipos de herramientas de análisis empresarial:
          </p>
          <ul className="list-none space-y-4">
            <li className="flex items-start">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">Business Model Canvas</h3>
                <p className="text-sm sm:text-base text-gray-600">Visualiza y analiza tu modelo de negocio completo.</p>
              </div>
            </li>
            <li className="flex items-start">
              <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">Value Proposition Canvas</h3>
                <p className="text-sm sm:text-base text-gray-600">Enfócate en tu propuesta de valor y ajuste producto-mercado.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">Empathy Map</h3>
                <p className="text-sm sm:text-base text-gray-600">Obtén insights sobre los pensamientos, sentimientos y comportamientos de tus clientes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">SWOT Analysis</h3>
                <p className="text-sm sm:text-base text-gray-600">Evalúa las Fortalezas, Debilidades, Oportunidades y Amenazas de tu negocio.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Compass className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold">PESTEL Analysis</h3>
                <p className="text-sm sm:text-base text-gray-600">Analiza los factores externos que afectan a tu negocio: Políticos, Económicos, Sociales, Tecnológicos, Ambientales y Legales.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Creación y Edición de Canvas</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Al crear un nuevo canvas o editar uno existente, verás secciones específicas según el tipo de canvas que estés trabajando. Cada tipo de canvas tiene su estructura única y áreas de enfoque.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            Cada sección tiene un botón "Agregar Elemento" para incluir nuevos elementos. También puedes editar o eliminar elementos existentes dentro de cada sección.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Información del Canvas</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            En la parte superior de cada canvas, puedes editar la siguiente información:
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
            <li>Título del Canvas</li>
            <li>Nombre del Proyecto</li>
            <li>Autor</li>
            <li>Fecha</li>
            <li>Comentarios</li>
          </ul>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            Esta información te ayuda a organizar e identificar tus diferentes canvas a través de varios proyectos y análisis.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Características Especiales</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Download className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">Exportar a PDF</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Puedes exportar cualquiera de tus canvas a un archivo PDF para compartirlo fácilmente o imprimirlo. Busca el botón "Exportar PDF" en la parte superior de tu canvas.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">Asistente AI</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                El botón de AI, ubicado en la esquina inferior derecha de la pantalla de edición del canvas, proporciona asistencia inteligente para mejorar tu proceso de creación de canvas, independientemente del tipo de análisis en el que estés trabajando.
              </p>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Características:</h4>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                <li>Genera ideas para cada sección de tu canvas</li>
                <li>Analiza tu canvas actual y sugiere mejoras</li>
                <li>Proporciona insights y ejemplos específicos de la industria</li>
                <li>Responde preguntas sobre la metodología de cada tipo de canvas</li>
                <li>Ofrece análisis comparativos entre diferentes tipos de canvas</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-600 mt-4">
                Para usar el asistente de AI, haz clic en el botón morado con el icono de chispas. Luego, puedes escribir tu pregunta o solicitud, y la AI proporcionará sugerencias e insights relevantes adaptados al canvas específico en el que estás trabajando.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Palette className="h-5 w-5 text-green-600" />
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">Ejemplos de Canvas</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Accede a una variedad de ejemplos de canvas de empresas conocidas para inspirarte y entender mejor cómo aplicar estas herramientas a diferentes tipos de negocios.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Consejos para un Uso Efectivo</h2>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
            <li>Actualiza regularmente tus canvas a medida que evolucionan tus estrategias de negocio</li>
            <li>Utiliza múltiples tipos de canvas para obtener una visión integral de tu negocio</li>
            <li>Aprovecha el asistente de AI para obtener inspiración e insights más profundos</li>
            <li>Exporta a PDF para presentaciones, discusiones de equipo o reuniones con stakeholders</li>
            <li>Usa la sección de comentarios para anotar decisiones importantes, cambios o elementos de acción</li>
            <li>Compara y contrasta insights de diferentes tipos de canvas para informar tu estrategia</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">¿Necesitas Ayuda?</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Si tienes alguna pregunta o necesitas más ayuda con cualquiera de los tipos de canvas o características, no dudes en contactar a nuestro equipo de soporte o usar el asistente de AI para obtener orientación. ¡Estamos aquí para ayudarte a sacar el máximo provecho de tus herramientas de análisis empresarial
          </p>
        </section>
      </div>
    </div>
  );
}