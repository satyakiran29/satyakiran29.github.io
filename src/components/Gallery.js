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
    
  { "src": "https://server.skdev29.workers.dev/1:/3.webp", "alt": "3" },
  { "src": "https://server.skdev29.workers.dev/1:/4.webp", "alt": "4" },
  { "src": "https://server.skdev29.workers.dev/1:/5.webp", "alt": "5" },
  { "src": "https://server.skdev29.workers.dev/1:/6.webp", "alt": "6" },
  { "src": "https://server.skdev29.workers.dev/1:/7.webp", "alt": "7" },
  { "src": "https://server.skdev29.workers.dev/1:/8.webp", "alt": "8" },
  { "src": "https://server.skdev29.workers.dev/1:/9.webp", "alt": "9" },
  { "src": "https://server.skdev29.workers.dev/1:/10.webp", "alt": "10" },
  { "src": "https://server.skdev29.workers.dev/1:/11.webp", "alt": "11" },
  { "src": "https://server.skdev29.workers.dev/1:/12.webp", "alt": "12" },
  { "src": "https://server.skdev29.workers.dev/1:/13.webp", "alt": "13" },
  { "src": "https://server.skdev29.workers.dev/1:/14.webp", "alt": "14" },
  { "src": "https://server.skdev29.workers.dev/1:/15.webp", "alt": "15" },
  { "src": "https://server.skdev29.workers.dev/1:/16.webp", "alt": "16" },
  { "src": "https://server.skdev29.workers.dev/1:/17.webp", "alt": "17" },
  { "src": "https://server.skdev29.workers.dev/1:/18.webp", "alt": "18" },
  { "src": "https://server.skdev29.workers.dev/1:/19.webp", "alt": "19" },
  { "src": "https://server.skdev29.workers.dev/1:/20.webp", "alt": "20" },
  { "src": "https://server.skdev29.workers.dev/1:/21.webp", "alt": "21" },
  { "src": "https://server.skdev29.workers.dev/1:/22.webp", "alt": "22" },
    { "src": "https://server.skdev29.workers.dev/1:/23.webp", "alt": "23" }

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
        </div>

        
    );
}
