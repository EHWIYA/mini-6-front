import MainButton from "../../components/comButton/MainButton";
import HomeTagList from "./HomeTagList";
import { AUTHOR_PROFILE } from "./homeContent";

function HomeProfileSlide({ isActive, onGoList }) {
  return (
    <article
      className="homePage-slide homePage-profileSlide"
      aria-hidden={!isActive}
    >
      <div className="homePage-profileText">
        <span className="homePage-eyebrow">{AUTHOR_PROFILE.eyebrow}</span>
        <h1 className="homePage-title">{AUTHOR_PROFILE.title}</h1>
        <p className="homePage-desc">{AUTHOR_PROFILE.description}</p>

        <blockquote className="homePage-authorQuote">
          "{AUTHOR_PROFILE.quote}"
        </blockquote>

        <HomeTagList tags={AUTHOR_PROFILE.tags} label="작가 태그" />

        <div className="homePage-actions">
          <MainButton onClick={onGoList}>도서 목록 보기</MainButton>
        </div>
      </div>

      <figure className="homePage-authorCard">
        <img
          src={AUTHOR_PROFILE.image.src}
          alt={AUTHOR_PROFILE.image.alt}
          className="homePage-authorImage"
        />
        <figcaption className="homePage-authorInfo">
          <strong>{AUTHOR_PROFILE.name}</strong>
          <span>{AUTHOR_PROFILE.role}</span>
        </figcaption>
      </figure>
    </article>
  );
}

export default HomeProfileSlide;
