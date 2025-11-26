import { Target, Users, TrendingUp, Heart } from 'lucide-react';
import { Footer } from '../components/Footer';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Agile Knowledge Base
          </h1>
          <p className="text-xl text-blue-100">
            Empowering teams to excel in Agile methodology through comprehensive education
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We are dedicated to providing the most comprehensive, accessible, and practical
            Agile methodology resources available. Our mission is to help teams of all sizes
            and industries understand, implement, and master Agile practices.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you are just starting your Agile journey or looking to refine your
            existing practices, we provide the knowledge and insights you need to succeed.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Comprehensive Knowledge Base
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our knowledge base covers everything from core Agile concepts to advanced
                practices. Each article is carefully crafted to provide clear, actionable
                information you can apply immediately.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Trending Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Stay current with our blog featuring the latest trends, case studies, and
                expert perspectives on Agile methodology. Learn from real-world experiences
                and industry leaders.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Team-Focused Content
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We understand that Agile is fundamentally about people and collaboration.
                Our content emphasizes team dynamics, communication, and building
                high-performing Agile teams.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-cyan-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Built by Practitioners
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our content is created by experienced Agile practitioners who have worked
                with diverse teams across various industries. We share practical wisdom
                gained from real-world implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Approach</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Practical Over Theoretical</h3>
              <p className="text-gray-700 leading-relaxed">
                While we cover the theory and principles behind Agile, our focus is always
                on practical application. We provide actionable advice you can implement
                in your team today.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Accessible to All</h3>
              <p className="text-gray-700 leading-relaxed">
                Agile should not be complicated or exclusive. We write in clear, jargon-free
                language that makes Agile concepts accessible to everyone, from beginners to
                experienced practitioners.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Continuously Evolving</h3>
              <p className="text-gray-700 leading-relaxed">
                Just like Agile methodology itself, we believe in continuous improvement.
                We regularly update our content, add new resources, and incorporate feedback
                from our community.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Framework Agnostic</h3>
              <p className="text-gray-700 leading-relaxed">
                While we cover specific frameworks like Scrum and Kanban, we recognize that
                there is no one-size-fits-all approach. We help you understand the principles
                so you can adapt them to your unique context.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Thousands of teams worldwide trust our resources to guide their Agile transformation
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Monthly Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Blog Posts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
