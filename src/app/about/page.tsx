import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <section className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-6">
            Behind the Blog
          </h2>
          <div className="flow-root text-gray-700 leading-relaxed">
            <p className="mb-6">
              I've always found that my least favorite part of writing is the
              introduction. It sets the tone for the entire piece, whether that
              be a story, an essay, an article, you name it. Maybe it's just me,
              but for some reason that feels like a lot of pressure. However, I
              feel that I owe it to anyone who comes across this blog to
              introduce myself.
            </p>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md float-left mr-6 mb-2">
              {/* You can add an image of the blog author here */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-4xl">
                <Image
                  src="/uploads/ally-about-cute.jpg"
                  alt="Ally, the blog author"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="object-top"
                />
              </div>
            </div>
            <p className="mb-6">
              Hello and welcome. My name is Ally, I’m a 20-something who’s
              trying to nurture the creative side of my brain that was
              long-suppressed by academia. I plan to write about anything and
              everything – all of the thoughts that pass through my head are
              fair game.
            </p>
            <p className="mb-6">
              At this point, I'll take the opportunity to explain the title of
              my little blog. I wanted something that wouldn’t restrict my
              musings to a particular niche. As such, the idiom “this and that”
              came to mind. But the true appeal of this phrase lies in a
              separate idea entirely, one that I've struggled with a lot in my
              adult years: the concept of duality. It seems to me that our world
              doesn't give nearly enough consideration to the possibility that
              two seemingly-opposite things can be true at once. So, as I
              grapple with this concept in my own life, I hope that I can also
              inspire readers to take a second look at their opinions, beliefs,
              and judgements, and contemplate the notion of “this AND that”.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
