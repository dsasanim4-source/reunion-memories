import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Quiz from "./components/Quiz";
import Closing from "./components/Closing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Timeline />
        <Gallery />
        <Quiz />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
