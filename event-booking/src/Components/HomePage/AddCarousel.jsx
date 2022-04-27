import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import sunburn from "../../static/sunburn.jpg"
import carting from "../../static/carting.jpg"
import golf from "../../static/golf.jpg"
import ted from "../../static/ted.jpg"
import theme from "../../static/themepark.jpg"
import drama from "../../static/drama.jpg"

const dataList = [
    sunburn,
    carting,
    golf,
    ted,
    theme,
    drama
]
export const AddCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div style={{ padding: "5px 0px" }}>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]} autoPlay infinite>
                {
                    dataList?.map((banner, index) => (
                        <div style={{ padding: "0px 15px" }} key={index + 1}>
                            <img style={{ width: "102%", cursor: "pointer" }} src={banner} alt="Advertisement banner" />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}