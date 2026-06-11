import MainButton from "../../components/comButton/MainButton";
import HomeTagList from "./HomeTagList";
import { AI_COVER_STUDIO } from "./homeContent";

function HomeAiCoverSlide({ isActive, onGoRegister }) {
  return (
    <article
      className="homePage-slide homePage-aiCoverSlide"
      aria-hidden={!isActive}
    >
      <div className="homePage-aiCoverContent">
        <span className="homePage-eyebrow">{AI_COVER_STUDIO.eyebrow}</span>
        <h2 className="homePage-title">{AI_COVER_STUDIO.title}</h2>

        <p className="homePage-desc">{AI_COVER_STUDIO.description}</p>

        <HomeTagList tags={AI_COVER_STUDIO.tags} label="AI 표지 생성 태그" />

        <div className="homePage-actions">
          <MainButton onClick={onGoRegister}>AI 표지 만들기</MainButton>
        </div>
      </div>
    </article>
  );
}

export default HomeAiCoverSlide;
