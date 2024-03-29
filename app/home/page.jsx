"use client"
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LOGIN_LINK } from "../../utils/constants";
import Link from "next/link";

import MainLayout from "../MainLayout";

import Slider from "react-slick";

import SliderPrevArrow from '../../public/images/slider_left_arrow.svg'
import SliderArwBlk from '../../public/images/slide_arw_blk.svg'



const bannerSlider = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <Image src={SliderPrevArrow} alt="" />, // Custom previous arrow component
  nextArrow: <Image src={SliderPrevArrow} alt="" />, // Custom next arrow component
  autoplay: true,
  autoplaySpeed: 5000
};

const popularMobile = {
  dots: false,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  // initialSlide: 1,
  arrows: true,
  variableWidth: false,
  prevArrow: <Image src={SliderArwBlk} alt="" />,
  nextArrow: <Image src={SliderArwBlk} alt="" />,
}

const brandSlider = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  // initialSlide: 1,
  arrows: true,
  variableWidth: false
}
const networkSlider = {
  dots: false,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  // initialSlide: 1,
  arrows: true,
  variableWidth: false,
  prevArrow: <Image src={SliderArwBlk} alt="" />,
  nextArrow: <Image src={SliderArwBlk} alt="" />,
}


export default function HomePage() {
  return (
    <MainLayout>

      <Link href={LOGIN_LINK} className="buyBtn">Login</Link>
    </MainLayout>
  );
}
