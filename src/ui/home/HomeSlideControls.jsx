function HomeSlideControls({ activeSlide, slides, onSelect }) {
  return (
    <div className="homePage-tabs" aria-label="슬라이드 선택">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          className={`homePage-tab${
            activeSlide === index ? " homePage-tab--active" : ""
          }`}
          onClick={() => onSelect(index)}
          aria-label={`${slide.label} 슬라이드로 이동`}
          aria-pressed={activeSlide === index}
        >
          <span>{slide.label}</span>
        </button>
      ))}
    </div>
  );
}

export default HomeSlideControls;
