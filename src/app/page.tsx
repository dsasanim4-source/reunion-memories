import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import MessageBoard from "./components/MessageBoard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Timeline />
        <Gallery />
        <MessageBoard />
      </main>
      <Footer />
    </>
  );
}
