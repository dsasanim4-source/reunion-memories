import Nav from "./components/Nav";
import EditBar from "./components/EditBar";
import Hero from "./components/Hero";
import Members from "./components/Members";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import UploadWall from "./components/UploadWall";
import Quiz from "./components/Quiz";
import Closing from "./components/Closing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <span id="top" />
      <EditBar />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Members />
        <Stats />
        <Timeline />
        <Gallery />
        <UploadWall />
        <Quiz />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
