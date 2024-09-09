import { useState } from "react";
import PhotoGrid from "../components/PhotGrid";
import ListGroup from "../components/ListGroup";
import usePhotos from "../hooks/usePhotos";
import useTopics from "../hooks/useTopics";

function HomeView() {
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const { topics, error: topicsError } = useTopics();
  const [topic, setTopic] = useState<string>("nature");
  const { photos, error: photosError } = usePhotos(topic);

  // to handle errors
  if (photosError) return <div>{photosError}</div>;
  if (topicsError) return <div>{topicsError}</div>;

  //when The menu is active and topic is selected
  const handleSelectItem = (item: any) => {
    setIsImageSelected(false);
    setTopic(item.slug);
  };

  //when the photo grid is active and the photo has been clicked
  const handleImageClick = (photo: object) => {
    console.log(photo);
    setIsImageSelected(true);
  };

  // if user is at the edge of the left scroll when they click the left button the menu re appears
  const handleScrollEdgeReached = () => {
    setIsImageSelected(false); // Set to false when edge is reached
  };

  return (
    <div className="" id="HomeContent">
      <div>
        <h1 className="">UNSPLASH GALLERY APP</h1>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100vh" }}
        >
          <div className="row container">
            {/* Display ListGroup only when image is not selected meaning the Grid is not active*/}
            {!isImageSelected && (
              <div className="col-4">
                <ListGroup items={topics} onSelectedItem={handleSelectItem} />
              </div>
            )}
            <div
              className={isImageSelected ? "col" : "col"}
              style={{ width: "200px" }}
            >
              <PhotoGrid
                photos={photos}
                onImageClick={handleImageClick}
                onScrollEdgeReached={handleScrollEdgeReached}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
