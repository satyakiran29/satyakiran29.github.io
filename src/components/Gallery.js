import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';

const images = [
    { src: "/gallery/1.jpg", alt: "1" }, 
  { src: "https://server.skdev29.workers.dev/1:/3.jpg", alt: "3" },
  { src: "https://server.skdev29.workers.dev/1:/4.jpg", alt: "4" },
  { src: "https://server.skdev29.workers.dev/1:/5.jpg", alt: "5" },
  { src: "https://server.skdev29.workers.dev/1:/6.jpg", alt: "6" },
  { src: "https://server.skdev29.workers.dev/1:/7.jpg", alt: "7" },
  { src: "https://server.skdev29.workers.dev/1:/8.jpg", alt: "8" },
  { src: "https://server.skdev29.workers.dev/1:/9.jpg", alt: "9" },
  { src: "https://server.skdev29.workers.dev/1:/10.jpg", alt: "10" },
  { src: "https://server.skdev29.workers.dev/1:/11.jpg", alt: "11" },
  { src: "https://server.skdev29.workers.dev/1:/12.jpg", alt: "12" },
  { src: "https://server.skdev29.workers.dev/1:/13.jpg", alt: "13" },
  { src: "https://server.skdev29.workers.dev/1:/14.jpg", alt: "14" },
  { src: "https://server.skdev29.workers.dev/1:/15.jpg", alt: "15" },
  { src: "https://server.skdev29.workers.dev/1:/16.jpg", alt: "16" },
  { src: "https://server.skdev29.workers.dev/1:/17.jpg", alt: "17" },
  { src: "https://server.skdev29.workers.dev/1:/18.jpg", alt: "18" },
  { src: "https://server.skdev29.workers.dev/1:/19.jpg", alt: "19" },
  { src: "https://server.skdev29.workers.dev/1:/20.jpg", alt: "20" },
  { src: "https://server.skdev29.workers.dev/1:/21.jpg", alt: "21" },
  { src: "https://server.skdev29.workers.dev/1:/22.jpg", alt: "22" }

]

export function Gallery() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
            >

                {images.map((image, index) => {
                    return (
                        <a href={image.src} key={index}>
                            <img alt={image.alt} src={image.src} />
                        </a>
                    )
                })}


            </LightGallery>

            <footer>
      <h4>Developed by Satyakiran</h4>
      <h4>Copyright &copy; 2025 Satyakiran</h4>
  
    </footer>
        </div>

        
    );
}
