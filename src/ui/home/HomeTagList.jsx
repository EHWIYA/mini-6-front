function HomeTagList({ tags, label }) {
  return (
    <div className="homePage-tags" aria-label={label}>
      {tags.map((tag) => (
        <span className="homePage-tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default HomeTagList;
