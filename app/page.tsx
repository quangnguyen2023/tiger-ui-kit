import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { renderWidgetComponent, WIDGET_TABS } from '@/lib/widgetUtils';
import {
  Check,
  Code2,
  Layout,
  MousePointer,
  Palette,
  Play,
  Shield,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <Layout className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                Widget Kit
              </span>
            </div>

            <nav className="hidden items-center space-x-8 md:flex">
              <a
                href="#features"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Widgets
              </a>
              <a
                href="#customize"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Customize
              </a>
              <a
                href="#pricing"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Pricing
              </a>
              <a
                href="#support"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Support
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:block" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60"></div>
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute top-40 right-10 h-72 w-72 animate-pulse rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter delay-1000"></div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Transform Your Notion & Workspace Today
          </div>

          <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900 sm:text-6xl lg:text-7xl">
            Beautiful Widgets for
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Modern Workspaces
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 sm:text-2xl">
            Lets you easily create, manage, and embed widgets.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="transform bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg text-white shadow-xl transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Widget Builder Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 px-8 py-4 text-lg hover:border-blue-500"
            >
              <MousePointer className="mr-2 h-5 w-5" />
              Browse Widgets
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              <span>No coding required</span>
            </div>
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              <span>Works with Notion</span>
            </div>
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              <span>Instant embed</span>
            </div>
          </div>
        </div>

        {/* Widget Preview Showcase */}
        <div className="group relative z-10 mx-auto max-w-7xl cursor-pointer overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/preview_1.png"
            width={1920}
            height={1080}
            alt="video demo"
            className="w-full"
          />
          <div className="absolute inset-0 bg-gray-800 opacity-0 transition-all group-hover:opacity-30" />
          <div className="absolute top-1/2 left-1/2 inline-flex -translate-1/2 items-center rounded-full bg-gray-500 p-4 text-white transition-all group-hover:scale-150">
            <Play className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-24 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Three Simple Steps to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Widget Magic
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              From selection to embedding - transform your workspace in 3 steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <MousePointer className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Choose Your Widget
                </h3>
                <p className="text-gray-600">
                  Browse our collection of beautiful widgets. Select from analog
                  clocks, digital displays, weather forecasts, calendars, and
                  more.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Customize Everything
                </h3>
                <p className="text-gray-600">
                  Make it yours! Adjust colors, fonts, sizes, and styles with
                  our intuitive customization panel. See changes in real-time.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                  <Code2 className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="font-bold text-green-600">3</span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Embed Instantly
                </h3>
                <p className="text-gray-600">
                  Copy the generated embed code and paste it into your Notion
                  page, website, or any platform. Your widget goes live
                  immediately!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-24"
        id="features"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Powerful Features,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Simple Interface
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Everything you need to create stunning, functional widgets that
              enhance your digital workspace
            </p>
          </div>

          {/* Integration Section */}
          <div className="flex justify-center">
            <div className="h-[500px] min-w-4xl rounded-xl bg-white p-8 shadow-xl">
              <Tabs defaultValue={WIDGET_TABS[0].value} className="h-full">
                <TabsList className="mb-8">
                  {WIDGET_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="p-5"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {WIDGET_TABS.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center justify-center"
                  >
                    {renderWidgetComponent(tab.value)}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              {`Join thousands who've transformed their digital workspaces`}
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="p-6 transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="mb-4 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mb-4 text-gray-600">
                  {`"Widget Kit transformed my Notion workspace! The weather
                  widget keeps me informed, and the analog clock adds such a
                  professional touch."`}
                </p>
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                    <span className="text-sm font-semibold text-white">SL</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Lin</div>
                    <div className="text-sm text-gray-500">
                      Product Designer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="mb-4 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mb-4 text-gray-600">
                  {`"As a content creator, I needed something fast and beautiful.
                  Widget Kit delivered exactly that - customizable and super
                  easy to embed!"`}
                </p>
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500">
                    <span className="text-sm font-semibold text-white">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Mike Rodriguez
                    </div>
                    <div className="text-sm text-gray-500">Content Creator</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="mb-4 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mb-4 text-gray-600">
                  {`"Our team's productivity dashboard looks amazing now! The
                  calendar widget helps us stay on track with deadlines."`}
                </p>
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
                    <span className="text-sm font-semibold text-white">JK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Jenny Kim</div>
                    <div className="text-sm text-gray-500">
                      Team Lead, Tech Startup
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-8 text-gray-500">
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 fill-current text-yellow-400" />
                <span className="font-semibold">4.9/5</span>
                <span className="ml-1">rating</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <span className="font-semibold">10,000+</span>
                <span className="ml-1">widgets created</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <span className="font-semibold">500+</span>
                <span className="ml-1">happy customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-24"
        id="pricing"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Simple Pricing,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powerful Results
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Start free and upgrade as you grow. No hidden fees, no complicated
              tiers.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <Card className="p-8 transition-all hover:shadow-xl">
              <CardContent className="p-0">
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Free</h3>
                  <div className="mb-1 text-4xl font-bold text-gray-900">
                    $0
                  </div>
                  <p className="text-gray-500">Forever free</p>
                </div>

                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>3 widgets per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Basic customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Widget Kit watermark</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-blue-500 p-8 transition-all hover:shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              </div>
              <CardContent className="p-0">
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Pro</h3>
                  <div className="mb-1 text-4xl font-bold text-gray-900">
                    $9
                  </div>
                  <p className="text-gray-500">per month</p>
                </div>

                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Unlimited widgets</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Advanced customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>No watermark</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Custom CSS support</span>
                  </li>
                </ul>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* Team Plan */}
            <Card className="p-8 transition-all hover:shadow-xl">
              <CardContent className="p-0">
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Team</h3>
                  <div className="mb-1 text-4xl font-bold text-gray-900">
                    $29
                  </div>
                  <p className="text-gray-500">per month</p>
                </div>

                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Shared widget library</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    <span>White-label options</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-600">
              🎯 <strong>Special Launch Offer:</strong> Get 50% off Pro plan for
              your first 3 months!
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span className="flex items-center">
                <Shield className="mr-1 h-4 w-4" />
                30-day money-back guarantee
              </span>
              <span className="flex items-center">
                <Zap className="mr-1 h-4 w-4" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Widget Kit
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="mb-2 font-semibold text-gray-900">
                  How quickly can I add widgets to my Notion page?
                </h3>
                <p className="text-gray-600">
                  It takes less than 60 seconds! Choose your widget, customize
                  it to your liking, copy the embed code, and paste it into your
                  Notion page. Your widget goes live immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Do I need any coding knowledge?
                </h3>
                <p className="text-gray-600">
                  Not at all! Widget Kit is designed for everyone. Our visual
                  customization panel lets you modify colors, fonts, and layouts
                  with simple clicks. No HTML, CSS, or JavaScript required.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Can I use widgets on platforms other than Notion?
                </h3>
                <p className="text-gray-600">
                  Yes! Our widgets work on any platform that supports embeds or
                  HTML - including websites, blogs, documentation sites, and
                  more. We provide both embed codes and direct HTML.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Are the widgets mobile-responsive?
                </h3>
                <p className="text-gray-600">
                  Absolutely! All widgets are built with responsive design
                  principles, ensuring they look perfect on desktop, tablet, and
                  mobile devices.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="mb-2 font-semibold text-gray-900">
                  What new widgets are you planning to add?
                </h3>
                <p className="text-gray-600">
                  {`We're constantly expanding our library! Coming soon: countdown
                  timers, habit trackers, progress bars, social media feeds, and
                  custom data displays. Pro users get early access to new
                  widgets.`}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 h-full w-full opacity-10">
          <div className="absolute top-20 left-20 h-40 w-40 rounded-full bg-white"></div>
          <div className="absolute right-20 bottom-20 h-60 w-60 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-4xl leading-tight font-bold text-white sm:text-6xl">
            Ready to Transform
            <br />
            Your Digital Workspace?
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/90">
            {`Join thousands of creators who've already enhanced their Notion
            pages and websites with beautiful, functional widgets.`}
          </p>

          <div className="mb-12 flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-xl hover:bg-gray-100"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Building Widgets Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white px-8 py-4 text-lg text-white hover:bg-white hover:text-gray-900"
            >
              <MousePointer className="mr-2 h-5 w-5" />
              View Live Examples
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5" />
              <span>Ready in 60 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                  <Layout className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Widget Kit</span>
              </div>
              <p className="mb-6 max-w-md text-gray-400">
                Create beautiful, customizable widgets for your Notion pages and
                websites. No coding required, endless possibilities.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <span className="sr-only">Discord</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0003 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-semibold text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Widget Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Customization
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Embed Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-semibold text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Status Page
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <p className="text-sm text-gray-400">
              &copy; 2025 Widget Kit. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 text-sm text-gray-400 md:mt-0">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
