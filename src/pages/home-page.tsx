import { EventsTeaser } from "./home/events-teaser";
import { HeroSection } from "./home/hero-section";
import { JustListedSection } from "./home/just-listed-section";
import { KitchenTodoSection } from "./home/kitchen-todo-section";
import { StoriesSection } from "./home/stories-section";
import { WelcomeSection } from "./home/welcome-section";
import { WorthPorchSection } from "./home/worth-porch-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <JustListedSection />
      <EventsTeaser />
      <KitchenTodoSection />
      <WorthPorchSection />
      <StoriesSection />
      <WelcomeSection />
    </>
  );
}
