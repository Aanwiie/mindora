import { Heart, Brain, Target, Shield, ArrowRight, Smile, TreePine, Cloud, Eye } from 'lucide-react';
import Header from './Header';

interface LandingPageProps {
  onGetStarted: () => void;
  onShowHistory?: () => void;
  onShowLowlands?: () => void;
  onShowMindMirror?: () => void;
}

export default function LandingPage({ onGetStarted, onShowHistory, onShowLowlands, onShowMindMirror }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Image - Set to a lower z-index to stay in the back */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: "url('/horizontal-bg.png')" }}
        ></div>

        {/* Mobile Background */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat block md:hidden"
          style={{ backgroundImage: "url('/vertical-bg.png')" }}
        ></div>
      </div>

      {/* Wrap Header and all subsequent content in a relative container to ensure it appears above the background */}
      <div className="relative z-10">
        <Header
          onHistoryClick={onShowHistory}
          onLowlandsClick={onShowLowlands}
          onMindMirrorClick={onShowMindMirror}
          showHistoryButton={!!onShowHistory}
          showLowlandsButton={!!onShowLowlands}
          showMindMirrorButton={!!onShowMindMirror}
        />

        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-green-200 rounded-full blur-xl animate-float-delayed"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-200 rounded-full blur-xl animate-float-slow"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-emerald-200 rounded-full blur-xl animate-pulse-gentle"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
            <div className="text-center">
              {/* Animated Logo */}
              <div className="flex justify-center mb-8 sm:mb-12">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl pulse-gentle hover:scale-110 transition-transform duration-500">
                    <img
                      src="/logo.png"
                      alt="Aura Logo"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Title with Typing Animation */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 sm:mb-6">
                  <span className="gradient-text animate-gradient-shift">Mindora</span>
                </h1>
                <div className="text-xl sm:text-3xl md:text-4xl text-gray-700 dark:text-gray-300 mb-2 sm:mb-4 font-medium px-4">
                  <span className="inline-block animate-fade-in-up">Your</span>
                  <span className="inline-block animate-fade-in-up animation-delay-200 ml-2">Emotionally</span>
                  <span className="inline-block animate-fade-in-up animation-delay-400 ml-2">Intelligent</span>
                </div>
                <div className="text-xl sm:text-3xl md:text-4xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 font-medium px-4">
                  <span className="inline-block animate-fade-in-up animation-delay-600">Productivity</span>
                  <span className="inline-block animate-fade-in-up animation-delay-800 ml-2">Companion</span>
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed animate-fade-in-up animation-delay-1000">
                  Unlike standard to-do apps, Mindora understands your emotions, adapts to your mood,
                  and provides compassionate support. Built especially for neurodivergent minds who
                  need understanding, not judgment.
                </p>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1200">
                    <Brain className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Mood-Aware AI</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Adapts to your emotional state</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1400">
                    <Heart className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Compassionate</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">No judgment, just support</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1600">
                    <Shield className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Neurodivergent-First</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Built for ADHD, ASD minds</p>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="animate-fade-in-up animation-delay-1800">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={onGetStarted}
                    className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 flex items-center gap-3"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  {onShowMindMirror && (
                    <button
                      onClick={onShowMindMirror}
                      className="group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 flex items-center gap-3"
                    >
                      <span>🪞 Mind Mirror</span>
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}

                  {onShowLowlands && (
                    <button
                      onClick={onShowLowlands}
                      className="group bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 flex items-center gap-3"
                    >
                      <span>🌫 The Lowlands</span>
                      <Cloud className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
                  ✨ Join thousands who've found their perfect productivity companion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Why Mindora is Different
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              Designed with empathy for ADHD, ASD, and all neurodivergent minds
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg card-hover border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">Mood-Aware Intelligence</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Mindora adapts to how you're feeling. Overwhelmed? We'll slow down. Energetic?
                Let's channel that power. Your emotions guide the experience.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg card-hover border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">Compassionate Support</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                No judgment, no pressure. Skip tasks without guilt. Mindora understands that
                some days are harder than others, and that's perfectly okay.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg card-hover border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">Neurodivergent-First</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Built specifically for ADHD, ASD, and neurodivergent minds. We understand
                hyperfocus, sensory needs, and executive function challenges.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg card-hover border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">Mind Mirror Journaling</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                AI-powered journaling that reflects your thoughts back to you, helping you
                discover patterns, gain insights, and have conversations with your past self.
              </p>
            </div>
          </div>

          {/* Wellness and Mental Health Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-3xl p-8 sm:p-12 mb-12 sm:mb-20 border-2 border-emerald-100 dark:border-emerald-800 transition-colors duration-300">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                  <TreePine className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
                Your Mental Wellness Matters 🌫
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Mindora isn't just about productivity—it's about nurturing your mental health and creating
                a sustainable relationship with your goals and aspirations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Understanding Neurodivergence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We recognize that ADHD, autism, and other neurodivergent conditions aren't
                      disorders to be fixed—they're different ways of experiencing the world that
                      come with unique strengths and challenges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Emotional Regulation Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Our mood-aware system helps you navigate emotional ups and downs, providing
                      appropriate support whether you're feeling overwhelmed, energetic, or anywhere
                      in between.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Smile className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Reducing Anxiety & Overwhelm
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Traditional productivity tools can increase anxiety. Mindora reduces overwhelm
                      by breaking tasks into manageable pieces and celebrating small wins along
                      the way.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Building Self-Compassion
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We help you develop a kinder relationship with yourself, moving away from
                      self-criticism toward self-acceptance and gentle progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Lowlands Feature Highlight */}
            <div className="mt-8 sm:mt-12">
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    🌫 The Lowlands
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    A gentle, gamified world for those struggling with depression or low motivation.
                    Complete small self-care tasks to lift the fog and bring light back to your world.
                  </p>
                  {onShowLowlands && (
                    <button
                      onClick={onShowLowlands}
                      className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Enter The Lowlands
                    </button>
                  )}
                  {onShowMindMirror && (
                    <button
                      onClick={onShowMindMirror}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      🪞 Mind Mirror Journal
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Remember: You're Not Broken
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your neurodivergent brain is not something that needs to be fixed or forced into
                  neurotypical patterns. Mindora works with your natural rhythms, celebrating your
                  unique way of thinking and being in the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Feel Understood?
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100 mb-6 sm:mb-8 leading-relaxed">
              Join thousands who've found a productivity companion that truly gets them.
              No more fighting your brain – let's work with it instead.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-white hover:bg-gray-50 text-emerald-600 px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-12 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Mindora Logo"
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold gradient-text">Mindora</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Emotionally intelligent productivity for neurodivergent minds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}