import { ArrowRight, BookOpen, TrendingUp, Users, Zap } from 'lucide-react';
import { Footer } from '../components/Footer';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Master Agile Methodology
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Your comprehensive resource for learning, implementing, and excelling in Agile practices
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('knowledge-base')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <span>Explore Knowledge Base</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate('blogs')}
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Read Latest Blogs
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Comprehensive Guide</h3>
              <p className="text-gray-600">
                In-depth articles covering all aspects of Agile methodology
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Trending Insights</h3>
              <p className="text-gray-600">
                Stay updated with the latest Agile trends and best practices
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Team Focused</h3>
              <p className="text-gray-600">
                Learn how to build and lead high-performing Agile teams
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-cyan-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Practical Tips</h3>
              <p className="text-gray-600">
                Actionable advice you can implement immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                What is Agile?
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Agile is a project management and product development approach that emphasizes
                flexibility, collaboration, and customer satisfaction. Rather than following a
                rigid, sequential process, Agile teams work in iterative cycles, continuously
                adapting to change and delivering value incrementally.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Born from the Agile Manifesto in 2001, this methodology has transformed how
                teams build products by focusing on customer collaboration, rapid feedback
                cycles, and continuous improvement.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
              >
                <span>Learn more about us</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Core Agile Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className="text-gray-700">Individuals and interactions over processes and tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span className="text-gray-700">Working software over comprehensive documentation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span className="text-gray-700">Customer collaboration over contract negotiation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <span className="text-gray-700">Responding to change over following a plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Team?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore our comprehensive knowledge base and start your Agile journey today
          </p>
          <button
            onClick={() => onNavigate('knowledge-base')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
