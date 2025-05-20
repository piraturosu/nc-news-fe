import TopicCard from "./TopicCard";

function TopicsList({ topics, setSelectedTopic }) {
  return (
    <div className="flex flex-row justify-center w-auto sm:flex-col sm:w-60 h-auto sm:h-full items-center py-4 sm:py-0">
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
