import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About This and That
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Exploring flavors, sharing stories, and building a likeminded
            community.
          </p>
        </header>

        <section className="mb-10 md:mb-12">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl mb-8">
            <Image
              src="/img/stock_photo.jpeg" // Replace with a relevant, high-quality image
              alt="A vibrant display of fresh ingredients or a kitchen scene"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to This and That, your go-to destination for delicious
            recipes, culinary tips, and heartwarming food stories. We believe
            that food is more than just sustenance; it&apos;s a way to connect,
            create, and celebrate life&apos;s moments. Our mission is to inspire
            home cooks of all levels to explore their creativity in the kitchen
            and discover the joy of making and sharing food.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you&apos;re looking for a quick weeknight meal, an
            impressive dish for a special occasion, or simply some inspiration
            to get you started, you&apos;ll find it here. We focus on recipes
            that are approachable, use fresh, wholesome ingredients, and are
            packed with flavor.
          </p>
        </section>

        <section className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            The Ally Behind the Blog
          </h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md mb-6 md:mb-0 flex-shrink-0">
              {/* You can add an image of the blog author here */}
              {/* <Image src="/path-to-your-image.jpg" alt="Ally, the blog author" layout="fill" objectFit="cover" /> */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-4xl">
                A
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hi, I&apos;m Ally! I&apos;m a passionate food lover, recipe
                developer, and the voice behind this blog. My culinary journey
                started in my grandmother&apos;s kitchen, where I learned the
                magic of transforming simple ingredients into memorable meals.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This blog is a reflection of my adventures in the kitchen, my
                travels, and the people who inspire me. I hope to share my
                passion with you and help you create your own delicious
                memories.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We&apos;re more than just a collection of recipes; we&apos;re a
            community of food enthusiasts. Connect with us on social media,
            share your culinary creations, and let&apos;s embark on this
            delicious journey together!
          </p>
          {/* Add social media links or a call to action here if desired */}
        </section>
      </div>
    </div>
  );
}
