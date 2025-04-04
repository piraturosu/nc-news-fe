import TopicCard from "./TopicCard";

function TopicsList({ topics, setSelectedTopic }) {
  return (
    <div className="w-60 flex flex-col h-full items-center border-amber-700">
      {topics.map((topic) => (
        <TopicCard
          slug={topic.slug}
          description={topic.description}
          key={topic.slug}
          setSelectedTopic={setSelectedTopic}
        />
      ))}
    </div>
  );
}

export default TopicsList;
