// Photo Grid Component to show a grid of photos passed throw the HomeView
import { useState, useRef } from "react";

interface PhotoGridProps {
  photos: any[];
  onImageClick: (item: any) => void;
  onScrollEdgeReached: () => void;
}

function PhotoGrid({
  photos,
  onImageClick,
  onScrollEdgeReached,
}: PhotoGridProps) {
  const [isImageClicked, setIsImageClicked] = useState(false); // State to track if an image is clicked
  const scrollableGridRef = useRef<HTMLDivElement>(null);

  const canScrollLeft = () => {
    if (scrollableGridRef.current) {
      return scrollableGridRef.current.scrollLeft > 0;
    }
    return false;
  };

  // Scroll left function
  const scrollLeft = () => {
    if (scrollableGridRef.current) {
      const container = scrollableGridRef.current;
      const canScroll = canScrollLeft();
      if (canScroll) {
        container.scrollBy({
          left: -300, // Adjust the scroll distance as needed
          behavior: "smooth",
        });
      } else {
        // If we cannot scroll left, switch back to showing ListGroup
        setIsImageClicked(false);
        onScrollEdgeReached();
      }
    }
  };
  // Scroll right function
  const scrollRight = () => {
    if (scrollableGridRef.current) {
      scrollableGridRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleImageClick = (photo: any) => {
    setIsImageClicked(true); //To Set state to true once an image is clicked
    onImageClick(photo); // Pass the clicked photo to the parent component
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {/* Left Scroll Button - only visible after an image is clicked */}
      {isImageClicked && (
        <button
          className="btn btn-primary me-2"
          type="button"
          style={{ height: "510px" }}
          onClick={scrollLeft}
        >
          &lt;
        </button>
      )}

      {/* Scrollable photo grid */}
      <div
        className="scroll-container"
        ref={scrollableGridRef}
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="photo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 300px)",
            gridTemplateRows: "repeat(2, 250px)",
            gap: "10px",
          }}
        >
          {photos.slice(0, 10).map((photo) => (
            <div
              key={photo.id}
              className="card"
              style={{ width: "300px", height: "250px" }}
              onClick={() => handleImageClick(photo)}
            >
              <img
                src={photo.urls.small}
                className="card-img-top"
                alt={photo.alt_description}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Right Scroll Button - only visible after an image is clicked */}
      {isImageClicked && (
        <button
          className="btn btn-primary ms-2"
          style={{ height: "510px" }}
          type="button"
          onClick={scrollRight}
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default PhotoGrid;
