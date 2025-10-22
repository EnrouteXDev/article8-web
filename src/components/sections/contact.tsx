import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[url('/calltoaction.png')] bg-cover bg-center bg-no-repeat">
      <div className="bg-gradient-to-b w-full from-[#D9D9D9]/10 to-white md:bg-gradient-to-r md:from-white md:from-55% md:to-black/10">
        <div className=" mx-auto flex min-h-[520px] w-full max-w-7xl flex-col justify-end gap-8 px-6 py-16 text-brand sm:px-16 md:justify-center">
          <div className="max-w-xl space-y-6">
            <h2 className="section-heading text-brand uppercase">
              Call To Action
              <br />
              For Collaboration
            </h2>
            <p className="text-base font-medium leading-relaxed text-black sm:text-lg">
              We&apos;re your creative partners in crafting visuals that move people and brands forward. Whether it&apos;s
              3D animation, film, or digital storytelling, we collaborate with visionaries who refuse to play it safe. Got
              a bold idea? Let&apos;s bring it to life.
            </p>
          </div>
          <form className="flex w-full max-w-lg flex-col gap-4 text-black">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-xl border-2 border-brand/40 bg-white/80 px-4 py-4 text-base placeholder:text-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <div>
              <Button
                type="submit"
                className="w-full rounded-lg bg-brand px-6 py-3 text-base font-semibold uppercase tracking-wide hover:bg-[#B63838] sm:w-auto"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
      
    </section>
  );
}
