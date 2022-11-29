import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// import required modules
import { Pagination, Navigation } from "swiper";

export const ScanView = ({scanData}) => {
    const [swiperIndex, setSwiperIndex] = useState(0);

    return (
        <div className="scan-view">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                type: "bullets",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                centeredSlides={true}
                centeredSlidesBounds={true}
                className="mySwiper"
                onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
                > 
                {
                    scanData.map((scan) => {
                        return(
                            <SwiperSlide>
                                <img src={scan.imageUrl} alt={scan.caption}/>
                            </SwiperSlide>
                        );
                    })
                }
                
            </Swiper>
            <List id="scan-info" sx={{ bgcolor: 'background.paper'}}>
                <ListItem>
                    <ListItemText primary="Time Stamp" secondary={ Date(scanData[swiperIndex].timeTaken.seconds*1000) } />
                </ListItem>
                <Divider component="div"/>
                <ListItem>
                    <ListItemText primary="Description" secondary={ scanData[swiperIndex].description } />
                </ListItem>
            </List>
        </div>
    );
}

export default ScanView;