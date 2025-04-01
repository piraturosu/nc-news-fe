import "./App.css";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import TopicsList from "./components/TopicsList";

function App() {
  return (
    <>
      <Header />
      <section className="flex justify-around">
        <TopicsList />
        <ArticlesList />
      </section>
    </>
  );
}

export default App;
